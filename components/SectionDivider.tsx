"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Thin gold rule that draws across the section boundary as it enters viewport.
 * Gradient fades to transparent at both ends so it sits cleanly between any
 * two background colors (dark↔light, light↔light, etc).
 */
export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} className="relative flex justify-center" aria-hidden="true">
      <motion.div
        className="w-full max-w-[60%]"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-gold) 50%, transparent 100%)",
          transformOrigin: "center",
          opacity: 0,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 0.65 } : undefined}
        transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
  );
}
