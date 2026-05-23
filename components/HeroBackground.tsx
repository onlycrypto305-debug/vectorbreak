"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
  Uniform,
  Vector2,
} from "three";
import { createScene } from "@/lib/three/createScene";

const PARTICLE_COUNT = 2500;
const CLOUD_DEPTH = 12;
const CLOUD_RADIUS = 8;

/**
 * Hero background: a drifting cloud of small glowing points in 3D space.
 * Camera has subtle parallax based on cursor. Two color tiers (most particles
 * are gold-ink mid-tone, ~12% are bright gold accents). Additive blending
 * gives a soft self-glow without needing a post-process pass.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const handle = createScene({
      canvas,
      fov: 60,
      rendererParams: { alpha: false },
    });
    handle.renderer.setClearColor(new Color("#000000"), 1);
    handle.camera.position.set(0, 0, 5);

    // Generate particle positions across a flat-ish 3D volume.
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);
    const intensities = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Radial distribution — denser in the middle, sparser at edges.
      const r = Math.sqrt(Math.random()) * CLOUD_RADIUS;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.6; // slightly squashed vertically
      positions[i * 3 + 2] = (Math.random() - 0.5) * CLOUD_DEPTH;
      seeds[i] = Math.random() * 100;
      // ~12% of particles are "bright" (gold), rest are dim (ink->gold mid)
      intensities[i] = Math.random() < 0.12 ? 1.0 : 0.3 + Math.random() * 0.25;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    geo.setAttribute("aIntensity", new BufferAttribute(intensities, 1));

    const mat = new ShaderMaterial({
      uniforms: {
        uTime: new Uniform(0),
        uResolution: new Uniform(new Vector2(1, 1)),
        uCursor: new Uniform(new Vector2(0, 0)),
        uPixelRatio: new Uniform(window.devicePixelRatio || 1),
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aSeed;
        attribute float aIntensity;
        varying float vIntensity;
        varying float vTwinkle;

        void main() {
          vIntensity = aIntensity;

          // Slow per-particle drift via seeded sin/cos
          vec3 pos = position;
          pos.x += sin(uTime * 0.15 + aSeed) * 0.15;
          pos.y += cos(uTime * 0.12 + aSeed * 1.3) * 0.12;
          pos.z += sin(uTime * 0.10 + aSeed * 0.7) * 0.18;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Twinkle — slow brightness oscillation, distinct per particle
          vTwinkle = 0.65 + 0.35 * sin(uTime * 1.3 + aSeed * 5.0);

          // Point size: bright particles slightly bigger, scaled by distance
          float baseSize = aIntensity > 0.7 ? 8.0 : 3.5;
          gl_PointSize = baseSize * uPixelRatio * (1.0 / -mvPosition.z) * 3.0;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying float vIntensity;
        varying float vTwinkle;

        void main() {
          // Soft circular point with falloff
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          alpha = pow(alpha, 1.5);

          // Bright particles are gold, dim particles are warm-grey
          vec3 gold = vec3(0.85, 0.62, 0.27);
          vec3 dim  = vec3(0.35, 0.32, 0.28);
          vec3 col = mix(dim, gold, smoothstep(0.5, 1.0, vIntensity));

          gl_FragColor = vec4(col * vTwinkle, alpha * vIntensity);
        }
      `,
    });

    const points = new Points(geo, mat);
    handle.scene.add(points);

    // Cursor parallax — camera offsets slightly toward cursor for depth feel
    const targetCursor = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetCursor.x = x;
      targetCursor.y = y;
    };
    if (!reducedMotion) {
      window.addEventListener("pointermove", onPointerMove);
    }

    const smoothCursor = { x: 0, y: 0 };
    handle.start((time) => {
      mat.uniforms.uTime.value = time;
      mat.uniforms.uResolution.value.set(
        canvas.clientWidth,
        canvas.clientHeight,
      );

      // Lerp camera toward cursor for smooth parallax
      smoothCursor.x += (targetCursor.x - smoothCursor.x) * 0.05;
      smoothCursor.y += (targetCursor.y - smoothCursor.y) * 0.05;
      handle.camera.position.x = smoothCursor.x * 0.6;
      handle.camera.position.y = -smoothCursor.y * 0.4;
      handle.camera.lookAt(0, 0, 0);

      // Slow z-drift so the whole field gently breathes forward
      if (!reducedMotion) {
        points.rotation.z = Math.sin(time * 0.02) * 0.03;
      }
    });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      handle.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
    />
  );
}
