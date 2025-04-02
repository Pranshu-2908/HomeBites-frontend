"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleBasedRoute from "@/utils/roleBasedRoute";

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
  const pathName = usePathname();
  const profileName = "Chef John Doe"; // Static name for now
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <RoleBasedRoute allowedRoles={["chef"]}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Menu Button - Only visible on small screens */}
        <div className="md:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
          <div className="text-xl font-semibold">{profileName}</div>
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

        {/* Sidebar - Hidden on mobile unless toggled */}
        <div
          className={cn(
            "bg-gray-800 text-white transition-all duration-300 ease-in-out",
            isSidebarOpen
              ? "block w-full md:w-64 min-h-0 md:min-h-screen"
              : "hidden md:block md:w-64 md:min-h-screen"
          )}
        >
          {/* Desktop profile name - Hidden on mobile */}
          <div className="hidden md:block text-xl font-semibold p-4 mb-4">
            {profileName}
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
        <div className="flex-1 overflow-hidden">
          {children} {/* This renders the content of the selected page */}
        </div>
      </div>
    </RoleBasedRoute>
  );
}
