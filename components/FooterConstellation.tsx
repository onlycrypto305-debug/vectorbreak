"use client";

import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
  Uniform,
} from "three";
import { createScene } from "@/lib/three/createScene";

const PARTICLE_COUNT = 350;

/**
 * Footer constellation — sparse gold-ink particle field on the light footer
 * background. Lighter touch than the hero (fewer particles, no parallax),
 * but ties the site visually end-to-end.
 */
export function FooterConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handle = createScene({
      canvas,
      fov: 50,
      rendererParams: { alpha: true },
    });
    handle.renderer.setClearColor(0x000000, 0);
    handle.camera.position.set(0, 0, 5);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      seeds[i] = Math.random() * 100;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new BufferAttribute(seeds, 1));

    const mat = new ShaderMaterial({
      uniforms: {
        uTime: new Uniform(0),
        uPixelRatio: new Uniform(window.devicePixelRatio || 1),
      },
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aSeed;
        varying float vTwinkle;
        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * 0.08 + aSeed) * 0.08;
          pos.y += cos(uTime * 0.07 + aSeed * 1.4) * 0.05;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          vTwinkle = 0.55 + 0.45 * sin(uTime * 1.1 + aSeed * 4.0);
          gl_PointSize = 2.4 * uPixelRatio * (1.0 / -mv.z) * 3.0;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying float vTwinkle;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          // Gold-ink on light background
          vec3 col = vec3(0.72, 0.52, 0.18);
          gl_FragColor = vec4(col, alpha * 0.32 * vTwinkle);
        }
      `,
    });

    const points = new Points(geo, mat);
    handle.scene.add(points);

    handle.start((time) => {
      mat.uniforms.uTime.value = time;
    });

    return () => handle.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
      aria-hidden="true"
    />
  );
}
