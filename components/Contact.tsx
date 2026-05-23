import { Reveal } from "@/components/Reveal";
import { WordCascade } from "@/components/WordCascade";
import { ContactForm } from "@/components/ContactForm";

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
        </Reveal>
        <h2 className="h-hero mt-10" style={{ color: "var(--color-textl)" }}>
          <WordCascade as="div" text="Two questions." />
          <WordCascade as="div" text="Forty-eight hours." delay={0.2} />
          <WordCascade
            as="div"
            text="One fixed-fee proposal."
            delay={0.4}
            style={{ color: "var(--color-mute2)" }}
          />
        </h2>

        <Reveal delay={0.7}>
          <div
            className="mt-20 mx-auto"
            style={{
              maxWidth: 760,
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--color-rule-dark)",
              padding: "2.5rem",
            }}
          >
            <ContactForm />
          </div>
        </Reveal>

        <p
          className="mt-12"
          style={{ color: "var(--color-mute2)", fontSize: "0.95rem" }}
        >
          Direct line to founder. No SDR layer. Response in 24 hours.
        </p>

        <p
          className="mt-3 text-xs"
          style={{ color: "var(--color-mute)" }}
        >
          Or{" "}
          <a
            href="#community"
            style={{ color: "var(--color-gold-light)" }}
          >
            join the practitioner Discord
          </a>{" "}
          if you&rsquo;re here to talk shop, not scope an engagement.
        </p>
      </div>
    </section>
  );
}
