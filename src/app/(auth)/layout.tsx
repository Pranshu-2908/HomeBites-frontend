import React, { ReactNode } from "react";
import Header from "../../components/common/Header";
import Footer from "@/components/common/Footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
