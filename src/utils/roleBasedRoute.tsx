"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const { user, isAuthenticated, status } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
      router.replace("/");
      toast("Access Denied");
    } else {
      setIsCheckingAuth(false);
    }
  }, [status, isAuthenticated, user, allowedRoles, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
