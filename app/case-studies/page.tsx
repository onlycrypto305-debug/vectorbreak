import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";
import { SiteFooter } from "@/components/SiteFooter";
import { CASES, PUBLIC_CASES, type Verdict } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Case Studies — 8 Five Surfaces assessments, 6 PASS, 2 FAIL",
  description:
    "Eight published Five Surfaces assessments: 6 PASS on Claude-family hosts (Opus 4.7, Sonnet 4.6, Haiku 4.5, Antigravity), 2 FAIL on direct-to-model (MiniMax-M2, gpt-oss:120b).",
  alternates: { canonical: "https://vectorbreak.com/case-studies/" },
  openGraph: {
    type: "article",
    url: "https://vectorbreak.com/case-studies/",
    title: "Case Studies — Vectorbreak",
    description:
      "Six PASS verdicts on Claude-family. Two FAIL verdicts cross-family. Methodology validated against named targets.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vectorbreak — Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Vectorbreak",
    description: "8 published Five Surfaces assessments. 6 PASS, 2 FAIL.",
    images: ["/og-image.png"],
  },
};

const ITEM_LIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://vectorbreak.com/case-studies/#itemlist",
  name: "Vectorbreak Case Studies",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: PUBLIC_CASES.length,
  itemListElement: PUBLIC_CASES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://vectorbreak.com/case-studies/${c.slug}/`,
    name: c.target,
  })),
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vectorbreak.com/" },
    { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://vectorbreak.com/case-studies/" },
  ],
};

function stringifyLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function CaseStudiesHub() {
  const fails = CASES.filter((c) => c.verdict === "FAIL");
  const passes = CASES.filter((c) => c.verdict === "PASS" || c.verdict === "STRONG PASS");
  const ndas = CASES.filter((c) => c.verdict === "UNDER NDA");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(ITEM_LIST_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(BREADCRUMB_LD) }} />

      <article className="pt-32 lg:pt-44 pb-20" style={{ background: "var(--color-bg)", color: "var(--color-textl)" }}>
        <header className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>PUBLIC CASE STUDIES · 8 ASSESSMENTS</p>
          </Reveal>
          <h1 className="h-hero mt-10" style={{ color: "var(--color-textl)" }}>
            <WordCascade as="div" text="Methodology validated" />
            <WordCascade as="div" text="against named targets." delay={0.25} style={{ color: "var(--color-mute2)" }} />
          </h1>
          <Reveal delay={0.6}>
            <p className="lead mt-10 mx-auto max-w-2xl" style={{ color: "#A1A1A6" }}>
              Eight published assessments. Six PASS verdicts on Claude-family
              hosts. Two FAIL verdicts on cross-family direct-to-model targets —
              the empirical property auditors, insurers, and acquirers need to
              see before they accept a methodology as evidence-grade.
            </p>
          </Reveal>
        </header>

        {/* Table — full case list, FAILs first */}
        <section aria-labelledby="all-cases" className="mt-24 lg:mt-32 max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="all-cases" className="h-section text-center" style={{ color: "var(--color-textl)" }}>All eight</h2>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-left text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-mute)" }}>
                    <Th>#</Th><Th>Target</Th><Th>Surface scope</Th><Th>Findings</Th><Th align="right">Verdict</Th>
                  </tr>
                </thead>
                <tbody>
                  {CASES.map((c) => (
                    <tr key={c.n} style={{ borderBottom: "1px solid var(--color-rule-dark)" }}>
                      <Td><span style={{ fontFamily: "var(--font-mono)", color: "var(--color-mute2)" }}>{c.n}</span></Td>
                      <Td>
                        {c.slug ? (
                          <Link
                            href={`/case-studies/${c.slug}/`}
                            style={{
                              fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.05rem",
                              letterSpacing: "-0.015em", color: "var(--color-textl)",
                            }}
                            className="hover:text-[var(--color-gold-light)] transition-colors"
                          >
                            {c.target}
                          </Link>
                        ) : (
                          <span style={{
                            fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.05rem",
                            letterSpacing: "-0.015em", color: "var(--color-mute)", fontStyle: "italic",
                          }}>{c.target}</span>
                        )}
                      </Td>
                      <Td mono>{c.scope}</Td>
                      <Td mono>{c.findings}</Td>
                      <Td align="right"><VerdictBadge v={c.verdict} /></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* FAILs — the empirical differentiator */}
        <section aria-labelledby="fails" className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="fails" className="h-section" style={{ color: "var(--color-textl)" }}>The two FAIL verdicts</h2>
            <p className="lead mt-6" style={{ color: "#A1A1A6" }}>
              Cross-family direct-to-model targets. The empirical property that
              proves the methodology is not a false-negative machine.
            </p>
          </Reveal>
          <div className="mt-12 space-y-12">
            {fails.map((c) => (
              <CaseSummary key={c.n} c={c} onDark />
            ))}
          </div>
        </section>

        {/* PASSes */}
        <section aria-labelledby="passes" className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="passes" className="h-section" style={{ color: "var(--color-textl)" }}>Six PASS verdicts</h2>
            <p className="lead mt-6" style={{ color: "#A1A1A6" }}>
              Claude-family hosts across Opus 4.7, Sonnet 4.6, Haiku 4.5, and
              Antigravity. The methodology certifies secure deployments, not
              just finds broken ones.
            </p>
          </Reveal>
          <div className="mt-12 space-y-12">
            {passes.map((c) => (
              <CaseSummary key={c.n} c={c} onDark />
            ))}
          </div>
        </section>

        {/* NDA */}
        {ndas.length > 0 && (
          <section aria-labelledby="nda" className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8">
            <Reveal>
              <h2 id="nda" className="h-section" style={{ color: "var(--color-textl)" }}>Under NDA</h2>
              <p className="lead mt-6" style={{ color: "#A1A1A6" }}>
                Additional engagements published under non-disclosure
                agreements. Methodology and verdict format applied; identifying
                detail withheld.
              </p>
              <p className="mt-8 text-sm" style={{ color: "var(--color-mute)" }}>
                {ndas.length} case{ndas.length === 1 ? "" : "s"} redacted.
              </p>
            </Reveal>
          </section>
        )}

        {/* Methodology insight */}
        <section aria-labelledby="insight" className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="insight" className="h-section" style={{ color: "var(--color-textl)" }}>What the eight cases prove</h2>
            <div className="mt-8 space-y-6" style={{ color: "#D2D2D7", fontSize: "1.05rem", lineHeight: 1.6 }}>
              <p>
                The <strong>PASS verdicts</strong> establish that the{" "}
                <Link href="/methodology/" style={{ color: "var(--color-gold-light)" }}>Five Surfaces methodology</Link>{" "}
                can validate secure deployments — not just find problems. Six
                independent case studies with zero to one finding provide the
                evidence-grade proof that insurers, acquirers, and compliance
                teams require.
              </p>
              <p>
                The <strong>FAIL verdicts</strong> demonstrate that the
                methodology detects real, high-severity issues in undefended
                systems. The cross-family failures — MiniMax-M2 and gpt-oss:120b
                — show the methodology is not a false-negative machine. It
                reveals genuine risk in systems that lack the host-side
                discipline a Claude SDK-style deployment provides.
              </p>
              <p>
                The pattern that emerges: <strong>deployment design is more
                decisive than model choice</strong>. A capable open-source model
                used without defensive engineering will fail across multiple
                surfaces. A Claude-family deployment with the SDK&apos;s tool-call
                and refusal discipline will hold up — at every model tier from
                Haiku 4.5 through Opus 4.7.
              </p>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>NEXT</p>
            <h2 className="h-section mt-6" style={{ color: "var(--color-textl)" }}>Request full case-study access.</h2>
            <p className="lead mt-6 mx-auto max-w-xl" style={{ color: "#A1A1A6" }}>
              Detailed findings, reproductions, and remediation analysis for
              each case are available on request. NDA expected for non-public
              detail.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="mailto:Lance@vectorbreak.com?subject=Case%20study%20access%20request"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--color-gold-light)", color: "#000", borderRadius: 980 }}>
                Request full access →
              </a>
              <Link href="/methodology/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium" style={{ color: "var(--color-gold-light)" }}>
                Read the methodology →
              </Link>
            </div>
            <p className="mt-16 text-sm" style={{ color: "var(--color-mute2)" }}>
              See also:{" "}
              <Link href="/services/audit/" style={{ color: "var(--color-gold-light)" }}>Audit</Link>{" · "}
              <Link href="/services/training/" style={{ color: "var(--color-gold-light)" }}>Training</Link>{" · "}
              <Link href="/services/build/" style={{ color: "var(--color-gold-light)" }}>Build</Link>{" · "}
              <Link href="/" style={{ color: "var(--color-gold-light)" }}>Home</Link>
            </p>
          </Reveal>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}

function CaseSummary({ c, onDark }: { c: import("@/lib/cases").CaseStudy; onDark?: boolean }) {
  const titleColor = onDark ? "var(--color-textl)" : "var(--color-ink)";
  const bodyColor = onDark ? "#D2D2D7" : "var(--color-ink)";
  const muteColor = onDark ? "var(--color-mute2)" : "var(--color-mute)";
  return (
    <Reveal>
      <article style={{
        borderTop: `1px solid ${onDark ? "var(--color-rule-dark)" : "var(--color-rule)"}`,
        paddingTop: "2rem",
      }}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="h-sub" style={{ color: titleColor }}>
            <span style={{ fontFamily: "var(--font-mono)", color: muteColor, fontSize: "0.85em", marginRight: "0.75em" }}>{c.n}</span>
            {c.target}
          </h3>
          <VerdictBadge v={c.verdict} />
        </div>
        <p className="mt-3 text-sm" style={{ color: muteColor, fontFamily: "var(--font-mono)" }}>
          {c.scope} · {c.findings} finding{c.findings === "0" || c.findings === "1 disclosed" ? "" : "s"}
        </p>
        <div className="mt-5 space-y-4" style={{ color: bodyColor, lineHeight: 1.6 }}>
          {c.narrative.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {c.slug && (
          <p className="mt-5 text-sm">
            <Link href={`/case-studies/${c.slug}/`} style={{ color: onDark ? "var(--color-gold-light)" : "var(--color-gold)" }}>
              Read the case →
            </Link>
          </p>
        )}
      </article>
    </Reveal>
  );
}

function VerdictBadge({ v }: { v: Verdict }) {
  const style: Record<Verdict, { color: string; bg: string }> = {
    PASS: { color: "#34D399", bg: "rgba(52,211,153,0.10)" },
    "STRONG PASS": { color: "#34D399", bg: "rgba(52,211,153,0.10)" },
    FAIL: { color: "#F87171", bg: "rgba(248,113,113,0.10)" },
    "UNDER NDA": { color: "#86868B", bg: "rgba(134,134,139,0.10)" },
  };
  const { color, bg } = style[v];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold whitespace-nowrap"
      style={{ color, background: bg, borderRadius: 980, fontFamily: "var(--font-sans)" }}>
      <span style={{ width: 5, height: 5, background: color, borderRadius: "50%" }} />
      {v}
    </span>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th className="py-4 pr-4 h-eyebrow" style={{ color: "var(--color-mute2)", fontWeight: 500, textAlign: align ?? "left" }}>
      {children}
    </th>
  );
}

function Td({ children, mono, align }: { children: React.ReactNode; mono?: boolean; align?: "left" | "right" }) {
  return (
    <td className="py-4 pr-4 align-top text-sm" style={{
      textAlign: align ?? "left", lineHeight: 1.5,
      color: mono ? "var(--color-mute2)" : "var(--color-textl)",
      fontFamily: mono ? "var(--font-mono)" : undefined,
    }}>{children}</td>
  );
}
