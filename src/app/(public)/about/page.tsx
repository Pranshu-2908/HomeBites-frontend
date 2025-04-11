"use client";
import CreatorSection from "@/components/CreatorSection";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-300 text-gray-900 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold mb-4">About HomeBites</h1>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          HomeBites is a passion project by food lovers and tech enthusiasts who
          believe in the power of homemade meals and supporting local chefs.
        </p>
      </motion.div>
      <CreatorSection />
    </div>
  );
}
