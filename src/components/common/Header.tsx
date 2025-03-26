import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex justify-between items-center mx-5 sm:mx-10 lg:mx-20 my-3">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        HOMEBITES
      </h1>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-10 lg:gap-20">
        <div className="flex gap-5">
          <Link href="/" className="text-lg md:text-xl lg:text-2xl">
            Home
          </Link>
          <Link href="/menu" className="text-lg md:text-xl lg:text-2xl">
            Menu
          </Link>
        </div>
        <div className="flex gap-5">
          <Button variant="outline" className="cursor-pointer sm:text-xl">
            <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-black cursor-pointer sm:text-xl">
            <Link href="/register">Signup</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
