// import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 flex flex-col gap-5 py-4">
      {/* <div className="flex flex-col sm:flex-row justify-between gap-10">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-3xl italic text-center">HOMEBITES</h1>
          <p className="hidden md:inline text-sm leading-relaxed max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            voluptas porro quasi dolorem mollitia sed culpa, dolore amet rem
            sapiente dolor corporis odio pariatur, impedit quaerat expedita vel
            consequatur quam.
          </p>
          <div className="flex gap-4">
            <Facebook />
            <Twitter />
            <Linkedin />
          </div>
        </div>

        <div className="flex justify-between md:gap-30">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-white text-lg font-semibold">COMPANY</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-white">Home</li>
              <li className="cursor-pointer hover:text-white">About Us</li>
              <li className="cursor-pointer hover:text-white">Delivery</li>
              <li className="cursor-pointer hover:text-white">
                Privacy Policy
              </li>
            </ul>
          </div>

          
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-white text-lg font-semibold">GET IN TOUCH</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-white">+ 9998887773</li>
              <li className="cursor-pointer hover:text-white">
                contact@homebite.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-gray-500 my-5" /> */}

      <p className="text-sm text-center">
        Copyright 2024 @ Homebite.com - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
