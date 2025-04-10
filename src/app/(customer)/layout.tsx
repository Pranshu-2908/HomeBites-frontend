"use client";
import React, { ReactNode } from "react";
import Header from "./../../components/common/Header";
import Footer from "@/components/common/Footer";
import ProtectedRoute from "@/utils/protectedRoute";
import RoleBasedRoute from "@/utils/roleBasedRoute";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={["customer"]}>
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-50 bg-white shadow-md">
            <Header />
          </div>
          <main className="flex-1 bg-gray-300">{children}</main>
          <Footer />
        </div>
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
