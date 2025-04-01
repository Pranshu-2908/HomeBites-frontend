"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <div className="text-xl font-semibold mb-8">{profileName}</div>
        <div className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block p-2 rounded-md hover:bg-gray-700",
                pathName === item.href && "bg-gray-700"
              )}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {children} {/* This renders the content of the selected page */}
      </div>
    </div>
  );
}
