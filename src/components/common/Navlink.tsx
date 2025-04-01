"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathName = usePathname();
  const isActive =
    href === "/"
      ? pathName === "/"
      : pathName.startsWith(href) && pathName !== "/";

  return (
    <Link
      href={href}
      className={cn(
        "border-b-2 border-gray-600 text-white",
        className,
        isActive && "border-white"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
