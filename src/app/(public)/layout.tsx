"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "../../components/common/Header";
import Footer from "@/components/common/Footer";
import { useAppDispatch } from "@/redux/hooks";
import { checkAuth } from "@/redux/authSlice";

function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // Automatically check authentication on app start
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
