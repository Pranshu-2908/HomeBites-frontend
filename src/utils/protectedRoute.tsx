"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, status } = useAppSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if ((status === "succeeded" || status === "idle") && !isAuthenticated) {
      router.push("/login");
      toast.error("Login first to continue");
    }
  }, [status, isAuthenticated, router]);

  if (!isAuthenticated && status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="checking for authentication...." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="checking for authentication..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
