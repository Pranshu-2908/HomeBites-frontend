import React, { ReactNode } from "react";
import Header from "./../../components/common/Header";
import Footer from "@/components/common/Footer";

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>
      {children}
      <Footer />
    </>
  );
}

export default layout;
