import { Hero } from "@/components/Hero";
import { SpecStats } from "@/components/SpecStats";
import { Methodology } from "@/components/Methodology";
import { Receipts } from "@/components/Receipts";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { Founder } from "@/components/Founder";
import { Community } from "@/components/Community";
import { Contact } from "@/components/Contact";
import { SectionDivider } from "@/components/SectionDivider";
import { SiteFooter } from "@/components/SiteFooter";
import faqpage from "@/lib/schemas/faqpage.json";

// Per Next.js 16 JSON-LD docs: raw <script> in JSX, XSS-escape via `<` -> <.
const homeFaqJson = JSON.stringify(faqpage).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      {/* Homepage-scoped FAQPage schema (10 business Q&As). Inner pages have their own FAQs. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homeFaqJson }}
      />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <SpecStats />
        <SectionDivider />
        <Methodology />
        <SectionDivider />
        <Receipts />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <Founder />
        <SectionDivider />
        <Community />
        <SectionDivider />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
