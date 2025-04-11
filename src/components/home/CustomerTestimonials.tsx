"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { getTopReviews } from "@/redux/slices/reviewSlice";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CustomerTestimonials() {
  const { topReviews, loading } = useAppSelector(
    (store: RootState) => store.review
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTopReviews());
  }, [dispatch]);
  return (
    <section className="py-16 px-6 bg-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-center mb-10"
      >
        <h2 className="heading text-3xl md:text-4xl font-bold mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600">
          Authentic stories from happy food lovers
        </p>
      </motion.div>
      {loading ? (
        <LoadingSpinner message="Loading reviews..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {topReviews.map((top, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                key={index}
                className="p-6 shadow-md hover:shadow-lg transition-all"
              >
                <CardContent className="flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-4">
                    <Image
                      src={top.customerId?.profilePicture || ""}
                      alt={top.customerId?.name || "image"}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{top?.customerId?.name}</h3>
                      <p className="text-sm text-gray-500">
                        Ordered from {top.chefId?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">“{top.comment}”</p>
                  <div className="flex gap-1">
                    {[...Array(top.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
