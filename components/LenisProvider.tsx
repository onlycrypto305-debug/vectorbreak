"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scroll. Mounts a single Lenis instance, drives RAF.
 * Children render unchanged — Lenis intercepts wheel/touch and animates
 * window scroll. Respects prefers-reduced-motion (disables itself).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
