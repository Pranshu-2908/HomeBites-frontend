/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { addNotification } from "@/redux/slices/notificationSlice";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";

interface SocketContextType {
  socket: any;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_URL =
  process.env.NEXT_PUBLIC_MODE === "development"
    ? "http://localhost:5001"
    : "https://homebite-pro.onrender.com";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("newNotification", (notification: any) => {
      dispatch(addNotification(notification));
      toast(notification.message);
    });

    return () => {
      newSocket.off("newNotification");
      newSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// custom hook to use socket
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("SocketContext is undefined");
  }
  return context;
};
