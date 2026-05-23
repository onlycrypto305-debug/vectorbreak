import { FiveSurfacesDiagram } from "@/components/FiveSurfacesDiagram";
import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";

const SURFACES = [
  {
    n: "01",
    title: "INPUT / OUTPUT",
    desc: "Direct prompts, structured outputs, jailbreaks, sanitization gaps.",
    count: "13 classes",
  },
  {
    n: "02",
    title: "RETRIEVAL",
    desc: "RAG corpora, indexers, indirect injection, knowledge-base poisoning.",
    count: "11 classes",
  },
  {
    n: "03",
    title: "TOOL-CALL / MCP",
    desc: "Function calling, MCP servers, tool poisoning, privilege escalation.",
    count: "20 classes · most-exploited",
  },
  {
    n: "04",
    title: "MODEL",
    desc: "Weights, adapter chains, system prompts, training-data extraction.",
    count: "11 classes",
  },
  {
    n: "05",
    title: "RUNTIME",
    desc: "Sandbox escape, prompt-to-RCE, agent loops, memory persistence.",
    count: "14 classes",
  },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="py-32 lg:py-40 text-center"
      style={{
        background: "var(--color-paper)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="h-eyebrow">METHODOLOGY · FIVE SURFACES v0.1</p>
        </Reveal>
        <h2 className="h-mega mt-8" style={{ color: "var(--color-ink)" }}>
          <WordCascade as="div" text="Five surfaces." />
          <WordCascade
            as="div"
            text="Five places production incidents live."
            delay={0.25}
            style={{ color: "var(--color-mute2)" }}
          />
        </h2>
        <Reveal delay={0.7}>
          <p className="lead mt-10 mx-auto max-w-2xl">
            LLM application security used to be one surface: a chatbot&rsquo;s
            input box. In 2026 it&rsquo;s five — and four of them are where the
            production incidents live. OWASP-ASI + MITRE-ATLAS + OWASP-LLM-Top-10
            mapped. MIT-licensed.
          </p>
        </Reveal>

        <div className="mt-20 lg:mt-24">
          <FiveSurfacesDiagram />
        </div>

        <div className="mt-20 lg:mt-24 max-w-3xl mx-auto text-left">
          <ul
            className="divide-y"
            style={{ borderColor: "var(--color-rule)" }}
          >
            {SURFACES.map((s, i) => (
              <li
                key={s.n}
                className="py-5 flex items-center justify-between gap-4"
                style={{
                  borderTop: i === 0 ? "1px solid var(--color-rule)" : undefined,
                  borderBottom:
                    i === SURFACES.length - 1
                      ? "1px solid var(--color-rule)"
                      : "1px solid var(--color-rule)",
                }}
              >
                <div>
                  <p
                    className="h-eyebrow"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {s.n} {s.title}
                  </p>
                  <p
                    className="mt-1"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {s.desc}
                  </p>
                </div>
                <span
                  className="text-sm shrink-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-mute)",
                  }}
                >
                  {s.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <a
            href="mailto:Lance@vectorbreak.com?subject=Five%20Surfaces%20methodology%20request"
            className="inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
            style={{ color: "var(--color-gold)" }}
          >
            Request the full paper &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
