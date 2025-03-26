import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative mx-auto flex flex-col gap-5 sm:gap-10 items-center justify-center max-w-7xl mt-10 sm:mt-20">
      <div className="flex">
        <div className="flex relative px-5 py-2 rounded-full border-2 shadow-2xl border-teal-400 hover:bg-teal-200 transition-all duration-700 hover:border-teal-700">
          <Sparkles className="w-4 h-4 sm:w-6 mt-1 sm:h-6 mr-2 text-teal-600 animate-pulse" />
          <p className="text-md sm:text-md md:text-lg text-teal-600 cursor-default">
            No.1 Homemade Food Delivery App
          </p>
        </div>
      </div>

      <div className="font-bold text-4xl py-8 text-center max-w-sm sm:max-w-xl sm:text-5xl lg:max-w-3xl lg:text-6xl mx-auto">
        Authenticate Homemade Food Delivery Platform
      </div>
      <div className="text-sm sm:text-lg lg:text-xl text-center px-4 lg:px-8 lg:max-w-4xl sm:max-w-2xl text-gray-500">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
          consectetur quibusdam illo doloribus. Tempore culpa voluptas iste hic
          esse illum?
        </p>
      </div>

      <div>
        <Button className="text-base sm:text-lg lg:text-lg px-8 lg:px-12 py-6 sm:py-7 lg:py-8 rounded-full bg-linear-to-r from-slate-800 to-teal-800 hover:from-teal-800 hover:to-slate-800 shadow-lg">
          <Link href="/" className="flex gap-2 items-center">
            Explore Menu
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
