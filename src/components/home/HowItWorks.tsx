// components/landing/HowItWorks.tsx

import { Card, CardContent } from "@/components/ui/card";
import { CookingPot, Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-purple-700" />,
    title: "Browse Meals",
    description:
      "Explore a variety of homemade dishes prepared by local chefs.",
  },
  {
    icon: <ShoppingCart className="w-10 h-10 text-purple-700" />,
    title: "Place Order",
    description: "Order easily and securely through our platform.",
  },
  {
    icon: <CookingPot className="w-10 h-10 text-purple-700" />,
    title: "Chef Prepares",
    description:
      "Your selected home chef prepares your meal fresh and hygienically.",
  },
  {
    icon: <Truck className="w-10 h-10 text-purple-700" />,
    title: "Delivery",
    description: "Enjoy doorstep delivery right when your meal is ready.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
          How HomeBites Works
        </h2>
        <p className="text-gray-600 mb-10">
          Fresh food in just a few simple steps
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                {step.icon}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
