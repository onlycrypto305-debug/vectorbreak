import { Reveal } from "@/components/Reveal";

interface Sku {
  name: string;
  scope: string;
  duration: string;
  price: string;
}

const SKUS: Sku[] = [
  {
    name: "Pulse",
    scope:
      "Public 10-probe Surface-3 battery against your MCP server(s). 1-page red/yellow/green + 30-min readout.",
    duration: "1 day",
    price: "$4,500",
  },
  {
    name: "MCP Triage",
    scope:
      "Surface 3 only — full fuzzer run + manual creative testing + findings memo.",
    duration: "1 week",
    price: "$12,500",
  },
  {
    name: "Pilot",
    scope:
      "Single in-scope surface, single product. Full deliverable shape, narrower target.",
    duration: "2 weeks",
    price: "$28,500",
  },
  {
    name: "Standard",
    scope:
      "One product, ≤3 MCP servers, ≤2 retrieval pipelines, all five surfaces in scope.",
    duration: "4 weeks",
    price: "$48,500",
  },
  {
    name: "Multi-Agent",
    scope:
      "Standard + multi-agent orchestration (LangGraph / AutoGen / CrewAI), 4–6 MCP servers, sub-agent trust analysis.",
    duration: "4 weeks",
    price: "$78,500",
  },
  {
    name: "Compliance-Anchored",
    scope:
      "Standard + EU AI Act Article 15/16/26 conformity mapping + ISO/IEC 42001 Annex A + insurance-attestation pack.",
    duration: "5 weeks",
    price: "$125,000",
  },
  {
    name: "Annual Program",
    scope:
      "Quarterly assessments + monthly threat-intel briefing + 24-hr emergency-triage SLA + annual board readout.",
    duration: "12 months",
    price: "$185K – $285K",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-32 lg:py-40"
      style={{
        background: "var(--color-paper2)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="h-eyebrow">PRICING · FIXED FEE</p>
          <h2 className="h-mega mt-8" style={{ color: "var(--color-ink)" }}>
            A ladder, not a tier.
            <br />
            <span style={{ color: "var(--color-mute2)" }}>
              Pick the shape that fits the decision.
            </span>
          </h2>
          <p className="lead mt-10 mx-auto max-w-2xl">
            Fixed-fee at every level. No hourly creep. No &ldquo;as-needed&rdquo;
            travel costs. PoCs and infrastructure on me. 60% on signature, 30%
            at delivery, 10% on retest sign-off.
          </p>
        </Reveal>

        <div className="mt-20 max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <PriceTh width="18%">SKU</PriceTh>
                <PriceTh width="48%">Scope</PriceTh>
                <PriceTh width="14%">Duration</PriceTh>
                <PriceTh width="20%" align="right">
                  From
                </PriceTh>
              </tr>
            </thead>
            <tbody>
              {SKUS.map((s) => (
                <SkuRow key={s.name} sku={s} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-mute)]"
            style={{
              background: "var(--color-ink)",
              color: "var(--color-textl)",
              borderRadius: 980,
            }}
          >
            Get a fixed-fee proposal
          </a>
        </div>
      </div>
    </section>
  );
}

function PriceTh({
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
      className="py-5 px-4 text-xs font-medium uppercase tracking-wider"
      style={{
        width,
        textAlign: align ?? "left",
        color: "var(--color-mute)",
        borderBottom: "1px solid var(--color-ink)",
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </th>
  );
}

function SkuRow({ sku }: { sku: Sku }) {
  return (
    <tr
      className="transition-colors hover:bg-[var(--color-paper)]"
      style={{ borderBottom: "1px solid var(--color-rule)" }}
    >
      <td className="py-6 px-4 align-top">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.15rem",
            color: "var(--color-ink)",
            letterSpacing: "-0.015em",
          }}
        >
          {sku.name}
        </span>
      </td>
      <td
        className="py-6 px-4 align-top text-sm"
        style={{ color: "var(--color-mute)", lineHeight: 1.5 }}
      >
        {sku.scope}
      </td>
      <td
        className="py-6 px-4 align-top text-sm"
        style={{ color: "var(--color-mute2)" }}
      >
        {sku.duration}
      </td>
      <td className="py-6 px-4 align-top text-right">
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "1.1rem",
            color: "var(--color-ink)",
            letterSpacing: "-0.01em",
            fontFeatureSettings: '"tnum"',
          }}
        >
          {sku.price}
        </span>
      </td>
    </tr>
  );
}
