import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Custom Defensive Build — Hardened MCP servers, monitoring, agent guardrails",
  description:
    "Custom defensive tooling: hardened MCP servers, attestation pipelines, prompt-injection monitoring, agent-loop circuit breakers, automated red-team CI. Fixed-fee. Retainer optional.",
  alternates: { canonical: "https://vectorbreak.com/services/build/" },
  openGraph: {
    type: "article",
    url: "https://vectorbreak.com/services/build/",
    title: "Custom Defensive Build — Vectorbreak",
    description:
      "Don't just find the problem — ship the fix. Custom AI security tooling built to your stack and maintained on retainer.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vectorbreak — Custom Defensive Build" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Defensive Build — Vectorbreak",
    description: "Hardened MCP servers. Prompt-injection monitoring. Agent-loop circuit breakers. CI red-team.",
    images: ["/og-image.png"],
  },
};

const BUILDS = [
  {
    name: "Hardened MCP server",
    desc: "Drop-in replacement for an existing MCP server with tool-description pinning, parameter validation, per-tool trust labels, sandbox-enforced code execution, and audit logging. Production-grade, your-stack-native.",
  },
  {
    name: "Attestation pipeline",
    desc: "Cryptographic supply-chain attestation for MCP servers and tools: sign at build, verify at load, alert on drift. Integrates with sigstore/cosign or your existing PKI.",
  },
  {
    name: "Prompt-injection monitoring",
    desc: "Runtime detection of indirect prompt injection in retrieved content and tool outputs. Per-tenant alerting, replayable traces, integrates with your SIEM.",
  },
  {
    name: "Agent-loop circuit breakers",
    desc: "Iteration ceilings, exponential cost backoff, runaway-recursion detection for production agents. Tunable per-customer. Prevents the $50k OpenAI bill from a single bad prompt.",
  },
  {
    name: "Automated red-team CI",
    desc: "Five Surfaces battery as a GitHub Action / GitLab pipeline. Runs on every PR touching agent code or MCP configs. Fails the build on new high-severity findings. mcp-fuzzer-powered.",
  },
  {
    name: "Telemetry-hardening pass",
    desc: "Strip sensitive content from OTLP spans, sanitize tool input/output before logging, tenant-scope log queries, redact secrets surfaced in error paths. Compliance-grade observability.",
  },
];

const PROCESS = [
  { phase: "Scope (1 week)",       detail: "Joint scoping session. Define deliverable boundaries, integration points, success criteria. Fixed-fee proposal back within 48 hours." },
  { phase: "Build (2-8 weeks)",    detail: "Iterative builds with weekly demos. Code lands in your repos, your CI, your infra. Lance commits as a contractor under your usual access controls." },
  { phase: "Hand-off (1 week)",    detail: "Documentation, runbooks, on-call handover. Optional 30-day stabilization window where Lance is on standby for issues at no extra cost." },
  { phase: "Retainer (optional)",  detail: "Monthly retainer for maintenance, new attack-class coverage, and incident response. Cancellable any time, no auto-renew." },
];

const FAQ = [
  {
    q: "What kinds of things do you build?",
    a: "Defensive tooling for AI systems: hardened MCP servers as drop-in replacements, attestation pipelines for supply-chain integrity, prompt-injection monitoring with SIEM integration, agent-loop circuit breakers, automated Five Surfaces red-team in CI, and telemetry-hardening passes. Anything that ships, runs, and reduces the attack surface of an LLM-backed system in production.",
  },
  {
    q: "How does this differ from the Audit service?",
    a: "An audit finds the problems. A custom build ships the fix. Many engagements start with an audit, surface a specific gap (e.g., \"your MCP server is exposing unsigned tool descriptions\"), and continue into a build to close it. Some teams skip the audit and come straight to build because they already know what they need — that's fine.",
  },
  {
    q: "What does it cost?",
    a: "Fixed-fee per deliverable, scoped after a 1-week joint scoping session. Typical projects: $35k-$150k depending on integration complexity. Retainers for ongoing maintenance: $8k-$25k/month. No hourly creep, no scope drift — if we underestimated, that's our problem. Mutual scope-change agreement required for extension.",
  },
  {
    q: "Who owns the code?",
    a: "You do. All code lands in your repos under your license. Lance commits as a contractor under your usual access controls. No vendor lock-in, no hosted-by-Vectorbreak dependency — the deliverable runs entirely in your infrastructure. Open-source components are flagged in the proposal; we'll only pull in what you've already approved or what you OK during scope.",
  },
  {
    q: "Can you maintain it for us?",
    a: "Optional monthly retainer covers maintenance, new attack-class coverage as the threat landscape evolves, and incident response on the tooling Vectorbreak built. Pricing scales with scope: $8k/month covers one piece of tooling under low maintenance burden; $25k/month covers a full suite under active development. Cancellable any time, no auto-renew.",
  },
  {
    q: "Do you do greenfield AI security work or only retrofitting?",
    a: "Both. Greenfield: integrate security into your AI architecture from day 1 — sandbox design, MCP server scaffolding, monitoring instrumentation, agent-loop limits. Retrofit: take an existing production system and ship hardening upgrades that don't require a full rewrite. Greenfield is typically faster and cheaper because we're not working around existing decisions.",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://vectorbreak.com/services/build/#service",
  name: "Custom Defensive Build",
  serviceType: "Custom Engineering",
  provider: { "@id": "https://vectorbreak.com/#organization" },
  areaServed: "Worldwide",
  url: "https://vectorbreak.com/services/build/",
  description:
    "Custom defensive tooling: hardened MCP servers, attestation pipelines, prompt-injection monitoring, agent-loop circuit breakers, automated red-team CI, telemetry hardening. Fixed-fee per deliverable. Retainer optional.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Typical projects $35k-$150k fixed-fee. Retainers $8k-$25k/month.",
  },
  category: "Software Development Service",
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
    { "@type": "ListItem", position: 3, name: "Custom Build", item: "https://vectorbreak.com/services/build/" },
  ],
};

function stringifyLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function BuildPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(FAQ_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyLd(BREADCRUMB_LD) }} />

      <article className="pt-32 lg:pt-44 pb-20" style={{ background: "var(--color-paper)", color: "var(--color-ink)" }}>
        <header className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="h-eyebrow">SERVICE · CUSTOM BUILD · FIXED FEE</p>
          </Reveal>
          <h1 className="h-hero mt-10" style={{ color: "var(--color-ink)" }}>
            <WordCascade as="div" text="Don't just find" />
            <WordCascade as="div" text="the problem." delay={0.2} />
            <WordCascade as="div" text="Ship the fix." delay={0.4} style={{ color: "var(--color-mute2)" }} />
          </h1>
          <Reveal delay={0.7}>
            <p className="lead mt-10 mx-auto max-w-2xl">
              Custom defensive tooling: hardened MCP servers, attestation
              pipelines, prompt-injection monitoring, agent-loop circuit
              breakers, automated red-team CI. Built to your stack. Maintained
              on retainer if you want it.
            </p>
          </Reveal>
        </header>

        <section aria-labelledby="what" className="mt-24 lg:mt-32 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="what" className="h-section" style={{ color: "var(--color-ink)" }}>What we build</h2>
            <p className="mt-8" style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "var(--color-mute)" }}>
              Six representative deliverable shapes. Any combination, scoped
              fixed-fee. Code lands in your repos under your license.
            </p>
            <ul className="mt-10 divide-y" style={{ borderColor: "var(--color-rule)" }}>
              {BUILDS.map((b, i) => (
                <li key={b.name} className="py-6" style={{
                  borderTop: i === 0 ? "1px solid var(--color-rule)" : undefined,
                  borderBottom: "1px solid var(--color-rule)",
                }}>
                  <p className="h-eyebrow" style={{ color: "var(--color-gold)" }}>{`0${i + 1}`} · {b.name.toUpperCase()}</p>
                  <p className="mt-3" style={{ color: "var(--color-ink)", lineHeight: 1.55 }}>{b.desc}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section aria-labelledby="process" className="mt-24 lg:mt-32 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="process" className="h-section" style={{ color: "var(--color-ink)" }}>The process</h2>
            <ol className="mt-10 space-y-8" style={{ counterReset: "phase" }}>
              {PROCESS.map((p, i) => (
                <li key={p.phase} className="grid grid-cols-[60px_1fr] gap-6">
                  <div className="h-eyebrow pt-1" style={{ color: "var(--color-gold)", fontSize: "1.4rem", fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "-0.02em" }}>
                    0{i + 1}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 500, color: "var(--color-ink)", letterSpacing: "-0.015em" }}>{p.phase}</p>
                    <p className="mt-2" style={{ color: "var(--color-mute)", lineHeight: 1.55 }}>{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section aria-labelledby="who" className="mt-24 lg:mt-32 max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal>
            <h2 id="who" className="h-section" style={{ color: "var(--color-ink)" }}>Who it&apos;s for</h2>
            <ul className="mt-8 space-y-3" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
              <li><strong>Platform teams shipping MCP servers in production</strong> who don&apos;t want to build hardening from scratch</li>
              <li><strong>AI feature teams</strong> whose threat model just outgrew the AppSec team&apos;s bandwidth</li>
              <li><strong>Post-audit organizations</strong> where the audit surfaced a gap they need closed quickly</li>
              <li><strong>Greenfield deployments</strong> where security gets built in from day 1 instead of bolted on after</li>
              <li><strong>Compliance-driven builds</strong> — EU AI Act, ISO/IEC 42001, customer security requirements that demand specific controls</li>
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
            <h2 className="h-section mt-6" style={{ color: "var(--color-ink)" }}>Scope a buildout.</h2>
            <p className="lead mt-6 mx-auto max-w-xl">
              Tell us what you need shipped. Fixed-fee proposal back within 48 hours.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="mailto:Lance@vectorbreak.com?subject=Custom%20build%20enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--color-ink)", color: "var(--color-textl)", borderRadius: 980 }}>
                Enquire about a build →
              </a>
              <Link href="/methodology/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium" style={{ color: "var(--color-gold)" }}>
                Read the methodology first →
              </Link>
            </div>
            <p className="mt-16 text-sm" style={{ color: "var(--color-mute2)" }}>
              See also:{" "}
              <Link href="/services/audit/" style={{ color: "var(--color-gold)" }}>Audit</Link>{" · "}
              <Link href="/services/training/" style={{ color: "var(--color-gold)" }}>Training</Link>{" · "}
              <Link href="/" style={{ color: "var(--color-gold)" }}>Home</Link>
            </p>
          </Reveal>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
