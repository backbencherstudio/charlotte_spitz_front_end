import FAQAccordion from "@/components/Home/FAQAccordion";
import HeroSection from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWork";
import PricingSection from "@/components/Home/PricingSection";
import TestimonialsSlider from "@/components/Home/TestimonialsSlider";


export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TestimonialsSlider />
      <PricingSection />
      <FAQAccordion />
    </>
  );
}
