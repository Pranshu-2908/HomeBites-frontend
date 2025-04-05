"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface DashBoradPageProps {
  title: string;
  children?: ReactNode;
  hideBackButton?: boolean;
  cta?: ReactNode;
  backHref?: string;
}

function DashboardPage({
  title,
  children,
  cta,
  hideBackButton,
  backHref,
}: DashBoradPageProps) {
  const router = useRouter();

  return (
    <section className="flex-1 h-screen w-full flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 sticky top-0 bg-gray-100 z-30 shadow-md">
        <div className="flex w-full flex-col sm:flex-row sm:items-center gap-4 ">
          <div className="flex items-center gap-4 ">
            {hideBackButton ? null : (
              <Button
                onClick={() => router.push(backHref || "/chef-dashboard")}
                variant="outline"
                className="w-fit bg-white"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          {cta ? (
            <div className="w-full sm:w-auto mt-4 sm:mt-0">{cta}</div>
          ) : null}
        </div>
      </div>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col overflow-auto">
        {children}
      </div>
    </section>
  );
}

export default DashboardPage;
