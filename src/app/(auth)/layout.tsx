import React, { ReactNode } from "react";
import Header from "../../components/common/Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default Layout;
