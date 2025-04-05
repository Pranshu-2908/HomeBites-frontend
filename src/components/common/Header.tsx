"use client";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingCartIcon, User2 } from "lucide-react";
import Link from "next/link";
import NavLink from "./Navlink";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (store: RootState) => store.auth.isAuthenticated
  );
  const user = useAppSelector((store) => store.auth.user);

  const handleLogout = async () => {
    const resp = await axiosInstance.get("/user/logout");
    dispatch(logout());
    router.push("/");
    toast(resp.data.message);
  };
  return (
    <div className="text-white flex flex-wrap justify-between items-center px-10 py-5 bg-gray-800 shadow-md w-full mx-auto">
      <Link href="/" className="text-xl md:text-3xl font-bold">
        HOMEBITES{" "}
      </Link>

      <div className="hidden md:flex md:justify-center gap-5 text-gray-700 text-lg">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/menu">Menu</NavLink>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/contact">Contact Us</NavLink>
      </div>

      <div className="flex items-center gap-1">
        <Link href="/cart">
          <ShoppingCartIcon size={28} className="mx-4" />
        </Link>
        {/* {getTotalCartAmount() > 0 && (
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          )} */}

        {isAuthenticated ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer size-12 bg-white">
                <AvatarImage
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-2">
              <div>
                <div className="flex gap-4">
                  <Avatar className="border-1 border-gray-300">
                    <AvatarImage
                      src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h2 className="font-medium">
                      {user?.name || "Error Fetch"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quae, maiores.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-slate-600">
                  {user?.role === "customer" ? (
                    <div className="flex w-fit items-center cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link href="/profile">View Profile</Link>
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="flex w-fit items-center cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="outline" className="ml-1">
            <Link href="/login">Sign-in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
