import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-32 lg:py-44"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-textl)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <Reveal>
          <p className="h-eyebrow" style={{ color: "var(--color-mute2)" }}>
            SCOPE AN ENGAGEMENT
          </p>
          <h2 className="h-hero mt-10" style={{ color: "var(--color-textl)" }}>
            Two questions.
            <br />
            Forty-eight&nbsp;hours.
            <br />
            <span style={{ color: "var(--color-mute2)" }}>
              One fixed-fee&nbsp;proposal.
            </span>
          </h2>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 gap-12 text-left">
          <div>
            <p
              className="h-eyebrow"
              style={{ color: "var(--color-gold-light)" }}
            >
              QUESTION 01
            </p>
            <p
              className="mt-4 h-sub"
              style={{ color: "var(--color-textl)" }}
            >
              What are you shipping, and which model(s) and which MCP servers
              does it touch?
            </p>
          </div>
          <div>
            <p
              className="h-eyebrow"
              style={{ color: "var(--color-gold-light)" }}
            >
              QUESTION 02
            </p>
            <p
              className="mt-4 h-sub"
              style={{ color: "var(--color-textl)" }}
            >
              What decision is the audit driving — insurance renewal, EU AI Act
              conformity, acquirer diligence, customer questionnaire?
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:Lance@vectorbreak.com?subject=Vectorbreak%20Security%20engagement%20enquiry"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
            style={{
              background: "var(--color-gold-light)",
              color: "#000",
              borderRadius: 980,
            }}
          >
            Lance@vectorbreak.com
          </a>
          <a
            href="#community"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-textl)] hover:text-[var(--color-ink)]"
            style={{
              border: "1px solid var(--color-textl)",
              color: "var(--color-textl)",
              borderRadius: 980,
            }}
          >
            Or join Discord
          </a>
        </div>

        <p
          className="mt-16"
          style={{ color: "var(--color-mute2)", fontSize: "0.95rem" }}
        >
          Direct line to founder. No SDR layer. No qualifier form. Response in
          24 hours.
        </p>
      </div>
    </section>
  );
}
