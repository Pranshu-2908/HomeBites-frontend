"use client";
import React, { ReactNode } from "react";
import Header from "../../components/common/Header";
import Footer from "@/components/common/Footer";
import { useBlockChefs } from "@/utils/useRoleDirect";
import LoadingSpinner from "@/components/LoadingSpinner";

function Layout({ children }: { children: ReactNode }) {
  const checking = useBlockChefs();

  if (checking)
    return <LoadingSpinner message="Checking access..." fullScreen={true} />;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>
      <main className="flex-1 bg-gray-300">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
