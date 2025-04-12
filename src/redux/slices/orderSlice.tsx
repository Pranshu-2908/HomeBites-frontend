/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/orderSlice.ts
import { axiosInstance } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface meal {
  _id: string;
  name: string;
  price: number;
}
interface OrderItem {
  mealId: meal;
  quantity: number;
}
interface Customer {
  _id: string;
  name: string;
}
interface Order {
  _id: string;
  customerId: Customer;
  chefId: string;
  meals: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "accepted"
    | "preparing"
    | "completed"
    | "cancelled"
    | "rejected";
  reviewed: boolean;
  createdAt?: Date;
}

interface OrderState {
  pendingOrders: Order[];
  acceptedOrders: Order[];
  preparingOrders: Order[];
  completedOrders: Order[];
  cancelledOrders: Order[];
  rejectedOrders: Order[];
  customerOrders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  pendingOrders: [],
  acceptedOrders: [],
  preparingOrders: [],
  completedOrders: [],
  cancelledOrders: [],
  rejectedOrders: [],
  customerOrders: [],
  loading: false,
  error: null,
};

export const fetchChefOrdersByStatus = createAsyncThunk(
  "order/fetchChefOrdersByStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/chef");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch chef orders"
      );
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const resposne = await axiosInstance.patch(`/order/${orderId}/status`, {
        status,
      });
      toast.success("updated status successfully");
      return resposne.data.order;
    } catch (err: any) {
      toast.error(err.resposne?.data?.message || "failed to update status");
      return rejectWithValue(
        err.response?.data?.message || "failed to update the status"
      );
    }
  }
);
export const fetchCustomerOrders = createAsyncThunk(
  "order/fetchCustomerOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/");
      return res.data.orders;
    } catch (error: any) {
      return rejectWithValue(
        error.res?.data?.message || "unable to fetch orders"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChefOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChefOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingOrders = [...action.payload.pendingOrders].reverse();
        state.acceptedOrders = [...action.payload.acceptedOrders].reverse();
        state.preparingOrders = [...action.payload.preparingOrders].reverse();
        state.completedOrders = [...action.payload.completedOrders].reverse();
        state.cancelledOrders = [...action.payload.cancelledOrders].reverse();
        state.rejectedOrders = [...action.payload.rejectedOrders].reverse();
      })
      .addCase(fetchChefOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.customerOrders = [...action.payload].reverse();
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;

        state.pendingOrders = state.pendingOrders.filter(
          (order) => order._id !== updatedOrder._id
        );
        state.acceptedOrders = state.acceptedOrders.filter(
          (order) => order._id !== updatedOrder._id
        );
        state.preparingOrders = state.preparingOrders.filter(
          (order) => order._id !== updatedOrder._id
        );
        state.completedOrders = state.completedOrders.filter(
          (order) => order._id !== updatedOrder._id
        );
        state.cancelledOrders = state.cancelledOrders.filter(
          (order) => order._id !== updatedOrder._id
        );
        state.rejectedOrders = state.rejectedOrders.filter(
          (order) => order._id !== updatedOrder._id
        );
        switch (updatedOrder.status) {
          case "pending":
            state.pendingOrders.push(updatedOrder);
            break;
          case "accepted":
            state.acceptedOrders.push(updatedOrder);
            break;
          case "preparing":
            state.preparingOrders.push(updatedOrder);
            break;
          case "completed":
            state.completedOrders.push(updatedOrder);
            break;
          case "cancelled":
            state.cancelledOrders.push(updatedOrder);
            break;
          case "rejected":
            state.rejectedOrders.push(updatedOrder);
            break;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
