"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function FeaturedChefs() {
  const { chefs } = useAppSelector((store: RootState) => store.auth);

  return (
    <section className="py-16 px-4 bg-purple-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
          Meet Our Home Chefs
        </h2>
        <p className="text-gray-600 mb-10">
          Passionate, skilled, and ready to serve you the taste of home
        </p>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-80 flex-shrink-0"
            >
              <Card className="hover:shadow-xl transition-all duration-300 h-full p-0">
                <CardContent className="p-6 text-left space-y-4">
                  <div className="w-full h-72 relative rounded-xl overflow-hidden">
                    <Image
                      src={chef.profilePicture ?? ""}
                      alt={chef.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{chef.name}</h3>
                  <p className="text-sm text-gray-600">Bio: {chef.bio}</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-yellow-500" />
                    <span className="text-md font-medium">
                      {chef.averageRating ?? "N/R"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
