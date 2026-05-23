import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "AI Security Audit — Red-team your AI agent on Five Surfaces",
  description:
    "Fixed-fee AI security audit using the Five Surfaces methodology. Pulse ($4.5k) → Annual Program ($185-285k). Insurance-grade deliverable, retest included.",
  alternates: { canonical: "https://vectorbreak.com/services/audit/" },
  openGraph: {
    type: "article",
    url: "https://vectorbreak.com/services/audit/",
    title: "AI Security Audit — Vectorbreak",
    description:
      "Fixed-fee red-team engagements against your live AI agent or RAG pipeline. Insurance-grade deliverable. EU AI Act Article 15/26 conformity.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vectorbreak — AI Security Audit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Security Audit — Vectorbreak",
    description: "Fixed-fee red-team. Five Surfaces methodology. Pulse $4.5k → Annual $285k.",
    images: ["/og-image.png"],
  },
};

const SKUS = [
  { name: "Pulse",                price: "$4,500",         duration: "1 day",     scope: "Public 10-probe Surface-3 battery against your MCP server(s). 1-page red/yellow/green + 30-min readout." },
  { name: "MCP Triage",           price: "$12,500",        duration: "1 week",    scope: "Surface 3 only — full fuzzer run + manual creative testing + findings memo." },
  { name: "Pilot",                price: "$28,500",        duration: "2 weeks",   scope: "Single in-scope surface, single product. Full deliverable shape, narrower target." },
  { name: "Standard",             price: "$48,500",        duration: "4 weeks",   scope: "One product, ≤3 MCP servers, ≤2 retrieval pipelines, all five surfaces in scope." },
  { name: "Multi-Agent",          price: "$78,500",        duration: "4 weeks",   scope: "Standard + multi-agent orchestration (LangGraph / AutoGen / CrewAI), 4-6 MCP servers, sub-agent trust analysis." },
  { name: "Compliance-Anchored",  price: "$125,000",       duration: "5 weeks",   scope: "Standard + EU AI Act Article 15/16/26 conformity mapping + ISO/IEC 42001 Annex A + insurance-attestation pack." },
  { name: "Annual Program",       price: "$185K - $285K",  duration: "12 months", scope: "Quarterly assessments + monthly threat-intel briefing + 24-hr emergency-triage SLA + annual board readout." },
];

const FAQ = [
  {
    q: "What's an AI security audit?",
    a: "An AI security audit is a fixed-scope red-team engagement against a live AI agent, RAG pipeline, or MCP deployment. Vectorbreak runs the Five Surfaces methodology against your system, catalogs findings across 69 risk classes, and delivers an insurance-grade report with a retest engagement included. Unlike traditional pentesting (which targets network and web-app vulnerabilities), an AI audit targets prompt injection, tool-call privilege escalation, model extraction, sandbox escape, and other LLM-specific attack patterns.",
  },
  {
    q: "What surfaces are tested?",
    a: "Standard and above tier engagements test all five: Input/Output (prompts, jailbreaks, output sanitization), Retrieval (RAG corpus poisoning, indirect prompt injection), Tool-Call/MCP (function poisoning, privilege escalation, RCE chains), Model (prompt extraction, training-data leakage, safety-filter bypass), and Runtime (sandbox escape, memory poisoning, telemetry exfiltration). Pulse and MCP Triage are scoped to Surface 3 only. Pilot focuses on one surface of your choice.",
  },
  {
    q: "What does the deliverable include?",
    a: "Every engagement at Pilot tier and above includes: (1) findings report with reproductions and severity ratings, (2) remediation guidance per finding, (3) one retest engagement to validate fixes, (4) sign-off letter suitable for compliance teams, insurance carriers, and acquirer diligence. Compliance-Anchored adds explicit Article 15/16/26 mapping, ISO/IEC 42001 Annex A documentation, and an insurance-attestation pack. Annual Program adds quarterly re-assessments, monthly threat-intel briefings, and 24-hour emergency triage SLA.",
  },
  {
    q: "How much does it cost?",
    a: "Fixed-fee at every level. Pulse $4,500 (1 day). MCP Triage $12,500 (1 week). Pilot $28,500 (2 weeks). Standard $48,500 (4 weeks). Multi-Agent $78,500 (4 weeks). Compliance-Anchored $125,000 (5 weeks). Annual Program $185K-$285K (12 months). Payment is 60% on signature, 30% at delivery, 10% on retest sign-off. No hourly creep, no travel-cost surprises. Infrastructure and PoCs are included.",
  },
  {
    q: "How long does an audit take?",
    a: "Pulse: 1 day. MCP Triage: 1 week. Pilot: 2 weeks. Standard: 4 weeks. Multi-Agent: 4 weeks. Compliance-Anchored: 5 weeks (the extra week covers conformity mapping). Annual Program: continuous across 12 months with quarterly milestones. We meet the timeline or refund the unused portion.",
  },
  {
    q: "Do you support EU AI Act compliance?",
    a: "Yes — the Compliance-Anchored tier ($125k, 5 weeks) is purpose-built for it. Deliverables include explicit Article 15 (third-party testing) mapping, Article 16 (conformity assessment) documentation, Article 26 (deployer obligations) coverage, ISO/IEC 42001 Annex A alignment, and an insurance-attestation pack ready for compliance teams and M&A diligence. The framework's 69 risk classes and 139 validated test cases provide the audit trail regulators and carriers require.",
  },
  {
    q: "What happens after vulnerabilities are found?",
    a: "Every engagement includes a retest cycle: we hand over the findings, you remediate, we re-test the same surface to confirm the fix. Sign-off letters reference the retest. If you'd prefer to outsource the fix rather than implement in-house, our Custom Build service ships the defensive tooling — hardened MCP servers, prompt-injection monitoring, agent-loop circuit breakers, CI-integrated red-team — built to your stack and maintained on retainer.",
  },
  {
    q: "Why fixed-fee?",
    a: "Time-and-materials engagements punish vendors for being efficient. Fixed-fee aligns incentives: we scope tight, we work fast, you don't get billed for our learning curve. If we hit the timeline, we close the engagement on the agreed price. If we underestimate scope, that's our problem. The only escape valve is mutual scope-change agreement before extension — the original number doesn't drift.",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://vectorbreak.com/services/audit/#service",
  name: "AI Security Audit",
  serviceType: "Red-Team Assessment",
  provider: { "@id": "https://vectorbreak.com/#organization" },
  areaServed: "Worldwide",
  url: "https://vectorbreak.com/services/audit/",
  description:
    "Fixed-scope red-team engagements against your live AI agent or RAG pipeline using the Five Surfaces methodology. Insurance-grade deliverable, retest engagement included, sign-off letter for compliance, carrier and acquirer use.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "4500",
    highPrice: "285000",
    offerCount: SKUS.length,
    priceSpecification: SKUS.map((s) => ({
      "@type": "PriceSpecification",
      name: s.name,
      price: s.price.replace(/[^0-9]/g, "").slice(0, 6) || s.price,
      priceCurrency: "USD",
      description: `${s.duration} — ${s.scope}`,
    })),
  },
  category: "Cybersecurity Service",
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vectorbreak.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://vectorbreak.com/#services" },
    { "@type": "ListItem", position: 3, name: "Audit", item: "https://vectorbreak.com/services/audit/" },
  ],
};

function stringifyLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function AuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(FAQ_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(BREADCRUMB_LD) }} />

      <article className="pt-32 lg:pt-44 pb-20" style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}>
        <header className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="h-eyebrow">SERVICE · AUDIT · FIXED FEE</p>
          </Reveal>
          <h1 className="h-hero mt-10" style={{ color: "var(--color-ink)" }}>
            <WordCascade as="div" text="Find your problems" />
            <WordCascade as="div" text="before someone else does." delay={0.25} style={{ color: "var(--color-mute2)" }} />
          </h1>
          <Reveal delay={0.6}>
            <p className="lead mt-10 mx-auto max-w-2xl">
              Fixed-scope red-team engagements against your live AI agent or
              RAG pipeline. Five Surfaces methodology. Insurance-grade
              deliverable. Retest included. Sign-off letter for your compliance
              team, your carrier, and your acquirer.
            </p>
          </Reveal>
        </header>

        <section aria-labelledby="what" className="mt-24 lg:mt-32 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="what" className="h-section" style={{ color: "var(--color-ink)" }}>What&apos;s an AI security audit?</h2>
            <p className="mt-8" style={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
              An AI security audit is a fixed-scope red-team engagement against
              a live AI agent, RAG pipeline, or MCP deployment. Vectorbreak runs
              the{" "}
              <Link href="/methodology/" style={{ color: "var(--color-gold)" }}>
                Five Surfaces methodology
              </Link>{" "}
              against your system, catalogs findings across 69 risk classes, and
              delivers an insurance-grade report with a retest engagement
              included. Unlike traditional pentesting — which targets network
              and web-app vulnerabilities — an AI audit targets prompt
              injection, tool-call privilege escalation, model extraction,
              sandbox escape, and other LLM-specific attack patterns that
              standard methodologies miss entirely.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="who" className="mt-20 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="who" className="h-section" style={{ color: "var(--color-ink)" }}>Who it&apos;s for</h2>
            <ul className="mt-8 space-y-4" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              <li><strong>Cyber-insurance renewal</strong> — carrier is asking for evidence of model-level red-teaming before they&apos;ll quote your renewal.</li>
              <li><strong>EU AI Act conformity</strong> — Article 15 (third-party testing) and Article 26 (conformity assessment) require documented evidence.</li>
              <li><strong>Acquirer diligence</strong> — buyer&apos;s security team wants an independent AI audit before signing.</li>
              <li><strong>Customer security questionnaire</strong> — enterprise prospect wants proof of AI security testing before they sign your contract.</li>
              <li><strong>MCP deployment in production</strong> — you ship MCP servers and want to catch tool-poisoning, privilege escalation, and prompt-to-RCE chains before someone else does.</li>
              <li><strong>Internal red-team augmentation</strong> — your AppSec team has web/network coverage but no AI-specific methodology.</li>
            </ul>
          </Reveal>
        </section>

        <section aria-labelledby="deliverable" className="mt-20 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="deliverable" className="h-section" style={{ color: "var(--color-ink)" }}>What&apos;s in the deliverable</h2>
            <ul className="mt-8 space-y-3" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              <li>Findings report with reproductions, severity ratings, and per-finding remediation guidance</li>
              <li>One retest engagement to validate your remediations</li>
              <li>Sign-off letter referencing the retest, suitable for compliance teams, insurance carriers, and acquirer diligence</li>
              <li>Mapping to OWASP-LLM-Top-10, MITRE ATLAS, and the Five Surfaces 69-class taxonomy</li>
              <li>Executive summary suitable for a board readout or CISO brief</li>
              <li>Tooling artifacts (test scripts, fuzzer configs) where applicable</li>
            </ul>
            <p className="mt-6" style={{ color: "var(--color-mute)" }}>
              Compliance-Anchored adds Article 15/16/26 mapping, ISO/IEC 42001 Annex A documentation, and an insurance-attestation pack.
              Annual Program adds quarterly re-assessments, monthly threat-intel briefings, and 24-hour emergency triage SLA.
            </p>
          </Reveal>
        </section>

        <section aria-labelledby="skus" className="mt-24 lg:mt-32 max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="skus" className="h-section text-center" style={{ color: "var(--color-ink)" }}>The SKU ladder</h2>
            <p className="lead mt-6 max-w-2xl mx-auto text-center">
              Fixed-fee at every level. 60% on signature, 30% at delivery, 10% on retest sign-off.
            </p>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-left text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-rule)" }}>
                    <Th>SKU</Th><Th>Scope</Th><Th>Duration</Th><Th align="right">From</Th>
                  </tr>
                </thead>
                <tbody>
                  {SKUS.map((s) => (
                    <tr key={s.name} style={{ borderBottom: "1px solid var(--color-rule)" }}>
                      <Td><strong style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>{s.name}</strong></Td>
                      <Td>{s.scope}</Td>
                      <Td>{s.duration}</Td>
                      <Td align="right"><span style={{ fontFamily: "var(--font-display)", fontFeatureSettings: '"tnum"', whiteSpace: "nowrap" }}>{s.price}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <h2 className="h-section mt-6" style={{ color: "var(--color-ink)" }}>Scope an engagement.</h2>
            <p className="lead mt-6 mx-auto max-w-xl">
              Two questions. Forty-eight hours. One fixed-fee proposal.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--color-ink)", color: "var(--color-textl)", borderRadius: 980 }}>
                Get a fixed-fee proposal →
              </Link>
              <Link href="/methodology/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium" style={{ color: "var(--color-gold)" }}>
                Read the methodology first →
              </Link>
            </div>
            <p className="mt-16 text-sm" style={{ color: "var(--color-mute2)" }}>
              See also:{" "}
              <Link href="/services/training/" style={{ color: "var(--color-gold)" }}>Training</Link>{" · "}
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

function Th({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th className="py-4 pr-4 h-eyebrow" style={{ color: "var(--color-mute2)", fontWeight: 500, textAlign: align ?? "left" }}>
      {children}
    </th>
  );
}

function Td({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td className="py-5 pr-4 align-top" style={{ color: "var(--color-ink)", textAlign: align ?? "left", lineHeight: 1.5 }}>
      {children}
    </td>
  );
}
