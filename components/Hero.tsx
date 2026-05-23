"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "@/components/HeroBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const wordStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const PUNCH = "someone else does.".split(" ");

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen flex items-center justify-center bg-bg text-textl"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <HeroBackground />

      {/* Dark overlay to keep text legible over the shader */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-28 text-center w-full">
        <motion.p
          className="h-eyebrow"
          style={{ color: "var(--color-mute2)" }}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          VECTORBREAK SECURITY · EST. 2026
        </motion.p>

        <h1
          className="h-hero mt-10"
          style={{ color: "var(--color-textl)" }}
        >
          <motion.span
            className="block"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay: 0.05 }}
          >
            Red-team your
          </motion.span>
          <motion.span
            className="block"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay: 0.18 }}
          >
            AI agent before
          </motion.span>
          <motion.span
            className="block"
            style={{ color: "var(--color-gold-light)" }}
            initial="hidden"
            animate="show"
            variants={wordStagger}
            aria-label="someone else does."
          >
            {PUNCH.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
                className="inline-block mr-[0.25em] last:mr-0"
                aria-hidden="true"
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          className="lead mt-10 mx-auto max-w-2xl"
          style={{ color: "#A1A1A6" }}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.8 }}
        >
          Productized red-teaming, defensive engineering, and training for
          agentic and RAG-enabled AI systems. The artifact your cyber-insurance
          carrier, EU AI Act conformity assessor, and acquirer&rsquo;s diligence
          team are now asking for.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 1.0 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-gold-hover)]"
            style={{
              backgroundColor: "var(--color-gold)",
              borderRadius: "980px",
            }}
          >
            Scope an engagement
          </a>
          <a
            href="#methodology"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all"
            style={{ color: "var(--color-gold-light)" }}
          >
            Read the methodology &rarr;
          </a>
        </motion.div>

        <motion.div
          className="mt-24 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          aria-hidden="true"
        >
          <ScrollCue />
        </motion.div>
      </div>
    </section>
  );
}

function ScrollCue() {
  return (
    <div
      className="inline-flex justify-center pt-1.5"
      style={{
        width: 24,
        height: 38,
        border: "1.5px solid var(--color-mute2)",
        borderRadius: 14,
      }}
    >
      <span
        className="block"
        style={{
          width: 2,
          height: 7,
          background: "var(--color-mute2)",
          animation: "scroll-dot 1.6s cubic-bezier(.4,0,.2,1) infinite",
        }}
      />
      <style>{`
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
