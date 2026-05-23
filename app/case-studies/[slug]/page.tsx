import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { PUBLIC_CASES, type Verdict, type CaseStudy } from "@/lib/cases";

export function generateStaticParams() {
  return PUBLIC_CASES.map((c) => ({ slug: c.slug! }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = PUBLIC_CASES.find((x) => x.slug === slug);
  if (!c) return {};
  const title = `Case ${c.n}: ${c.target} — Five Surfaces ${c.verdict}`;
  return {
    title,
    description: c.metaDescription,
    alternates: { canonical: `https://vectorbreak.com/case-studies/${c.slug}/` },
    openGraph: {
      type: "article",
      url: `https://vectorbreak.com/case-studies/${c.slug}/`,
      title,
      description: c.metaDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `Vectorbreak — Case Study: ${c.target}` }],
      publishedTime: `${c.publishedDate}T00:00:00.000Z`,
      authors: ["Lance"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: c.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

function stringifyLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

function articleLd(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://vectorbreak.com/case-studies/${c.slug}/#article`,
    headline: `Case ${c.n}: ${c.target} — Five Surfaces ${c.verdict}`,
    description: c.metaDescription,
    url: `https://vectorbreak.com/case-studies/${c.slug}/`,
    datePublished: c.publishedDate,
    dateModified: c.publishedDate,
    author: { "@id": "https://vectorbreak.com/#person-lance" },
    publisher: { "@id": "https://vectorbreak.com/#organization" },
    isPartOf: { "@id": "https://vectorbreak.com/case-studies/#itemlist" },
    about: {
      "@type": "Thing",
      name: "Five Surfaces methodology",
      url: "https://vectorbreak.com/methodology/",
    },
    image: "https://vectorbreak.com/og-image.png",
    mainEntityOfPage: `https://vectorbreak.com/case-studies/${c.slug}/`,
  };
}

function breadcrumbLd(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vectorbreak.com/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://vectorbreak.com/case-studies/" },
      { "@type": "ListItem", position: 3, name: c.target, item: `https://vectorbreak.com/case-studies/${c.slug}/` },
    ],
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const c = PUBLIC_CASES.find((x) => x.slug === slug);
  if (!c) notFound();

  // Find sibling cases for the "more cases" footer
  const others = PUBLIC_CASES.filter((x) => x.slug !== slug);
  const sameFamily = others.filter((x) => x.family === c.family).slice(0, 2);
  const recommended = sameFamily.length >= 2 ? sameFamily : sameFamily.concat(others.filter((x) => x.family !== c.family)).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(articleLd(c)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(breadcrumbLd(c)) }} />

      <article className="pt-32 lg:pt-44 pb-20" style={{ background: "var(--color-bg)", color: "var(--color-textl)" }}>
        <header className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>
              CASE {c.n} · {c.family.toUpperCase()}
            </p>
            <h1 className="h-mega mt-6" style={{ color: "var(--color-textl)" }}>{c.target}</h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <VerdictBadge v={c.verdict} />
              <span className="text-sm" style={{ color: "var(--color-mute2)", fontFamily: "var(--font-mono)" }}>
                Scope: {c.scope} · Findings: {c.findings}
              </span>
            </div>
            <p className="mt-4 text-sm" style={{ color: "var(--color-mute)", fontFamily: "var(--font-mono)" }}>
              <time dateTime={c.publishedDate}>Published {c.publishedDate}</time>
            </p>
          </Reveal>
        </header>

        {/* Narrative */}
        <section className="mt-20 max-w-3xl mx-auto px-6 lg:px-8 space-y-6"
          style={{ color: "#D2D2D7", fontSize: "1.1rem", lineHeight: 1.65 }}>
          <Reveal>
            {c.narrative.map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>
        </section>

        {/* Takeaway pull-quote */}
        <section className="mt-20 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <blockquote
              className="border-l-2 pl-6 py-2 italic"
              style={{
                borderColor: "var(--color-gold)",
                color: "var(--color-textl)",
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 300,
                letterSpacing: "-0.015em",
                lineHeight: 1.4,
              }}
            >
              {c.takeaway}
            </blockquote>
            <p className="mt-4 text-xs" style={{ color: "var(--color-mute)", fontFamily: "var(--font-mono)" }}>
              Source: Vectorbreak, &ldquo;Five Surfaces&rdquo; Case {c.n}, {c.publishedDate}.
            </p>
          </Reveal>
        </section>

        {/* Methodology cross-link */}
        <section className="mt-24 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="h-eyebrow" style={{ color: "var(--color-gold-light)" }}>METHODOLOGY</p>
            <p className="mt-3 text-sm" style={{ color: "#A1A1A6", lineHeight: 1.6 }}>
              This assessment applied{" "}
              <Link href="/methodology/" style={{ color: "var(--color-gold-light)" }}>
                Vectorbreak&rsquo;s Five Surfaces framework
              </Link>{" "}
              — five attack surfaces (Input/Output, Retrieval, Tool-Call/MCP,
              Model, Runtime) covering 69 risk classes and 139 validated test
              cases. Findings detail and reproductions available under NDA on
              request.
            </p>
          </Reveal>
        </section>

        {/* Other cases */}
        <section className="mt-24 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>MORE CASES</p>
            <ul className="mt-6 divide-y" style={{ borderColor: "var(--color-rule-dark)" }}>
              {recommended.map((r, i) => (
                <li key={r.n} className="py-4 flex items-baseline justify-between gap-4"
                  style={{
                    borderTop: i === 0 ? "1px solid var(--color-rule-dark)" : undefined,
                    borderBottom: "1px solid var(--color-rule-dark)",
                  }}>
                  <Link href={`/case-studies/${r.slug}/`} className="hover:opacity-80 transition-opacity">
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-mute2)", fontSize: "0.85rem", marginRight: "0.75em" }}>{r.n}</span>
                    <span style={{ color: "var(--color-textl)", fontFamily: "var(--font-display)" }}>{r.target}</span>
                  </Link>
                  <VerdictBadge v={r.verdict} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mt-24 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="h-section" style={{ color: "var(--color-textl)" }}>Want the full report?</h2>
            <p className="lead mt-6 mx-auto max-w-xl" style={{ color: "#A1A1A6" }}>
              Detailed findings, reproductions, and remediation analysis
              available on request. NDA expected for non-public detail.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`mailto:Lance@vectorbreak.com?subject=Case%20${c.n}%20full%20access%20request`}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--color-gold-light)", color: "#000", borderRadius: 980 }}>
                Request full report →
              </a>
              <Link href="/case-studies/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium" style={{ color: "var(--color-gold-light)" }}>
                ← Back to all case studies
              </Link>
            </div>
          </Reveal>
        </section>
      </article>

      <SiteFooter />
    </>
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
