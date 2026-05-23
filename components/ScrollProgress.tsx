"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold progress bar at top of viewport, fills 0 -> 100% with scroll.
 * Springified so it lags subtly behind raw scroll, giving a polished feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background:
          "linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold-light) 50%, var(--color-gold-bright) 100%)",
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}
