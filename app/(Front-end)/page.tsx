import FAQAccordion from "@/components/Home/FAQAccordion";
import HowItWorks from "@/components/Home/HowItWork";
import PricingSection from "@/components/Home/PricingSection";
import TestimonialsSlider from "@/components/Home/TestimonialsSlider";

export default function Home() {
  return (
    <>
      <HowItWorks />
      <TestimonialsSlider />
      <PricingSection />
      <FAQAccordion />
    </>
  );
}
