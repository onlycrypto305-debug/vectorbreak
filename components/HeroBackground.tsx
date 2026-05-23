"use client";

import { useEffect, useRef } from "react";
import {
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Uniform,
  Vector2,
} from "three";
import { createScene } from "@/lib/three/createScene";

/**
 * Full-bleed shader background for the hero. Slow-moving noise field in
 * dark + gold (Vectorbreak palette). Placeholder for a richer scene in Phase 2.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Render a single static frame, no RAF.
      const handle = createScene({ canvas });
      const mat = makeMaterial();
      const mesh = new Mesh(new PlaneGeometry(2, 2), mat);
      handle.scene.add(mesh);
      mat.uniforms.uResolution.value.set(
        canvas.clientWidth,
        canvas.clientHeight,
      );
      handle.renderer.render(handle.scene, handle.camera);
      return () => handle.dispose();
    }

    const handle = createScene({ canvas });
    const mat = makeMaterial();
    const mesh = new Mesh(new PlaneGeometry(2, 2), mat);
    handle.scene.add(mesh);

    handle.start((time) => {
      mat.uniforms.uTime.value = time;
      mat.uniforms.uResolution.value.set(
        canvas.clientWidth,
        canvas.clientHeight,
      );
    });

    return () => handle.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      aria-hidden="true"
    />
  );
}

function makeMaterial() {
  return new ShaderMaterial({
    uniforms: {
      uTime: new Uniform(0),
      uResolution: new Uniform(new Vector2(1, 1)),
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime;
      uniform vec2  uResolution;
      varying vec2 vUv;

      // Hash + value noise + fbm (cheap, smooth)
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.02;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

        // Slow drifting noise
        float t = uTime * 0.04;
        float n = fbm(p * 2.0 + vec2(t, -t * 0.5));
        n = pow(n, 1.4);

        // Radial vignette toward edges
        float r = length(p);
        float vignette = smoothstep(1.2, 0.2, r);

        // Palette: deep black -> ink -> gold accents at higher noise
        vec3 black = vec3(0.0);
        vec3 ink   = vec3(0.11, 0.11, 0.12);
        vec3 gold  = vec3(0.72, 0.52, 0.18);

        vec3 col = mix(black, ink, smoothstep(0.2, 0.65, n));
        col = mix(col, gold * 0.45, smoothstep(0.7, 0.95, n) * vignette);

        // Subtle grain
        float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.025;
        col += grain;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}
