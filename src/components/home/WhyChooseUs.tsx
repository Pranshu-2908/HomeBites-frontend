"use client";
import {
  CookingPot,
  ShieldCheck,
  Truck,
  Wallet,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Authentic Homemade Meals",
    description:
      "Taste real homemade food prepared with love, just like mom's kitchen.",
    icon: CookingPot,
  },
  {
    title: "Verified Home Chefs",
    description:
      "We carefully vet all chefs to ensure safety, hygiene, and quality.",
    icon: ShieldCheck,
  },

  {
    title: "Fast & Reliable Delivery",
    description: "Fresh meals delivered hot and on-time to your doorstep.",
    icon: Truck,
  },
  {
    title: "Affordable Pricing",
    description: "Enjoy delicious home-cooked meals without breaking the bank.",
    icon: Wallet,
  },
  {
    title: "Support Local Chefs",
    description: "Every order supports talented chefs in your community.",
    icon: HeartHandshake,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
          Why Choose HomeBites?
        </h2>
        <p className="text-gray-600 mb-10">
          We’re not just a food delivery service — we’re a movement for home
          chefs and homemade goodness.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`w-full sm:w-[270px] max-w-[90vw] ${
                index % 2 === 0
                  ? "scale-105 shadow-lg bg-purple-50"
                  : "bg-white"
              } rounded-xl border border-gray-200 hover:shadow-xl transition-all`}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-start gap-4 text-left">
                  <feature.icon className="w-8 h-8 text-gray-600" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
