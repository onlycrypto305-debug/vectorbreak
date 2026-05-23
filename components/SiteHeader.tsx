"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

// Hrefs use the `/#section` form (NOT bare `#section`) so they work on inner
// pages too — on / they scroll in place, on inner pages they navigate home
// then the browser handles the hash scroll natively.
const NAV_LINKS = [
  { href: "/#methodology", label: "Methodology" },
  { href: "/#receipts", label: "Receipts" },
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#community", label: "Community" },
];

/**
 * Apple-thin sticky nav. Background and gold underline glow strengthen
 * once the user scrolls past the hero. Hamburger drawer < md.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 80);
  });

  // Close drawer on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
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
          <Link href="/" className="flex items-center gap-2.5">
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
            </span>
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop scope CTA */}
          <a
            href="/#contact"
            className="hidden md:inline text-sm font-medium opacity-[0.88] hover:opacity-100 transition-opacity"
            style={{ color: "var(--color-gold)" }}
          >
            Scope engagement &rarr;
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 -mr-1"
          >
            <motion.span
              className="block w-5 h-[1.5px]"
              style={{ background: "var(--color-ink)" }}
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 3.5 : 0,
              }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            />
            <motion.span
              className="block w-5 h-[1.5px]"
              style={{ background: "var(--color-ink)" }}
              animate={{
                rotate: open ? -45 : 0,
                y: open ? -3.5 : 0,
              }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-drawer"
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0, 0, 0, 0.55)" }}
              aria-hidden="true"
            />
            {/* Panel */}
            <motion.nav
              key="drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 h-full w-[78%] max-w-[320px] flex flex-col"
              style={{
                background: "var(--color-paper)",
                paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)",
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)",
              }}
              aria-label="Mobile navigation"
            >
              <ul className="flex-1 px-8 space-y-7">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-2xl tracking-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-8 pt-6 border-t" style={{ borderColor: "var(--color-rule)" }}>
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white"
                  style={{
                    background: "var(--color-gold)",
                    borderRadius: 980,
                  }}
                >
                  Scope engagement &rarr;
                </a>
                <p
                  className="mt-4 text-xs"
                  style={{ color: "var(--color-mute2)" }}
                >
                  Lance@vectorbreak.com
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
