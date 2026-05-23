"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";

interface WordCascadeProps {
  text: string;
  /** Per-word stagger in seconds (default 0.07) */
  gap?: number;
  /** Delay before first word fires (default 0) */
  delay?: number;
  /** Triggers earlier if positive; default 0.3 means 30% of element visible */
  amount?: number;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "div";
}

/**
 * Reveals a string word-by-word on scroll-in. Each word becomes an inline-block
 * span that fades+rises with stagger. Use for marquee section headings.
 *
 * For multi-color headings, compose multiple WordCascades with shared `delay`
 * arithmetic (line 2 starts after line 1 finishes).
 */
export function WordCascade({
  text,
  gap = 0.07,
  delay = 0,
  amount = 0.3,
  className,
  style,
  as = "span",
}: WordCascadeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const words = text.split(" ");
  const Wrapper = as === "div" ? motion.div : motion.span;

  return (
    <Wrapper
      // @ts-expect-error ref typing across motion.* variants
      ref={ref}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: "100%" }}
            animate={inView ? { opacity: 1, y: "0%" } : undefined}
            transition={{
              duration: 0.9,
              ease: [0.32, 0.72, 0, 1],
              delay: delay + i * gap,
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
