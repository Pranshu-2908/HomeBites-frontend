"use client";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingCartIcon, User2 } from "lucide-react";
import Link from "next/link";
import NavLink from "./Navlink";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { deleteCart, loadCart, saveCart } from "@/redux/slices/cartSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import NotificationBell from "../NotificationBell";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector(
    (store: RootState) => store.auth
  );
  const { items } = useAppSelector((store: RootState) => store.cart);
  const user = useAppSelector((store) => store.auth.user);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadCart());
    }
  }, [dispatch, isAuthenticated]);
  const handleLogout = async () => {
    if (items.length > 0) {
      await dispatch(saveCart());
    } else {
      await dispatch(deleteCart());
    }
    dispatch(clearCart());
    const resp = await axiosInstance.get("/user/logout", {
      withCredentials: true,
    });
    dispatch(logout());
    router.push("/");
    toast(resp.data.message);
  };
  return (
    <div className="text-white flex flex-wrap justify-between items-center px-10 py-3 bg-gray-800 shadow-md w-full mx-auto">
      <Link href="/" className="text-lg md:text-3xl font-bold homebite-logo">
        HOMEBITES{" "}
      </Link>

      <div className="hidden md:flex md:justify-center gap-5 text-gray-700 text-lg">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/menu">Menu</NavLink>
        <NavLink href="/chefs">Chefs</NavLink>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/contact">Contact Us</NavLink>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <div className="relative flex items-center gap-1">
          <div>
            <Link href="/cart">
              <ShoppingCartIcon size={28} className="mx-2 md:mx-4" />
            </Link>
          </div>

          {items.length > 0 && (
            <div className="absolute -top-3 -right-1 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </div>
          )}
        </div>

        {loading ? (
          <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
        ) : isAuthenticated ? (
          <div className="flex gap-1 md:gap-4">
            <NotificationBell />
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer size-12 bg-white">
                  <AvatarImage
                    src={
                      user?.profilePicture ||
                      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-2">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 items-center">
                    <Avatar className="border-1 border-gray-300">
                      <AvatarImage
                        src={
                          user?.profilePicture ||
                          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-medium">
                        {user?.name || "Error Fetch"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {user?.address?.city}, {user?.address?.state}
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
                      <Button
                        variant="link"
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
