"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds after element enters viewport */
  delay?: number;
  /** Fraction of element that must be visible before firing (0..1). Default 0.2 */
  amount?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "section";
}

/**
 * One-shot scroll-triggered fade+rise. Applies the same motion language as
 * the hero, so the entire page reads as one continuous reveal flow.
 */
export function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      // @ts-expect-error generic ref assignment across motion.* variants
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
