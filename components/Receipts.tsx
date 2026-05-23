"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";

interface Receipt {
  n: string;
  target: string;
  scope: string;
  findings: string;
  verdict: "PASS" | "STRONG PASS" | "FAIL" | "UNDER NDA";
  redacted?: boolean;
}

// Display order — FAILs lead. Case-study IDs (#07, #08) preserved so other
// docs that reference "case study 03" still resolve. Per ux-lead review:
// "The two FAILs are the empirical differentiator. Lead the table with them,
// then the PASSes — table order should support the body copy's argument
// (methodology bites cross-family, holds up within-family)."
const RECEIPTS: Receipt[] = [
  {
    n: "07",
    target: "Direct-to-model · MiniMax-M2",
    scope: "FS1 · FS3 · FS4",
    findings: "16 (12 HIGH)",
    verdict: "FAIL",
  },
  {
    n: "08",
    target: "Direct-to-model · gpt-oss:120b",
    scope: "FS1 · FS3 · FS4 · FS5",
    findings: "38 (36 HIGH)",
    verdict: "FAIL",
  },
  {
    n: "01",
    target: "Claude Code · Opus 4.7",
    scope: "FS3 · full battery",
    findings: "0",
    verdict: "PASS",
  },
  {
    n: "03",
    target: "Claude Code · Opus 4.7 (extended)",
    scope: "FS1 · FS3",
    findings: "0",
    verdict: "STRONG PASS",
  },
  {
    n: "04",
    target: "Antigravity · Opus 4.6 Thinking",
    scope: "FS1 · FS3 · FS5",
    findings: "1 disclosed",
    verdict: "STRONG PASS",
  },
  {
    n: "05",
    target: "Claude Code · Sonnet 4.6",
    scope: "FS3 · full battery",
    findings: "0",
    verdict: "STRONG PASS",
  },
  {
    n: "06",
    target: "Claude Code · Haiku 4.5",
    scope: "FS3 · full battery",
    findings: "0",
    verdict: "STRONG PASS",
  },
  {
    n: "02",
    target: "Redacted under NDA",
    scope: "—",
    findings: "—",
    verdict: "UNDER NDA",
    redacted: true,
  },
];

export function Receipts() {
  return (
    <section
      id="receipts"
      className="py-32 lg:py-40"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-textl)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>
              PUBLIC CASE STUDIES
            </p>
          </Reveal>
          <h2 className="h-mega mt-8" style={{ color: "var(--color-textl)" }}>
            <WordCascade as="div" text="Methodology" />
            <WordCascade as="div" text="validated against" delay={0.2} />
            <WordCascade
              as="div"
              text="named targets."
              delay={0.4}
              style={{ color: "var(--color-mute2)" }}
            />
          </h2>
          <Reveal delay={0.8}>
            <p
              className="lead mt-10 mx-auto max-w-2xl"
              style={{ color: "#A1A1A6" }}
            >
              Eight published assessments. Six PASS verdicts on Claude-family
              hosts. Two FAIL verdicts on cross-family direct-to-model targets —
              the empirical property that auditors, insurers, and acquirers need
              to see before they accept a methodology as evidence-grade.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th width="6%">#</Th>
                <Th width="36%">Target</Th>
                <Th width="26%">Surface scope</Th>
                <Th width="14%">Findings</Th>
                <Th width="18%" align="right">
                  Verdict
                </Th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {RECEIPTS.map((r) => (
                <ReceiptRow key={r.n} r={r} />
              ))}
            </motion.tbody>
          </table>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link
            href="/case-studies/"
            className="inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
            style={{ color: "var(--color-gold-light)" }}
          >
            View all 8 case studies &rarr;
          </Link>
          <a
            href="mailto:Lance@vectorbreak.com?subject=Case%20study%20access%20request"
            className="inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
            style={{ color: "var(--color-mute2)" }}
          >
            Or request full access (NDA) &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function Th({
  children,
  width,
  align,
}: {
  children: React.ReactNode;
  width?: string;
  align?: "left" | "right";
}) {
  return (
    <th
      className="py-4 px-4 text-xs font-medium uppercase tracking-wider"
      style={{
        width,
        textAlign: align ?? "left",
        color: "var(--color-mute2)",
        borderBottom: "1px solid var(--color-mute)",
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </th>
  );
}

function ReceiptRow({ r }: { r: Receipt }) {
  return (
    <motion.tr
      className="transition-colors hover:bg-[var(--color-bg2)]"
      style={{ borderBottom: "1px solid var(--color-rule-dark)" }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
        },
      }}
    >
      <Td mono>{r.n}</Td>
      <Td>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "1.05rem",
            letterSpacing: "-0.015em",
            color: r.redacted ? "var(--color-mute)" : "var(--color-textl)",
            fontStyle: r.redacted ? "italic" : "normal",
          }}
        >
          {r.target}
        </span>
      </Td>
      <Td mono>{r.scope}</Td>
      <Td mono>{r.findings}</Td>
      <Td align="right">
        <Verdict v={r.verdict} />
      </Td>
    </motion.tr>
  );
}

function Td({
  children,
  mono,
  align,
}: {
  children: React.ReactNode;
  mono?: boolean;
  align?: "left" | "right";
}) {
  return (
    <td
      className="py-4 px-4 text-sm"
      style={{
        textAlign: align ?? "left",
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        color: mono ? "var(--color-mute2)" : "var(--color-textl)",
        fontSize: mono ? "0.85rem" : "0.95rem",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function Verdict({ v }: { v: Receipt["verdict"] }) {
  const style: Record<
    Receipt["verdict"],
    { color: string; bg: string }
  > = {
    PASS: { color: "#34D399", bg: "rgba(52,211,153,0.10)" },
    "STRONG PASS": { color: "#34D399", bg: "rgba(52,211,153,0.10)" },
    FAIL: { color: "#F87171", bg: "rgba(248,113,113,0.10)" },
    "UNDER NDA": { color: "#86868B", bg: "rgba(134,134,139,0.10)" },
  };
  const { color, bg } = style[v];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold whitespace-nowrap"
      style={{
        color,
        background: bg,
        borderRadius: 980,
        fontFamily: "var(--font-sans)",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          background: color,
          borderRadius: "50%",
        }}
      />
      {v}
    </span>
  );
}
