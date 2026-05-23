const FOOTER_COLS = [
  {
    title: "Services",
    links: [
      { href: "#pricing", label: "Audit" },
      { href: "#services", label: "Training" },
      { href: "#services", label: "Custom builds" },
      { href: "#community", label: "Community" },
    ],
  },
  {
    title: "Methodology",
    links: [
      { href: "#methodology", label: "Five Surfaces" },
      { href: "#receipts", label: "Case studies" },
      {
        href: "mailto:Lance@vectorbreak.com?subject=Five%20Surfaces%20methodology%20request",
        label: "Request paper",
      },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "mailto:Lance@vectorbreak.com", label: "Lance@vectorbreak.com" },
      { href: "#contact", label: "Scope engagement" },
      { href: "#founder", label: "About" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      className="border-t"
      style={{
        background: "var(--color-paper2)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 22 22" aria-hidden="true">
                <path
                  d="M3 3 L11 19 L19 3"
                  stroke="#1D1D1F"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M3 19 L11 3 L19 19"
                  stroke="#B8852E"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="11" cy="11" r="1.4" fill="#B8852E" />
              </svg>
              <span
                className="font-semibold text-base"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Vectorbreak
                <span
                  className="font-normal"
                  style={{ color: "var(--color-mute2)" }}
                >
                  {" "}
                  Security
                </span>
              </span>
            </div>
            <p
              className="mt-5 text-sm max-w-md"
              style={{
                color: "var(--color-mute)",
                lineHeight: 1.65,
              }}
            >
              Audits, training, custom defensive engineering, and a private
              practitioner community for agentic and RAG-enabled AI systems.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-ink)" }}
              >
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-[var(--color-ink)]"
                      style={{ color: "var(--color-mute)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-6 border-t flex flex-wrap justify-between items-center gap-4 text-xs"
          style={{
            borderColor: "var(--color-rule)",
            color: "var(--color-mute)",
          }}
        >
          <p>Copyright © 2026 Vectorbreak Security LLC. All rights reserved.</p>
          <p>vectorbreak.com</p>
        </div>
      </div>
    </footer>
  );
}
