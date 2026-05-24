@AGENTS.md

# Vectorbreak — marketing site

Static marketing site for an AI red-team / security-audit firm. Single-author
codebase (Lance). Deployed as a static export to Cloudflare Pages (primary) or
Netlify (fallback drag-drop). The only dynamic piece is the contact form, which
runs as a Cloudflare Pages Function.

## Stack

- **Next.js 16.2.6** with the App Router, **React 19.2**, **TypeScript 5** (strict).
  Output is `output: "export"` → pure HTML/CSS/JS in `out/`. There is no Node
  runtime in production. `next/image`'s optimizer is disabled accordingly.
- **Tailwind v4** (PostCSS-only setup via `@tailwindcss/postcss`). Design tokens
  live in `@theme inline {…}` inside `app/globals.css`, not in a JS config file.
- **Framer Motion** for reveals/scroll-tied animations. **Lenis** for smooth
  scroll (mounted once in `LenisProvider`). **GSAP** is installed but currently
  unused — Framer Motion is the default; reach for GSAP only for things Motion
  can't do.
- **Three.js (vanilla)** for the hero particle field and the Five Surfaces
  diagram. Both use the shared `lib/three/createScene.ts` factory (handles
  renderer/camera/resize/dispose) — do not roll a new WebGLRenderer setup.
- **Cloudflare Pages Functions** for `POST /api/contact` (Turnstile + Resend).
  Code lives in `functions/api/contact.ts` and is **excluded from `tsconfig`**
  on purpose — it runs in CF's Workers runtime, not under Next.

> **Next.js 16 is not the Next.js in your training data.** Heed the warning in
> `AGENTS.md`: read the relevant guide under `node_modules/next/dist/docs/`
> before writing or changing route/layout/metadata/JSON-LD code. Deprecation
> notices apply. (`node_modules/` is not committed — run `npm install` first.)

## Commands

```bash
npm install       # one-time
npm run dev       # next dev — http://localhost:3000
npm run build     # next build — emits the static site to out/
npm run start     # next start — only useful pre-export; prod is pure static
npm run lint      # eslint (flat config: eslint.config.mjs)
```

There are no tests. There is no typecheck script — rely on `next build` and
`eslint` to surface errors. `tsc --noEmit` works too (config has `noEmit: true`).

## Layout

```
app/                      App Router pages. All pre-rendered at build time.
  layout.tsx              Root: fonts, metadata, Lenis, header, JSON-LD <script> blocks.
  page.tsx                Homepage (Hero → ... → Contact → Footer).
  methodology/page.tsx    /methodology/ — long-form AEO page + FAQPage schema.
  services/{audit,training,build}/page.tsx
  case-studies/page.tsx           Hub.
  case-studies/[slug]/page.tsx    One page per CaseStudy in lib/cases.ts.
  globals.css             Tailwind v4 import + design tokens + type scale.

components/               All client components ("use client"). One per file.
                          Heavy ones: Hero, HeroBackground, FiveSurfacesDiagram,
                          Receipts, ContactForm, SiteHeader, SiteFooter.

lib/
  cases.ts                Single source of truth for case studies (drives hub,
                          [slug] pages, and is mirrored in Receipts.tsx).
  schemas/*.json          JSON-LD payloads injected into <head> via raw <script>.
  three/createScene.ts    Three.js renderer/camera/resize/dispose factory.

functions/api/contact.ts  CF Pages Function — POST /api/contact (Turnstile+Resend).
                          NOT bundled by Next; excluded from tsconfig.

public/
  _headers, _redirects    Cloudflare Pages config (NOT Netlify syntax for _redirects).
  netlify.toml            Netlify fallback. No [build] block — see file comment.
  sitemap.xml, robots.txt, llms.txt, llms-full.txt
  .well-known/security.txt
  og-image.png, *.svg, favicon.ico

docs/CONTACT-FORM-SETUP.md  Turnstile + Resend provisioning steps.
```

Path alias: `@/*` resolves from repo root (e.g. `@/components/Hero`,
`@/lib/cases`). Configured in `tsconfig.json`.

## Conventions

- **Client vs server components.** Pages under `app/` are server components by
  default — they own `export const metadata`, JSON-LD `<script>` blocks, and
  `generateStaticParams` for dynamic routes. Anything interactive (animation,
  state, effects, refs) lives in `components/` with `"use client"` at the top.
  Do not add `"use client"` to a page just to import a client component — it
  works the other way around already.
- **Static export contract.** `next.config.ts` sets `output: "export"` and
  `trailingSlash: true`. No `dynamic = "force-dynamic"`, no Server Actions, no
  Route Handlers, no `next/image` optimizer, no middleware — all of these break
  the export. Use plain `<img>` (or `next/image` with `unoptimized`) and the CF
  Pages Function for dynamic POSTs.
- **Trailing slashes everywhere.** All internal URLs end with `/`
  (`/services/audit/`, `/case-studies/`, etc.). Match this in new routes,
  sitemap entries, JSON-LD `url`/`@id` fields, and canonical links.
- **JSON-LD.** Per Next 16's json-ld guide: raw `<script type="application/ld+json">`
  in the JSX body (not `<head>`, not `next/script`), with `<` escaped to
  `<` to neutralise XSS. Use the `stringifyLd()` helper pattern already in
  `app/layout.tsx` / `app/page.tsx`. Site-wide schemas live in the root layout;
  page-specific schemas (FAQPage, Service, Article, BreadcrumbList, ItemList)
  live in the individual page file. **FAQPage is homepage-only** — do not
  re-import `lib/schemas/faqpage.json` from the root layout.
- **Internal links use the `/#section` form.** Hrefs like `/#methodology`
  scroll-in-place on `/` and navigate-then-hash from inner pages. Avoid bare
  `#section` in shared nav/footer.
- **Design tokens.** Read from CSS custom properties
  (`var(--color-gold)`, `var(--font-display)`, etc.) defined in
  `app/globals.css`. Tailwind v4 picks them up via `@theme inline`. Do not add
  a `tailwind.config.{js,ts}`.
- **Type scale.** Use the prebuilt classes — `.h-hero`, `.h-mega`, `.h-section`,
  `.h-sub`, `.h-eyebrow`, `.lead` — rather than recomposing font/size/weight
  from scratch.
- **Motion language.** New scroll-in animations should use the existing
  `<Reveal>` (fade-up) or `<WordCascade>` (per-word stagger) wrappers. Bespoke
  Motion variants are fine in heroes/diagrams; match the easing curve
  `[0.32, 0.72, 0, 1]` and ~0.7-0.9s duration for visual coherence.
- **Reduced motion.** Every animation entry point checks
  `prefers-reduced-motion: reduce` and bails (see `LenisProvider`,
  `HeroBackground`, `MagneticPill`). Keep this discipline on anything new.
- **Three.js cleanup.** Always go through `createScene()` and call
  `handle.dispose()` in the `useEffect` cleanup. Dispose any `EffectComposer`
  resources too (see `FiveSurfacesDiagram` for the pattern).
- **Comments.** Existing files lean on short header comments that explain
  *why* a non-obvious decision was made (Next 16 conformance, CSP, deploy
  gotchas). Keep that voice when you have to leave one; otherwise write none.

## Content data

- **Case studies** are defined in `lib/cases.ts` (`CASES` array). Both the
  `/case-studies/` hub, `[slug]` detail pages, and the homepage `Receipts`
  table read from this. When adding or editing a case, also:
  1. Update `components/Receipts.tsx` (it has its own display-ordered copy of
     the row data — kept separate for explicit FAIL-first ordering).
  2. Add a `<url>` entry to `public/sitemap.xml`.
- **JSON-LD schemas** in `lib/schemas/*.json` are imported as data, not generated.
  Bump `dateModified` / `lastmod` when content materially changes.

## Deployment

Primary target is **Cloudflare Pages**:
- Build command: `npm run build`. Publish directory: `out/`.
- `functions/api/contact.ts` is auto-deployed as a Pages Function at
  `/api/contact` (CF picks up the `functions/` directory).
- `public/_headers` and `public/_redirects` use **Cloudflare's** syntax (not
  Netlify's) — they ship to `out/_headers` and `out/_redirects` during export.
- Required env vars (set in CF Pages dashboard, not in code):
  `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`,
  `CONTACT_EMAIL_TO` (optional). See `docs/CONTACT-FORM-SETUP.md`.
- The Turnstile **site key** is public and embedded in `components/ContactForm.tsx`
  at `TURNSTILE_SITEKEY`. The **secret key** is server-side only.

Fallback target is **Netlify drag-drop**:
- `public/netlify.toml` rides along into `out/` and provides headers/cache rules.
- It deliberately has no `[build]` block — the dropped folder *is* the build
  output. Do not add one.
- The contact form does **not** work on Netlify without porting the Pages
  Function; the UI falls back to a `mailto:` link.

## Security baseline

- CSP, HSTS, `X-Frame-Options: DENY`, `Permissions-Policy`, COOP, CORP are set
  in `public/_headers` (CF) and `public/netlify.toml` (Netlify). The two sets
  differ slightly — keep them in sync when you change either.
- The Turnstile widget needs `https://challenges.cloudflare.com` in the CF
  `script-src`, `frame-src`, and `connect-src` directives. It is **not** in
  the Netlify CSP because the form Function does not exist there.
- `dangerouslySetInnerHTML` is used exclusively for JSON-LD payloads, and the
  `stringifyLd()` helper escapes `<` to `<`. Don't introduce new
  `dangerouslySetInnerHTML` call sites without the same treatment.

## When in doubt

- Read the relevant file under `node_modules/next/dist/docs/` for any Next 16
  feature (metadata, JSON-LD, fonts, static export, dynamic routes,
  `generateStaticParams`).
- For the contact-form pipeline, `docs/CONTACT-FORM-SETUP.md` is the operator
  runbook.
- For new pages, copy the shape of an existing one (`app/services/audit/page.tsx`
  is a good template — metadata + page-scoped Service/FAQPage/BreadcrumbList
  JSON-LD + content sections + footer).
