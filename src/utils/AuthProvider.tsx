/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { setUser, logout, setAuthLoading } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { axiosInstance } from "./axiosInstance";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setAuthLoading(true));
        const res = await axiosInstance.get("user/me", {
          withCredentials: true,
        });
        dispatch(setUser(res.data));
      } catch (err: any) {
        console.log(err);
        dispatch(logout());
      }
    };

    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
