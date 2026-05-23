// Surgical merge into the EXISTING C:\Users\Think1\vectorbreak site final\app\layout.tsx.
// Preserves: Inter / Inter_Tight / JetBrains_Mono fonts, LenisProvider, ScrollProgress,
// SiteHeader, body classes. Adds: full metadata, JSON-LD schema injection.
//
// Next.js 16 conformance (per node_modules/next/dist/docs/01-app/02-guides/json-ld.md):
//   - Use raw <script type="application/ld+json"> (NOT next/script).
//   - Place scripts directly in the JSX body, NOT inside a <head> block.
//   - Escape `<` to < in the JSON payload to neutralise XSS via the schema source.
//
// To apply: REPLACE C:\Users\Think1\vectorbreak site final\app\layout.tsx with this file's
// content. Delete the .MERGED.tsx suffix on copy.
//
// Prereq: schemas/*.json files placed at C:\Users\Think1\vectorbreak site final\lib\schemas\
// (see PATCH-README.md for the schema-file location decision).

import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteHeader } from "@/components/SiteHeader";
import organization from "@/lib/schemas/organization.json";
import person from "@/lib/schemas/person.json";
import services from "@/lib/schemas/services.json";
import mcpScanner from "@/lib/schemas/mcp-scanner.json";
import website from "@/lib/schemas/website.json";
// NOTE: faqpage.json is intentionally NOT imported here — it ships only on the
// homepage (app/page.tsx) to avoid duplicate FAQPage schema on inner pages
// like /methodology/ and /services/*/ which have their own FAQ blocks.
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vectorbreak.com"),
  title: {
    template: "%s | Vectorbreak",
    default: "Vectorbreak — Red-team your AI agent before someone else does",
  },
  description:
    "Audits, training, and custom defensive engineering for agentic and RAG-enabled AI systems. Five Surfaces methodology. Fixed-fee, insurance-grade deliverables.",
  alternates: { canonical: "https://vectorbreak.com" },
  openGraph: {
    type: "website",
    url: "https://vectorbreak.com",
    siteName: "Vectorbreak",
    title: "Vectorbreak",
    description:
      "Audit · Train · Build · Community. Productized red-teaming for AI agents and RAG systems using the Five Surfaces methodology.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vectorbreak — Five Surfaces methodology" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@VectorbreakSec",
    creator: "@VectorbreakSec",
    title: "Vectorbreak",
    description: "Red-team your AI agent. Five Surfaces methodology. Fixed-fee. Insurance-grade deliverables.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  icons: { icon: "/favicon.ico" },
  keywords: [
    "AI security", "MCP security", "AI red team", "prompt injection", "AI audit",
    "LLM security", "RAG security", "Five Surfaces", "AI agent security", "MCP penetration testing",
  ],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const schemas = [organization, person, services, mcpScanner, website];

// Per Next.js 16 docs: native <script> in JSX body, escape `<` to neutralise XSS.
function stringifyLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: stringifyLd(schema) }}
          />
        ))}
        <LenisProvider>
          <ScrollProgress />
          <SiteHeader />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
