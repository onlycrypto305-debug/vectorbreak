"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

/**
 * Netlify Forms intake. Static export friendly — Netlify's post-deploy crawler
 * picks up the `data-netlify="true"` attribute on the rendered HTML and starts
 * accepting submissions automatically. No backend, no API key.
 *
 * Submissions land in: Netlify dashboard → site → Forms → "vectorbreak-intake".
 * Set up email notification: Forms → Notifications → Add email → Lance@vectorbreak.com.
 */
export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    // Netlify expects URL-encoded body with form-name field
    const body = new URLSearchParams();
    for (const [k, v] of data.entries()) body.append(k, String(v));
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="text-left"
      >
        <p
          className="h-eyebrow"
          style={{ color: "var(--color-gold-light)" }}
        >
          RECEIVED
        </p>
        <p
          className="mt-4 h-sub"
          style={{ color: "var(--color-textl)" }}
        >
          Got it. Lance will reply within 24 hours with the fixed-fee proposal
          shape that fits your decision — or with the two follow-up questions
          needed to land it.
        </p>
        <p
          className="mt-3 text-sm"
          style={{ color: "var(--color-mute2)" }}
        >
          If you don&rsquo;t see a reply in 48 hours, check spam, then email{" "}
          <a
            href="mailto:Lance@vectorbreak.com"
            style={{ color: "var(--color-gold-light)" }}
          >
            Lance@vectorbreak.com
          </a>{" "}
          directly.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      name="vectorbreak-intake"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="text-left space-y-6"
    >
      {/* Required by Netlify for form recognition */}
      <input type="hidden" name="form-name" value="vectorbreak-intake" />
      {/* Honeypot — bots fill this in, real users don't see it */}
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field
          label="Name"
          name="name"
          placeholder="Legal name or consistent handle"
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          autoComplete="email"
        />
      </div>

      <Field
        label="What are you shipping, and which model(s) and which MCP servers does it touch?"
        labelEyebrow="QUESTION 01"
        name="question_01"
        textarea
        required
        placeholder="e.g. Multi-agent RAG over a 50M-row Postgres, Claude Sonnet 4.6 + internal MCP server, Vercel + Supabase"
      />

      <Field
        label="What decision is the audit driving — insurance renewal, EU AI Act conformity, acquirer diligence, customer questionnaire?"
        labelEyebrow="QUESTION 02"
        name="question_02"
        textarea
        required
        placeholder="e.g. Cyber-insurance renewal in Q3 — carrier asked for evidence of model-level red-teaming"
      />

      <div className="pt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-60"
          style={{
            background: "var(--color-gold-light)",
            color: "#000",
            borderRadius: 980,
          }}
        >
          {state === "submitting" ? "Sending…" : "Send to founder →"}
        </button>
        <a
          href="mailto:Lance@vectorbreak.com?subject=Vectorbreak%20Security%20engagement%20enquiry"
          className="text-sm font-medium"
          style={{ color: "var(--color-mute2)" }}
        >
          Or email Lance@vectorbreak.com directly
        </a>
      </div>

      {state === "error" && (
        <p
          className="text-sm"
          style={{ color: "#F87171" }}
        >
          Send failed — please email{" "}
          <a
            href="mailto:Lance@vectorbreak.com"
            style={{ color: "var(--color-gold-light)" }}
          >
            Lance@vectorbreak.com
          </a>{" "}
          directly so nothing is lost.
        </p>
      )}
    </form>
  );
}

interface FieldProps {
  label: string;
  labelEyebrow?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
}

function Field({
  label,
  labelEyebrow,
  name,
  type = "text",
  placeholder,
  required,
  autoComplete,
  textarea,
}: FieldProps) {
  const baseStyle = {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid var(--color-rule-dark)",
    color: "var(--color-textl)",
    padding: "0.85rem 1rem",
    fontFamily: "var(--font-sans)",
    fontSize: "0.95rem",
    width: "100%",
  } as const;

  return (
    <label className="block">
      {labelEyebrow && (
        <span
          className="h-eyebrow block"
          style={{ color: "var(--color-gold-light)" }}
        >
          {labelEyebrow}
        </span>
      )}
      <span
        className={labelEyebrow ? "mt-3 block" : "block"}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: labelEyebrow ? "1.1rem" : "0.85rem",
          fontWeight: labelEyebrow ? 400 : 500,
          letterSpacing: labelEyebrow ? "-0.015em" : "0",
          color: labelEyebrow ? "var(--color-textl)" : "var(--color-mute2)",
          marginBottom: "0.6rem",
        }}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={3}
          style={baseStyle}
          className="focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-y"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          style={baseStyle}
          className="focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      )}
    </label>
  );
}
