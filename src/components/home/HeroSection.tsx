"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[url('/background.jpg')] h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="flex p-5 flex-col gap-5 sm:gap-10 h-screen items-center justify-center bg-gradient-to-b from-black/70 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex"
        >
          <div className="flex relative px-5 py-2 rounded-full shadow-2xl bg-black transition-all duration-700 hover:scale-110">
            <Sparkles className="w-4 h-4 sm:w-6 mt-1 sm:h-6 mr-2 text-white animate-pulse" />
            <p className="text-md sm:text-md md:text-lg text-white cursor-default">
              No.1 Homemade Food Delivery App
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading text-4xl text-center max-w-sm sm:text-3xl sm:max-w-md md:max-w-lg xl:max-w-xl md:text-4xl xl:text-5xl mx-auto"
        >
          Authenticate Homemade Food Delivery Platform
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-md md:text-lg text-center px-4 lg:px-8 sm:max-w-md md:max-w-lg xl:max-w-xl  text-slate-800"
        >
          <p>
            Discover authentic home-cooked meals crafted by passionate local
            chefs. Taste the warmth of home — delivered fresh to your door.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button className="text-base sm:text-lg lg:text-lg px-8 lg:px-12 py-6 sm:py-7 lg:py-8 rounded-full bg-linear-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black shadow-lg">
            <Link href="/menu" className="flex gap-2 items-center">
              Explore Menu
              <ArrowRight className="animate-pulse" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
