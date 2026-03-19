import Faq from "@/components/Faq";
import FounderSection from "@/components/FounderSection";
import HeroModern from "@/components/HeroModern";
import ServicesModern from "@/components/ServicesModern";
import WorkSection from "@/components/WorkSection";
import TestimonialSection from "@/components/Testimonial2";

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <HeroModern />
      <ServicesModern />
      <WorkSection />
      <TestimonialSection />
      <FounderSection />
      <Faq />
    </main>
  );
}
