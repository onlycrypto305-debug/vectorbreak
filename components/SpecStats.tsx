"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";

interface Stat {
  value: number;
  label: string;
}

const STATS: Stat[] = [
  { value: 5, label: "Attack surfaces" },
  { value: 69, label: "Risk classes" },
  { value: 8, label: "Public case studies" },
  { value: 139, label: "Unit tests, all green" },
];

export function SpecStats() {
  return (
    <section
      className="py-32 lg:py-40 text-center"
      style={{ background: "var(--color-bg)", color: "var(--color-textl)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p
            className="h-eyebrow"
            style={{ color: "var(--color-mute2)" }}
          >
            THE METHODOLOGY · BY THE NUMBERS
          </p>
        </Reveal>
        <h2
          className="h-section mt-8 max-w-4xl mx-auto"
          style={{ color: "var(--color-textl)" }}
        >
          <WordCascade
            as="div"
            text="Five surfaces. Sixty-nine risk classes."
          />
          <WordCascade
            as="div"
            text="Eight published case studies."
            delay={0.35}
          />
          <WordCascade
            as="span"
            text=" Solo-authored."
            delay={0.6}
            style={{ color: "var(--color-mute2)" }}
          />
        </h2>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {STATS.map((stat) => (
            <Counter key={stat.label} target={stat.value} label={stat.label} />
          ))}
        </div>

        <p className="mt-24" style={{ color: "var(--color-mute2)" }}>
          <a
            href="#methodology"
            className="inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
            style={{ color: "var(--color-gold-light)" }}
          >
            Explore the methodology &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}

function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? target
      : 0,
  );

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0, 0, 0.2, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <div>
      <span
        ref={ref}
        className="block"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontFeatureSettings: '"tnum","lnum"',
          color: "var(--color-textl)",
        }}
      >
        {value}
      </span>
      <p
        className="mt-2"
        style={{
          color: "var(--color-mute2)",
          fontFamily: "var(--font-sans)",
          fontSize: "1.05rem",
        }}
      >
        {label}
      </p>
    </div>
  );
}
