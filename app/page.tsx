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

export default function Home() {
  return (
    <>
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
