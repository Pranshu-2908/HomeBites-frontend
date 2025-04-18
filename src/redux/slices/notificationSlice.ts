// notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationType {
  _id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationState {
  items: NotificationType[];
  unreadCount: number;
}

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<NotificationType[]>) {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(
        (notification) => !notification.read
      ).length;
    },
    addNotification(state, action: PayloadAction<NotificationType>) {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAllAsRead(state) {
      state.items = state.items.map((notification) => ({
        ...notification,
        read: true,
      }));
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAllAsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
