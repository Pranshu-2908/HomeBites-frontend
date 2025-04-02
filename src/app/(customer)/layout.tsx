"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "./../../components/common/Header";
import Footer from "@/components/common/Footer";
import { useAppDispatch } from "@/redux/hooks";
import { checkAuth } from "@/redux/authSlice";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
