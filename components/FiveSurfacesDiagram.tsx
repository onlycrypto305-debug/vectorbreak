"use client";

import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  RingGeometry,
  SphereGeometry,
  Vector2,
  Vector3,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { createScene } from "@/lib/three/createScene";

const SURFACES = [
  { code: "01", short: "I/O", long: "INPUT · OUTPUT" },
  { code: "02", short: "RAG", long: "RETRIEVAL" },
  { code: "03", short: "MCP", long: "TOOL-CALL" },
  { code: "04", short: "LLM", long: "MODEL" },
  { code: "05", short: "EXEC", long: "RUNTIME" },
];

const ORBIT_RADIUS = 2.4;
const TILT_DEG = 22;

/**
 * 3D Five Surfaces diagram with bloom post-processing.
 *
 * - Central dark core (the AI agent), thin gold core ring
 * - 5 gold orbital nodes, glowing via UnrealBloomPass
 * - Gold spokes connecting nodes to core
 * - 2 faint outer wireframe rings for depth
 * - Slow rotation + scroll-tied rotation delta
 * - HTML overlay labels positioned via camera projection
 */
export function FiveSurfacesDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Create scene using the shared factory. We will NOT call handle.start()
    // because we need to drive rendering through EffectComposer.
    const handle = createScene({ canvas, fov: 45 });
    handle.camera.position.set(0, 0.6, 6.2);
    handle.camera.lookAt(0, 0, 0);

    const root = new Group();
    root.rotation.x = (TILT_DEG * Math.PI) / 180;
    handle.scene.add(root);

    const core = new Mesh(
      new SphereGeometry(0.55, 48, 48),
      new MeshBasicMaterial({ color: new Color("#1D1D1F") }),
    );
    root.add(core);

    const coreRing = new Mesh(
      new RingGeometry(0.6, 0.62, 64),
      new MeshBasicMaterial({
        color: new Color("#B8852E"),
        transparent: true,
        opacity: 0.85,
        side: DoubleSide,
      }),
    );
    coreRing.lookAt(handle.camera.position);
    root.add(coreRing);

    const nodes: Mesh[] = [];
    for (let i = 0; i < SURFACES.length; i++) {
      const angle = (i / SURFACES.length) * Math.PI * 2 - Math.PI / 2;
      const node = new Mesh(
        new SphereGeometry(0.24, 32, 32),
        // Slightly hotter color for bloom threshold to bite — gold #E8BC65
        new MeshBasicMaterial({ color: new Color("#E8BC65") }),
      );
      node.position.set(
        Math.cos(angle) * ORBIT_RADIUS,
        0,
        Math.sin(angle) * ORBIT_RADIUS,
      );
      root.add(node);
      nodes.push(node);
    }

    const spokePositions = new Float32Array(SURFACES.length * 6);
    for (let i = 0; i < SURFACES.length; i++) {
      const n = nodes[i].position;
      spokePositions.set([0, 0, 0, n.x, n.y, n.z], i * 6);
    }
    const spokeGeo = new BufferGeometry();
    spokeGeo.setAttribute("position", new BufferAttribute(spokePositions, 3));
    const spokes = new LineSegments(
      spokeGeo,
      new LineBasicMaterial({
        color: new Color("#B8852E"),
        transparent: true,
        opacity: 0.55,
      }),
    );
    root.add(spokes);

    for (const [r, opacity] of [
      [3.2, 0.18],
      [4.1, 0.1],
    ] as const) {
      const ring = new Mesh(
        new RingGeometry(r, r + 0.01, 96),
        new MeshBasicMaterial({
          color: new Color("#86868B"),
          transparent: true,
          opacity,
          side: DoubleSide,
        }),
      );
      ring.rotation.x = Math.PI / 2;
      root.add(ring);
    }

    // --- Post-processing: EffectComposer + UnrealBloom ---
    const composer = new EffectComposer(handle.renderer);
    composer.addPass(new RenderPass(handle.scene, handle.camera));
    const bloomPass = new UnrealBloomPass(
      new Vector2(canvas.clientWidth, canvas.clientHeight),
      0.9, // strength
      0.7, // radius
      0.32, // threshold — gold nodes are above, dark core/grey rings below
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const setComposerSize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      composer.setSize(w, h);
      composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    setComposerSize();
    window.addEventListener("resize", setComposerSize);

    // --- Custom RAF loop using composer (instead of handle.start) ---
    const worldPos = new Vector3();
    let baseRotation = 0;
    const scrollFactor = 0.0008;
    const containerTop = () => container.getBoundingClientRect().top;

    let rafId = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      if (!reducedMotion) {
        baseRotation = t * 0.12;
      }
      const scrollDelta = -containerTop() * scrollFactor;
      root.rotation.y = baseRotation + scrollDelta;

      // Subtle node pulse — scale oscillates by ~6% on a per-node phase
      for (let i = 0; i < nodes.length; i++) {
        const pulse = 1 + Math.sin(t * 1.5 + i * 1.2) * 0.06;
        nodes[i].scale.setScalar(pulse);
      }

      composer.render();

      // Update HTML label positions via projection
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < nodes.length; i++) {
        const labelEl = labelRefs.current[i];
        if (!labelEl) continue;
        nodes[i].getWorldPosition(worldPos);
        worldPos.project(handle.camera);
        const x = (worldPos.x * 0.5 + 0.5) * w;
        const y = (-worldPos.y * 0.5 + 0.5) * h;
        const behind = worldPos.z > 1;
        const depth = worldPos.z;
        const opacity = behind ? 0 : Math.max(0.35, 1 - (depth + 1) * 0.4);
        labelEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, calc(-100% - 22px))`;
        labelEl.style.opacity = String(opacity);
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setComposerSize);

      // EffectComposer.dispose() only frees its own renderTargets, NOT the
      // passes. UnrealBloomPass alone owns 10 RTs + 5 materials + a fullscreen
      // quad. Walk the passes manually.
      for (const pass of composer.passes) {
        const p = pass as { dispose?: () => void };
        if (typeof p.dispose === "function") p.dispose();
      }
      composer.dispose();

      // renderer.dispose() does not free geometries/materials we added to the
      // scene. Walk the tree and dispose each Mesh/LineSegments/Points's geo +
      // material before tearing down the renderer.
      handle.scene.traverse((obj: Object3D) => {
        const m = obj as Mesh & { geometry?: { dispose?: () => void } };
        if (m.geometry?.dispose) m.geometry.dispose();
        const mat = (m as Mesh).material as Material | Material[] | undefined;
        if (Array.isArray(mat)) {
          for (const x of mat) x.dispose?.();
        } else {
          mat?.dispose?.();
        }
      });

      handle.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto"
      style={{ maxWidth: 720, aspectRatio: "1 / 1" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        aria-hidden="true"
      />
      {SURFACES.map((s, i) => (
        <div
          key={s.code}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 pointer-events-none whitespace-nowrap text-center"
          style={{
            fontFamily: "var(--font-mono)",
            transition: "opacity 0.3s",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: "var(--color-gold)",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {s.code} {s.short}
          </div>
          <div
            style={{
              fontSize: "0.62rem",
              color: "var(--color-mute2)",
              letterSpacing: "0.18em",
              marginTop: 2,
            }}
          >
            {s.long}
          </div>
        </div>
      ))}
    </div>
  );
}
