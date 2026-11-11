import Hero from "@/components/Hero";
import Form from "@/components/Form";
import Reviews from "@/components/Reviews";
import HowItworks from "@/components/HowItworks";
import MeetOwner from "@/components/MeetOwner";
import WorkGallery from "@/components/WorkGallery";
import FaqSection from "@/components/Faq-Section";
import CTA from "@/components/CTA";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/SiteConfig";

export const metadata = pageMetadata(
  siteConfig.seo.defaultTitle,
  siteConfig.seo.description,
);
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Form />
      <Reviews />
      <HowItworks />
      <WorkGallery />
      <MeetOwner />
      <FaqSection />
      <CTA />
    </>
  );
}
