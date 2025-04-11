"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const chefs = [
  {
    name: "Anita Sharma",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    cuisines: ["North Indian", "Vegan"],
    rating: 4.8,
  },
  {
    name: "Rahul Mehra",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    cuisines: ["Mughlai", "Chinese"],
    rating: 4.7,
  },
  {
    name: "Fatima Sheikh",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    cuisines: ["Hyderabadi", "South Indian"],
    rating: 4.9,
  },
  {
    name: "Suresh Nair",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    cuisines: ["Kerala", "Seafood"],
    rating: 4.6,
  },
  {
    name: "Meena Gupta",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    cuisines: ["Gujarati", "Snacks"],
    rating: 4.5,
  },
];

export default function FeaturedChefs() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 25 },
      },
    },
  });

  return (
    <section className="py-16 px-4 bg-purple-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto text-center"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
            Meet Our Home Chefs
          </h2>
          <p className="text-gray-600 mb-10">
            Passionate, skilled, and ready to serve you the taste of home
          </p>

          <div ref={sliderRef} className="keen-slider">
            {chefs.map((chef, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="keen-slider__slide"
              >
                <Card className="hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6 text-left space-y-4">
                    <div className="w-full h-48 relative rounded-xl overflow-hidden">
                      <Image
                        src={chef.image}
                        alt={chef.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{chef.name}</h3>
                    <p className="text-sm text-gray-600">
                      Cuisines: {chef.cuisines.join(", ")}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      <span className="text-md font-medium">
                        {chef.rating.toFixed(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
