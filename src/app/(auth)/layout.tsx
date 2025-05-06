import React, { ReactNode } from "react";
import Header from "../../components/common/Header";
import Footer from "@/components/common/Footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <Header />
      <main className="flex-1">{children}</main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
