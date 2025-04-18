/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { setUser, logout, setAuthLoading } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { axiosInstance } from "./axiosInstance";
import { useSocket } from "./SocketContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setAuthLoading(true));
        const res = await axiosInstance.get("user/me", {
          withCredentials: true,
        });
        if (socket) {
          socket.emit("register", res.data._id);
        }
        dispatch(setUser(res.data));
      } catch (error) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, [dispatch, socket]);

  return <>{children}</>;
};

export default AuthProvider;
