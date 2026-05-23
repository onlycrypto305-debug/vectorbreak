# Contact form setup — Turnstile + Resend

The contact form posts to `/api/contact` (a CF Pages Function at `functions/api/contact.ts`) which validates a Cloudflare Turnstile token and sends the submission to Lance via Resend.

Until you complete the 3 steps below, the form will return a 4xx/5xx error and the UI will show the "Send failed — please email..." fallback. The `mailto:` link works as a hard fallback regardless.

## 1. Provision the Turnstile widget (~2 min)

1. Open https://dash.cloudflare.com/?to=/:account/turnstile
2. **Add site** → name "vectorbreak", hostname `vectorbreak.com`, widget mode **Managed**, pre-clearance **No**
3. Copy the **Site Key** (public, starts with `0x4AAA…`) → paste into `components/ContactForm.tsx` at the `TURNSTILE_SITEKEY` constant (replace `0x00000000000000000000AA`)
4. Copy the **Secret Key** (private, starts with `0x4AAA…`) → save for step 3

## 2. Set up Resend (~5 min)

1. Sign up at https://resend.com (free tier: 3 000 emails/month, 100/day)
2. **Domains** → **Add Domain** → enter `vectorbreak.com`
3. Resend gives you 3 DNS records (SPF/DKIM/return-path). Paste each into Cloudflare DNS:
   - **Type / Name / Value** as shown by Resend
   - **Proxy status: DNS-only** (orange cloud OFF — these are MTA records, not HTTP)
4. Click **Verify DNS Records** — wait until all 3 show green (usually <2 min)
5. **API Keys** → **Create API Key** → name "vectorbreak-pages", permission **Sending access** → vectorbreak.com → copy the key (starts with `re_…`) — save for step 3

## 3. Add env vars to CF Pages (~2 min)

1. https://dash.cloudflare.com/?to=/:account/pages/view/vectorbreak/settings/environment-variables
2. Add **Production** vars (NOT preview unless you want previews to send real email):
   | Variable | Value | Type |
   |---|---|---|
   | `TURNSTILE_SECRET_KEY` | `0x4AAA…` from step 1 | **Encrypted** |
   | `RESEND_API_KEY` | `re_…` from step 2 | **Encrypted** |
   | `CONTACT_EMAIL_FROM` | `Vectorbreak <noreply@vectorbreak.com>` | Plaintext |
   | `CONTACT_EMAIL_TO` | `Lance@vectorbreak.com` | Plaintext (optional — defaults to this anyway) |
3. **Save** (CF triggers a redeploy automatically if env vars change)

## 4. Smoke test

```bash
# Should return 400 "Missing Turnstile token." (proving the Function is wired)
curl -s https://vectorbreak.com/api/contact \
  -H 'content-type: application/json' \
  -d '{"name":"Test","email":"t@t.io","question_01":"a","question_02":"b"}'
```

Then submit the real form on the live site → check Lance@vectorbreak.com inbox + Resend dashboard → Emails for the send record.

## Why these choices

- **Turnstile** over reCAPTCHA: no Google JS, privacy-respecting, free, native to Cloudflare
- **Resend** over MailChannels: MailChannels stopped being free for CF Pages in 2024; Resend free tier covers anything short of viral contact-form abuse, and `replace this function with another provider` is one HTTP block in `functions/api/contact.ts` if you want to swap later (Postmark, AWS SES, etc.)
- **Honeypot kept**: `bot-field` filters dumb bots before Turnstile even fires; layered defense
- **No client retries**: better that the user sees the error and uses the `mailto:` fallback than silently double-send

## Rollback

If something breaks:
- Revert `components/ContactForm.tsx` from git (`git log --oneline components/ContactForm.tsx`)
- Delete `functions/api/contact.ts` so the route returns 404
- The form will then 404 on submit → user sees "Send failed" + `mailto:` fallback
