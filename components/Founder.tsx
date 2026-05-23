import { Reveal } from "@/components/Reveal";

export function Founder() {
  return (
    <section
      id="founder"
      className="py-32 lg:py-40"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-textl)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>
            THE EXPERT YOU&rsquo;RE HIRING
          </p>
          <h2 className="h-mega mt-8" style={{ color: "var(--color-textl)" }}>
            Vector Layer.
          </h2>
          <p className="h-sub mt-6" style={{ color: "var(--color-mute2)" }}>
            Founder · Vectorbreak Security · Maintainer · Five Surfaces
          </p>
        </Reveal>

        <div className="mt-20 max-w-3xl mx-auto space-y-7">
          <p
            style={{
              color: "#D2D2D7",
              fontSize: "1.18rem",
              lineHeight: 1.55,
            }}
          >
            Two decades in offensive security and infrastructure. Author of the
            Five Surfaces methodology and the open-source{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-gold-light)",
              }}
            >
              mcp-fuzzer
            </span>{" "}
            — 139 unit tests passing, CI across Ubuntu, macOS, and Windows.
            Thirty-four adversarial MCP tools across seven Surface-3 risk
            families.
          </p>
          <p style={{ color: "var(--color-mute2)", fontSize: "1.05rem" }}>
            The cross-family case studies — including the public FAILs on
            MiniMax-M2 and gpt-oss:120b — were authored solo. So is every
            engagement. Your code is not subcontracted to a junior analyst
            pool. There is no junior analyst pool.
          </p>
          <p style={{ color: "var(--color-mute2)", fontSize: "1.05rem" }}>
            Disclosure pipeline currently includes a Cursor cross-family
            disclosure and an Antigravity MCP env-block bug, both pending
            coordinated release through vendor channels.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:Lance@vectorbreak.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-textl)] hover:text-[var(--color-ink)]"
            style={{
              border: "1px solid var(--color-textl)",
              color: "var(--color-textl)",
              borderRadius: 980,
            }}
          >
            Lance@vectorbreak.com
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
            style={{ color: "var(--color-gold-light)" }}
          >
            Scope an engagement &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
