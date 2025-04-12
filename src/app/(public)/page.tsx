"use client";
import CTASection from "@/components/home/Cta";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import FeaturedChefs from "@/components/home/FeaturedChef";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { useAppDispatch } from "@/redux/hooks";
import { fetchAllchefs } from "@/redux/slices/authSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllchefs());
  }, [dispatch]);
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
