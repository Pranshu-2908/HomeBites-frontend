import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const router = useRouter();
  const { user } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    console.log({ user });
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/");
    }
  }, [user, router, allowedRoles]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
