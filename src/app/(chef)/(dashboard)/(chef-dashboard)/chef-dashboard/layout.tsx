"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleBasedRoute from "@/utils/roleBasedRoute";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "sonner";
import ProtectedRoute from "@/utils/protectedRoute";

// Sidebar navigation items
const navItems = [
  { href: "/chef-dashboard/profile", label: "Create Profile", icon: "📝" },
  { href: "/chef-dashboard/add-meal", label: "Add a Meal", icon: "🍽️" },
  { href: "/chef-dashboard/meals", label: "View Meals", icon: "📜" },
  { href: "/chef-dashboard/orders", label: "View Orders", icon: "📦" },
  { href: "/chef-dashboard/order-history", label: "Order History", icon: "⏳" },
];

export default function ChefDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAppSelector((store) => store.auth.user);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = async () => {
    const resp = await axiosInstance.get("/user/logout", {
      withCredentials: true,
    });
    dispatch(logout());
    router.push("/");
    toast(resp.data.message);
  };
  return (
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={["chef"]}>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Mobile Menu Button */}
          <div className="md:hidden p-4 bg-gray-800 text-white flex justify-between items-center  sticky top-0 z-50">
            <div className="flex justify-start items-center gap-2">
              {" "}
              <div>
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
                  <PopoverContent className="w-80 ml-2">
                    <div>
                      <div className="flex gap-4">
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quae, maiores.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col text-slate-600">
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
              <div className="text-xl font-semibold">{user?.name}</div>
            </div>
            <Button
              variant="ghost"
              onClick={toggleSidebar}
              className="text-white hover:bg-gray-700"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Sidebar for big screens*/}
          <div
            className={cn(
              "bg-gray-800 text-white transition-all duration-300 ease-in-out",
              isSidebarOpen
                ? "block w-full md:w-64 min-h-0 md:min-h-screen"
                : "hidden md:block md:w-64 md:min-h-screen",
              "sticky top-0 h-screen"
            )}
          >
            {/* Desktop */}
            <div className="flex items-center p-4 gap-3 ">
              <div className="hidden md:block text-xl font-semibold">
                {user?.name}
              </div>
              <div className="hidden md:block">
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
                    <div>
                      <div className="flex gap-4">
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quae, maiores.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col text-slate-600">
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
              <div className="hidden md:block flex-1"></div>
            </div>

            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block p-2 rounded-md hover:bg-gray-700 transition-colors",
                    pathName === item.href && "bg-gray-700"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
