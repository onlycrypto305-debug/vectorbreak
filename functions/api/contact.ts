// CF Pages Function: POST /api/contact
// - Validates Cloudflare Turnstile token
// - Honeypot check (bots fill `bot-field`)
// - Sends notification to CONTACT_EMAIL_TO via Resend
// - Returns JSON { ok: true } on success
//
// Required env vars (set in CF Pages dashboard → Settings → Environment variables):
//   TURNSTILE_SECRET_KEY  — secret key from CF Turnstile widget config
//   RESEND_API_KEY        — Resend API key (https://resend.com/api-keys)
//   CONTACT_EMAIL_FROM    — verified sender, e.g. "Vectorbreak <noreply@vectorbreak.com>"
//   CONTACT_EMAIL_TO      — recipient, default "Lance@vectorbreak.com"

interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_EMAIL_FROM: string;
  CONTACT_EMAIL_TO?: string;
}

interface Submission {
  name: string;
  email: string;
  question_01: string;
  question_02: string;
  "bot-field"?: string;
  "cf-turnstile-response"?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Partial<Submission>;
  const ct = request.headers.get("content-type") ?? "";

  try {
    if (ct.includes("application/json")) {
      payload = (await request.json()) as Partial<Submission>;
    } else {
      const fd = await request.formData();
      payload = Object.fromEntries(fd.entries()) as Partial<Submission>;
    }
  } catch {
    return json({ ok: false, error: "Could not parse request body." }, 400);
  }

  // Honeypot
  if (payload["bot-field"]) return json({ ok: true });

  // Required fields
  for (const k of ["name", "email", "question_01", "question_02"] as const) {
    if (!payload[k] || String(payload[k]).trim().length === 0) {
      return json({ ok: false, error: `Missing ${k}.` }, 400);
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(String(payload.email))) {
    return json({ ok: false, error: "Invalid email." }, 400);
  }

  // Turnstile verify
  const tsToken = payload["cf-turnstile-response"];
  if (!tsToken) return json({ ok: false, error: "Missing Turnstile token." }, 400);

  const tsForm = new FormData();
  tsForm.append("secret", env.TURNSTILE_SECRET_KEY);
  tsForm.append("response", String(tsToken));
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) tsForm.append("remoteip", remoteIp);

  const tsRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: tsForm },
  );
  const tsData = (await tsRes.json()) as { success?: boolean };
  if (!tsData.success) {
    return json({ ok: false, error: "Turnstile validation failed." }, 403);
  }

  // Compose + send via Resend
  const to = env.CONTACT_EMAIL_TO ?? "Lance@vectorbreak.com";
  const subject = `Vectorbreak intake — ${String(payload.name).slice(0, 80)}`;
  const bodyText = [
    `From: ${payload.name} <${payload.email}>`,
    `IP:   ${remoteIp ?? "unknown"}`,
    `UA:   ${request.headers.get("user-agent") ?? "unknown"}`,
    "",
    "Q1 — What are you shipping, and which model(s) and which MCP servers does it touch?",
    String(payload.question_01),
    "",
    "Q2 — What decision is the audit driving?",
    String(payload.question_02),
  ].join("\n");

  const mailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_EMAIL_FROM,
      to,
      reply_to: String(payload.email),
      subject,
      text: bodyText,
    }),
  });

  if (!mailRes.ok) {
    const errText = await mailRes.text().catch(() => "");
    console.error("Resend send failed:", mailRes.status, errText);
    return json({ ok: false, error: "Mail delivery failed." }, 502);
  }

  return json({ ok: true });
};

// CORS preflight (harmless even if same-origin)
export const onRequestOptions: PagesFunction = () =>
  new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "https://vectorbreak.com",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
