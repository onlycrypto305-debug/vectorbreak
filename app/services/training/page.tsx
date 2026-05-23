import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "AI Security Training — Five Surfaces workshop for AppSec, ML & platform teams",
  description:
    "Two-day on-site or virtual Five Surfaces workshop. Hands-on labs against intentionally vulnerable agents. Certification track. 90 days of async Q&A. From $60k.",
  alternates: { canonical: "https://vectorbreak.com/services/training/" },
  openGraph: {
    type: "article",
    url: "https://vectorbreak.com/services/training/",
    title: "AI Security Training — Vectorbreak",
    description:
      "Stand up your team's own AI red-teaming muscle. Two-day Five Surfaces workshop, hands-on labs, certification track.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vectorbreak — AI Security Training" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Security Training — Vectorbreak",
    description: "Two-day Five Surfaces workshop. Hands-on labs. Certification. From $60k.",
    images: ["/og-image.png"],
  },
};

const DAY1 = [
  { time: "Morning",   topic: "Five Surfaces walkthrough", detail: "Framework overview, threat model per surface, mapping to OWASP-LLM-Top-10 and MITRE ATLAS." },
  { time: "Midday",    topic: "Surface 1 + Surface 2 labs", detail: "Hands-on jailbreak batteries, indirect-prompt-injection exercises against a vulnerable RAG pipeline." },
  { time: "Afternoon", topic: "Surface 3 deep-dive (MCP)", detail: "Tool poisoning, privilege escalation, parameter injection. mcp-fuzzer walkthrough. Live PoCs." },
];

const DAY2 = [
  { time: "Morning",   topic: "Surface 4 + Surface 5 labs", detail: "System-prompt extraction, training-data inference, sandbox-escape battery. Hands-on against intentionally vulnerable targets." },
  { time: "Midday",    topic: "Findings → remediation playbook", detail: "How to write findings, set severity, build remediation guidance. Per-surface defense-in-depth patterns." },
  { time: "Afternoon", topic: "Capstone exercise + certification", detail: "Team-based red-team against a fresh target. Cert exam covers methodology and remediation. Pass = listed in Vectorbreak's certified-practitioner directory." },
];

const FAQ = [
  {
    q: "Who is this workshop for?",
    a: "AppSec engineers responsible for AI features. ML and MLOps platform teams shipping LLM-backed products. Security architects evaluating MCP deployments. Platform engineers responsible for the AI runtime. Compliance and risk leads who need to understand what AI red-teaming actually involves. Best fit: 6-12 attendees with existing security or platform fundamentals — this is not an LLM intro class.",
  },
  {
    q: "What's included?",
    a: "Two days of instructor-led content (on-site at your office or virtual). All hands-on lab environments and intentionally vulnerable agent targets. Certification exam at the end of day 2. 90 days of async Q&A and follow-up review via a private channel after the workshop. A copy of the Five Surfaces checklist, the mcp-fuzzer tool, and the lab targets to keep and reuse internally. Lance instructs every session personally — no junior contractors.",
  },
  {
    q: "What will my team actually be able to do after?",
    a: "Run a Five Surfaces assessment on your own agents without external help. Recognize and exploit the top risk classes across all five surfaces. Write findings reports in the format your compliance team and insurance carrier expect. Operate mcp-fuzzer in CI to catch regressions. Build a remediation plan that maps to OWASP-LLM-Top-10 and EU AI Act Article 15. Certified practitioners are listed in our directory (opt-in).",
  },
  {
    q: "How much does it cost?",
    a: "From $60,000 fixed-fee for a standard 2-day workshop with up to 12 attendees. Custom pricing for larger cohorts, multi-team rollouts, repeat engagements, or specialized scopes (e.g., compliance-focused, multi-agent-focused). Includes all lab infrastructure, certification, and 90 days of async support. Travel costs included for on-site within North America and Europe; charged at cost elsewhere.",
  },
  {
    q: "Can it be delivered virtually?",
    a: "Yes — the workshop runs equally well on Zoom/Teams/Meet. Virtual delivery is the same content, same labs (cloud-hosted), same certification. We typically split the two days across two consecutive weeks for virtual delivery (one day per week) to reduce screen fatigue, but consecutive-day virtual is also available.",
  },
  {
    q: "Is there a public version of this training?",
    a: "Not currently. The workshop is private and contracted per organization. We may run conference workshops (BSides, DEF CON AI Village, AppSec EU) — those announcements go out via the LinkedIn page and the practitioner Discord community.",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://vectorbreak.com/services/training/#service",
  name: "AI Security Training",
  serviceType: "Hands-On Workshop",
  provider: { "@id": "https://vectorbreak.com/#organization" },
  areaServed: "Worldwide",
  url: "https://vectorbreak.com/services/training/",
  description:
    "Two-day on-site or virtual Five Surfaces workshop for AppSec, ML, and platform teams. Hands-on labs against intentionally vulnerable agents. Certification track. 90 days of async Q&A.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "60000",
    priceSpecification: { "@type": "UnitPriceSpecification", price: "60000", priceCurrency: "USD", unitText: "two-day workshop, up to 12 attendees" },
    description: "Workshop engagement from $60k. Custom pricing for larger cohorts or specialized scopes.",
  },
  category: "Educational Service",
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vectorbreak.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://vectorbreak.com/#services" },
    { "@type": "ListItem", position: 3, name: "Training", item: "https://vectorbreak.com/services/training/" },
  ],
};

function stringifyLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function TrainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(FAQ_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(BREADCRUMB_LD) }} />

      <article className="pt-32 lg:pt-44 pb-20" style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}>
        <header className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="h-eyebrow">SERVICE · TRAIN & EDUCATE · FROM $60K</p>
          </Reveal>
          <h1 className="h-hero mt-10" style={{ color: "var(--color-ink)" }}>
            <WordCascade as="div" text="Stand up your team's" />
            <WordCascade as="div" text="own red-teaming muscle." delay={0.25} style={{ color: "var(--color-mute2)" }} />
          </h1>
          <Reveal delay={0.6}>
            <p className="lead mt-10 mx-auto max-w-2xl">
              Two-day Five Surfaces workshop for AppSec, ML, and platform teams.
              Hands-on labs against intentionally vulnerable agents. Certification
              track. Ninety days of async Q&amp;A and follow-up review.
            </p>
          </Reveal>
        </header>

        <section aria-labelledby="what" className="mt-24 lg:mt-32 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="what" className="h-section" style={{ color: "var(--color-ink)" }}>What you&apos;ll be able to do after</h2>
            <ul className="mt-8 space-y-3" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              <li>Run a{" "}<Link href="/methodology/" style={{ color: "var(--color-gold)" }}>Five Surfaces</Link> assessment on your own agents without external help</li>
              <li>Recognize and exploit the top risk classes across all five surfaces — 69 catalogued classes total</li>
              <li>Write findings reports in the format your compliance team and insurance carrier expect</li>
              <li>Operate mcp-fuzzer in CI to catch regressions before they ship</li>
              <li>Build a remediation plan that maps to OWASP-LLM-Top-10 and EU AI Act Article 15</li>
              <li>Lead internal AI security reviews with a structured methodology, not ad-hoc checklists</li>
            </ul>
          </Reveal>
        </section>

        <section aria-labelledby="agenda" className="mt-20 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="agenda" className="h-section" style={{ color: "var(--color-ink)" }}>Agenda</h2>
            <h3 className="h-sub mt-8" style={{ color: "var(--color-ink)" }}>Day 1 — Framework + Surfaces 1-3</h3>
            <ul className="mt-4 divide-y" style={{ borderColor: "var(--color-rule)" }}>
              {DAY1.map((b, i) => <AgendaRow key={i} {...b} isFirst={i === 0} />)}
            </ul>
            <h3 className="h-sub mt-12" style={{ color: "var(--color-ink)" }}>Day 2 — Surfaces 4-5 + capstone</h3>
            <ul className="mt-4 divide-y" style={{ borderColor: "var(--color-rule)" }}>
              {DAY2.map((b, i) => <AgendaRow key={i} {...b} isFirst={i === 0} />)}
            </ul>
          </Reveal>
        </section>

        <section aria-labelledby="who" className="mt-20 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="who" className="h-section" style={{ color: "var(--color-ink)" }}>Who it&apos;s for</h2>
            <ul className="mt-8 space-y-3" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              <li><strong>AppSec engineers</strong> responsible for AI features but trained in web/network methodologies</li>
              <li><strong>ML and MLOps platform teams</strong> shipping LLM-backed products</li>
              <li><strong>Security architects</strong> evaluating MCP deployments</li>
              <li><strong>Platform engineers</strong> responsible for the AI runtime, sandboxes, and agent orchestration</li>
              <li><strong>Compliance and risk leads</strong> who need to understand what AI red-teaming actually involves</li>
            </ul>
            <p className="mt-6" style={{ color: "var(--color-mute)" }}>
              Best fit: 6-12 attendees with existing security or platform fundamentals. This is not an LLM intro class.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="included" className="mt-20 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="included" className="h-section" style={{ color: "var(--color-ink)" }}>What&apos;s included</h2>
            <ul className="mt-8 space-y-3" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              <li>Two days of instructor-led content (on-site or virtual)</li>
              <li>All hands-on lab environments and intentionally vulnerable agent targets</li>
              <li>Certification exam at the end of day 2 — pass = listed in Vectorbreak&apos;s certified-practitioner directory (opt-in)</li>
              <li>90 days of async Q&amp;A and follow-up review via a private channel</li>
              <li>Copy of the Five Surfaces checklist, the mcp-fuzzer tool, and the lab targets to keep and reuse internally</li>
              <li>Lance instructs every session personally — no junior contractors</li>
            </ul>
          </Reveal>
        </section>

        <section aria-labelledby="faq" className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="faq" className="h-section" style={{ color: "var(--color-ink)" }}>FAQ</h2>
          </Reveal>
          <div className="mt-12 space-y-12">
            {FAQ.map((item, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <h3 className="h-sub" style={{ color: "var(--color-ink)" }}>{item.q}</h3>
                <p className="mt-4" style={{ lineHeight: 1.6 }}>{item.a}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-32 lg:mt-40 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="h-eyebrow">NEXT</p>
            <h2 className="h-section mt-6" style={{ color: "var(--color-ink)" }}>Book a workshop date.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="mailto:Lance@vectorbreak.com?subject=Training%20enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--color-ink)", color: "var(--color-textl)", borderRadius: 980 }}>
                Enquire about a workshop →
              </a>
              <Link href="/methodology/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium" style={{ color: "var(--color-gold)" }}>
                Read the methodology first →
              </Link>
            </div>
            <p className="mt-16 text-sm" style={{ color: "var(--color-mute2)" }}>
              See also:{" "}
              <Link href="/services/audit/" style={{ color: "var(--color-gold)" }}>Audit</Link>{" · "}
              <Link href="/services/build/" style={{ color: "var(--color-gold)" }}>Custom Build</Link>{" · "}
              <Link href="/" style={{ color: "var(--color-gold)" }}>Home</Link>
            </p>
          </Reveal>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}

function AgendaRow({ time, topic, detail, isFirst }: { time: string; topic: string; detail: string; isFirst: boolean }) {
  return (
    <li className="py-4 grid grid-cols-[110px_1fr] gap-4" style={{
      borderTop: isFirst ? "1px solid var(--color-rule)" : undefined,
      borderBottom: "1px solid var(--color-rule)",
    }}>
      <div className="h-eyebrow pt-1" style={{ color: "var(--color-gold)" }}>{time}</div>
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 500, color: "var(--color-ink)" }}>{topic}</p>
        <p className="mt-1 text-sm" style={{ color: "var(--color-mute)", lineHeight: 1.55 }}>{detail}</p>
      </div>
    </li>
  );
}
