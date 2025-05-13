import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export function useBlockChefs() {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.auth); // Ensure `loading` is in your auth slice
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (user?.role === "chef") {
        console.log("Chef detected, redirecting to chef dashboard");
        router.replace("/chef-dashboard");
      } else {
        setChecking(false);
      }
    }
  }, [user, loading]);

  return checking;
}
