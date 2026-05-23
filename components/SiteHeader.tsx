"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#methodology", label: "Methodology" },
  { href: "#receipts", label: "Receipts" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#community", label: "Community" },
];

/**
 * Apple-thin sticky nav. Background and gold underline glow strengthen
 * once the user scrolls past the hero, cueing "you are in the content now".
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 80);
  });

  return (
    <motion.header
      className="sticky top-0 z-50 border-b"
      animate={{
        backgroundColor: scrolled
          ? "rgba(251, 251, 253, 0.92)"
          : "rgba(251, 251, 253, 0.62)",
        borderBottomColor: scrolled
          ? "rgba(184, 133, 46, 0.18)"
          : "rgba(210, 210, 215, 0.6)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(184, 133, 46, 0.18), 0 8px 32px -8px rgba(0, 0, 0, 0.08)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      style={{
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
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
    </motion.header>
  );
}
