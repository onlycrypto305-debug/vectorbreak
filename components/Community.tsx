import { Reveal } from "@/components/Reveal";

const SPECS = [
  { value: "Free", label: "Practitioner tier" },
  { value: "Vetted", label: "Application required" },
  { value: "Weekly", label: "Threat-class drops" },
];

const DISCORD_MAILTO =
  "mailto:Lance@vectorbreak.com?subject=Discord%20invite%20request&body=Hi%20Lance%2C%0A%0AI%27d%20like%20to%20apply%20for%20the%20Vectorbreak%20Discord%20community.%0A%0AMy%20background%3A%20%5Bbrief%20role%20%2B%20company%5D%0AWhat%20I%27d%20bring%3A%20%5Boptional%5D%0A%0AThanks.";

export function Community() {
  return (
    <section
      id="community"
      className="py-32 lg:py-40"
      style={{
        background: "var(--color-paper)",
        scrollMarginTop: "4rem",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="h-eyebrow">COMMUNITY · DISCORD</p>
          <h2 className="h-mega mt-8" style={{ color: "var(--color-ink)" }}>
            Practitioners only.
            <br />
            <span style={{ color: "var(--color-mute2)" }}>
              Application required.
            </span>
          </h2>
          <p className="lead mt-10 mx-auto max-w-2xl">
            A vetted private community of AI red-teamers, AppSec engineers,
            ML-platform people, and compliance leads. Weekly threat-class
            write-ups, live PoC reviews, monthly threat-intel briefing. No
            vendors, no recruiters, no AI-twitter noise.
          </p>
        </Reveal>

        <div
          className="mt-20 max-w-3xl mx-auto grid grid-cols-3 gap-px border"
          style={{
            background: "var(--color-rule)",
            borderColor: "var(--color-rule)",
          }}
        >
          {SPECS.map((s) => (
            <div
              key={s.label}
              className="bg-white p-8 text-center"
              style={{ background: "#FFFFFF" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                  fontSize: "2.75rem",
                  color: "var(--color-ink)",
                }}
              >
                {s.value}
              </div>
              <p
                className="mt-2"
                style={{
                  color: "var(--color-mute2)",
                  fontSize: "1.05rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <a
            href={DISCORD_MAILTO}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-gold-hover)]"
            style={{
              background: "var(--color-gold)",
              borderRadius: 980,
            }}
          >
            Request Discord invite
          </a>
          <a
            href="mailto:Lance@vectorbreak.com?subject=Community%20enquiry"
            className="inline-flex items-center gap-1 hover:gap-2 transition-all text-sm font-medium"
            style={{ color: "var(--color-gold)" }}
          >
            Ask about community &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
