"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";

interface Service {
  letter: string;
  tag: string;
  title: string;
  desc: string;
  cta: { href: string; label: string };
  onDark?: boolean;
}

const SERVICES: Service[] = [
  {
    letter: "A",
    tag: "AUDIT",
    title: "Find your problems before someone else does.",
    desc: "Fixed-scope red-team engagements against your live AI agent or RAG pipeline. Five Surfaces methodology in full. Insurance-grade deliverable, retest included, sign-off letter for compliance, carrier and acquirer use.",
    cta: { href: "#pricing", label: "SKU ladder · $4.5k–$285k →" },
  },
  {
    letter: "T",
    tag: "TRAIN & EDUCATE",
    title: "Stand up your team's own red-teaming muscle.",
    desc: "Two-day on-site or virtual Five Surfaces workshop for AppSec, ML, and platform teams. Hands-on labs against intentionally vulnerable agents. Certification track. Ninety days of async Q&A and follow-up review.",
    cta: {
      href: "mailto:Lance@vectorbreak.com?subject=Training%20enquiry",
      label: "Workshop · from $60k →",
    },
  },
  {
    letter: "B",
    tag: "CUSTOM BUILD",
    title: "Don't just find the problem — ship the fix.",
    desc: "Custom defensive tooling: hardened MCP servers, attestation pipelines, prompt-injection monitoring, agent-loop circuit breakers, automated red-team CI. Built to your stack. Maintained on retainer if you want it.",
    cta: {
      href: "mailto:Lance@vectorbreak.com?subject=Custom%20build%20enquiry",
      label: "Scope a buildout →",
    },
  },
  {
    letter: "C",
    tag: "COMMUNITY",
    title: "Practitioners only. On Discord.",
    desc: "Vetted private community of AI red-teamers, AppSec engineers, ML-platform people, and compliance leads. Weekly threat-class drops, live PoC reviews, monthly threat-intel briefing.",
    cta: { href: "#community", label: "Apply to join →" },
    onDark: true,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-32 lg:py-40"
      style={{
        background: "var(--color-paper)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <p className="h-eyebrow">SERVICES · FOUR PILLARS</p>
          </Reveal>
          <h2 className="h-mega mt-8" style={{ color: "var(--color-ink)" }}>
            <WordCascade as="div" text="Audit. Train. Build." />
            <WordCascade
              as="div"
              text="Plus an active community."
              delay={0.3}
              style={{ color: "var(--color-mute2)" }}
            />
          </h2>
          <Reveal delay={0.7}>
            <p className="lead mt-10 mx-auto max-w-2xl">
              Four ways to engage Vectorbreak Security, depending on the decision
              you&rsquo;re driving and the team you already have in place.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-px border"
          style={{
            background: "var(--color-rule)",
            borderColor: "var(--color-rule)",
            perspective: "1200px",
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.tag} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }: { service: Service }) {
  const bg = s.onDark ? "var(--color-ink)" : "#FFFFFF";
  const letterColor = s.onDark
    ? "var(--color-gold-light)"
    : "var(--color-gold)";
  const titleColor = s.onDark ? "var(--color-textl)" : "var(--color-ink)";
  const descColor = s.onDark ? "#A1A1A6" : "var(--color-mute)";
  const tagColor = s.onDark ? "var(--color-mute2)" : "var(--color-mute2)";
  const ctaColor = s.onDark
    ? "var(--color-gold-light)"
    : "var(--color-gold)";

  const ref = useRef<HTMLElement>(null);
  // Cursor position normalized to -1..1 inside the card
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 200, damping: 22, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 200, damping: 22, mass: 0.4 });
  const rotateY = useTransform(spx, [-1, 1], [-8, 8]);
  const rotateX = useTransform(spy, [-1, 1], [6, -6]);

  // Cursor-following gold gradient sheen
  const sheenBg = useTransform(() => {
    const gx = (spx.get() * 0.5 + 0.5) * 100;
    const gy = (spy.get() * 0.5 + 0.5) * 100;
    const color = s.onDark
      ? "rgba(212, 162, 78, 0.18)"
      : "rgba(184, 133, 46, 0.10)";
    return `radial-gradient(circle at ${gx}% ${gy}%, ${color}, transparent 55%)`;
  });

  const onMove = (e: React.PointerEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative p-8 lg:p-10 h-full flex flex-col"
      style={{
        background: bg,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
    >
      {/* Cursor-following gold gradient sheen */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 hover:opacity-100"
        style={{ background: sheenBg }}
        whileHover={{ opacity: 1 }}
      />
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          fontWeight: 300,
          color: letterColor,
          lineHeight: 1,
          marginBottom: "1.75rem",
          letterSpacing: "-0.03em",
          transform: "translateZ(20px)",
        }}
      >
        {s.letter}
      </div>
      <div
        className="mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          color: tagColor,
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {s.tag}
      </div>
      <h3
        className="mb-3"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.55rem",
          fontWeight: 500,
          letterSpacing: "-0.022em",
          color: titleColor,
          lineHeight: 1.18,
          transform: "translateZ(15px)",
        }}
      >
        {s.title}
      </h3>
      <p
        className="flex-1"
        style={{
          fontSize: "0.98rem",
          color: descColor,
          lineHeight: 1.55,
        }}
      >
        {s.desc}
      </p>
      <a
        href={s.cta.href}
        className="mt-7 inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
        style={{ color: ctaColor }}
      >
        {s.cta.label}
      </a>
    </motion.article>
  );
}
