import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-[url('/background.jpg')] h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="flex p-5 flex-col gap-5 sm:gap-10 h-screen items-center justify-center bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex">
          <div className="flex relative px-5 py-2 rounded-full shadow-2xl bg-black transition-all duration-700 hover:scale-110">
            <Sparkles className="w-4 h-4 sm:w-6 mt-1 sm:h-6 mr-2 text-white animate-pulse" />
            <p className="text-md sm:text-md md:text-lg text-white cursor-default">
              No.1 Homemade Food Delivery App
            </p>
          </div>
        </div>

        <div className="font-bold text-4xl text-center max-w-sm sm:text-3xl sm:max-w-md lg:max-w-lg xl:max-w-xl lg:text-5xl mx-auto">
          Authenticate Homemade Food Delivery Platform
        </div>
        <div className="text-sm sm:text-md lg:text-lg text-center px-4 lg:px-8sm:max-w-md lg:max-w-lg xl:max-w-xl  text-slate-800">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
            consectetur quibusdam illo doloribus. Tempore culpa voluptas iste
            hic esse illum?
          </p>
        </div>

        <div>
          <Button className="text-base sm:text-lg lg:text-lg px-8 lg:px-12 py-6 sm:py-7 lg:py-8 rounded-full bg-linear-to-r from-slate-800 to-gray-600 hover:from-gray-600 hover:to-slate-800 shadow-lg">
            <Link href="/menu" className="flex gap-2 items-center">
              Explore Menu
              <ArrowRight className="animate-pulse" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
