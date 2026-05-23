"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface MagneticPillProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Distance from button center at which magnetic pull begins (px). Default 140. */
  range?: number;
  /** Max travel distance toward cursor (px). Default 14. */
  strength?: number;
}

/**
 * Anchor wrapped in a spring-driven translate that gets pulled toward the
 * cursor when the cursor is within `range` of the button center. Subtle —
 * the user feels rather than sees the effect, which is the point.
 */
export function MagneticPill({
  href,
  children,
  className,
  style,
  range = 140,
  strength = 14,
}: MagneticPillProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < range) {
        const pull = 1 - dist / range;
        x.set((dx / range) * strength * pull * 2);
        y.set((dy / range) * strength * pull * 2);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [range, strength, x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ ...style, x: springX, y: springY }}
    >
      {children}
    </motion.a>
  );
}
