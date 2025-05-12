"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, status, loading } = useAppSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, loading]);

  if (status !== "succeeded") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="checking for authentication...." />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
