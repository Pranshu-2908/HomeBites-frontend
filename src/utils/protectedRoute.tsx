"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, status } = useAppSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if ((status === "succeeded" || status === "idle") && !isAuthenticated) {
      router.push("/login");
    }
  }, [status, isAuthenticated, router]);

  if (!isAuthenticated && status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading....</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
