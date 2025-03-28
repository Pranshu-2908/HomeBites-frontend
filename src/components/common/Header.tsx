import { Button } from "@/components/ui/button";
import { Search, Store } from "lucide-react";
import Link from "next/link";
import NavLink from "./Navlink";

const Navbar = () => {
  return (
    <div className="text-white flex flex-wrap justify-between items-center px-10 py-5 bg-gray-800 shadow-md min-w-screen mx-auto">
      <Link href="/" className="text-xl md:text-3xl font-bold">
        HOMEBITES{" "}
      </Link>

      <div className="hidden md:flex md:justify-center gap-5 text-gray-700 text-lg">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/menu">Menu</NavLink>
        <NavLink href="#footer">About Us</NavLink>
        <NavLink href="#footer">Contact Us</NavLink>
      </div>

      <div className="flex items-center gap-1">
        <Search size={28} className="mx-4" />

        <Link href="/cart">
          <Store size={28} className="mx-4" />
        </Link>
        {/* {getTotalCartAmount() > 0 && (
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          )} */}
        <Button variant="outline" className="ml-1">
          <Link href="/login">Sign-in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
