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
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  SphereGeometry,
  Vector3,
} from "three";
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
 * 3D Five Surfaces diagram.
 *
 * Three.js: central dark core + 5 gold orbital nodes + spokes + 2 wireframe rings.
 * HTML overlay: per-node labels (code + short name) positioned each frame via
 * camera projection so they track the rotating scene.
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
        new SphereGeometry(0.22, 32, 32),
        new MeshBasicMaterial({ color: new Color("#D4A24E") }),
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

    // Reusable Vector3 to avoid per-frame allocations.
    const worldPos = new Vector3();

    let baseRotation = 0;
    const scrollFactor = 0.0008;
    const containerTop = () => container.getBoundingClientRect().top;

    handle.start((time) => {
      if (!reducedMotion) {
        baseRotation = time * 0.12;
      }
      const scrollDelta = -containerTop() * scrollFactor;
      root.rotation.y = baseRotation + scrollDelta;

      // Update label HTML overlay positions via camera projection.
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < nodes.length; i++) {
        const labelEl = labelRefs.current[i];
        if (!labelEl) continue;
        nodes[i].getWorldPosition(worldPos);
        worldPos.project(handle.camera);
        const x = (worldPos.x * 0.5 + 0.5) * w;
        const y = (-worldPos.y * 0.5 + 0.5) * h;
        // z>1 means behind camera; we still hide via opacity for back-facing nodes
        const behind = worldPos.z > 1;
        const depth = worldPos.z; // -1..1, more negative = closer
        const opacity = behind ? 0 : Math.max(0.35, 1 - (depth + 1) * 0.4);
        labelEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, calc(-100% - 18px))`;
        labelEl.style.opacity = String(opacity);
      }
    });

    return () => handle.dispose();
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
