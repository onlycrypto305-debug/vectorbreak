import Link from "next/link";

const NAV_LINKS = [
  { href: "#methodology", label: "Methodology" },
  { href: "#receipts", label: "Receipts" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#community", label: "Community" },
];

/**
 * Apple-thin sticky nav. Backdrop blur over translucent paper background.
 * Logo on left, section links center (desktop only), Scope CTA on right.
 */
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        background: "rgba(251, 251, 253, 0.72)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-12 flex items-center justify-between">
        <Link href="#top" className="flex items-center gap-2.5">
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
            className="font-medium text-sm tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vectorbreak
            <span style={{ color: "var(--color-mute2)" }}> Security</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-normal opacity-[0.88] hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-ink)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="text-sm font-medium opacity-[0.88] hover:opacity-100 transition-opacity"
          style={{ color: "var(--color-gold)" }}
        >
          Scope engagement &rarr;
        </a>
      </div>
    </header>
  );
}
