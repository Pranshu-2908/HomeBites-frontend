"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "./../../components/common/Header";
import Footer from "@/components/common/Footer";
import ProtectedRoute from "@/utils/protectedRoute";
import RoleBasedRoute from "@/utils/roleBasedRoute";
import { useAppDispatch } from "@/redux/hooks";
import { useSocket } from "@/utils/SocketContext";
import { toast } from "sonner";
import { fetchCustomerOrders } from "@/redux/slices/orderSlice";

interface Notification {
  _id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
export default function CustomerLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("newNotification", (notification: Notification) => {
        toast(notification.message);
        dispatch(fetchCustomerOrders());
      });
    }

    return () => {
      if (socket) {
        socket.off("newNotification");
      }
    };
  }, [socket, dispatch]);
  return (
    <ProtectedRoute>
      <RoleBasedRoute allowedRoles={["customer"]}>
        <div className="flex flex-col min-h-screen">
          <div className="sticky top-0 z-50 bg-white shadow-md">
            <Header />
          </div>
          <main className="flex-1 bg-gray-300">{children}</main>
          <Footer />
        </div>
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
