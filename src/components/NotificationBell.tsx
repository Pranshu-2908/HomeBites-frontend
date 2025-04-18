// components/NotificationBell.tsx
"use client";
import { Bell } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  markAllAsRead,
  setNotifications,
} from "@/redux/slices/notificationSlice";
import { useSocket } from "@/utils/SocketContext";
import { RootState } from "@/redux/store";

export default function NotificationBell() {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store: RootState) => store.auth);
  const { items, unreadCount } = useAppSelector((store) => store.notification);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      dispatch(setNotifications(res.data));
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleOpen = () => {
    dispatch(markAllAsRead());
    socket.emit("markNotificationsAsRead", user?._id);
  };

  return (
    <DropdownMenu onOpenChange={handleOpen}>
      <DropdownMenuTrigger className="relative">
        <Bell className="mr-4" size={28} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-md font-bold text-gray-800 bg-white rounded-full">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto mr-5">
        {items.length > 0 ? (
          items.map((n) => (
            <DropdownMenuItem
              key={n._id}
              className="flex flex-col items-start gap-1"
            >
              <p className="text-sm font-medium">{n.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
