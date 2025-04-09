import CTASection from "@/components/home/Cta";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import FeaturedChefs from "@/components/home/FeaturedChef";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeaturedChefs />
      <WhyChooseUs />
      <CustomerTestimonials />
      <CTASection />
    </div>
  );
}
