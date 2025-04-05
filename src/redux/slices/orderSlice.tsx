/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/orderSlice.ts
import { axiosInstance } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  _id?: string;
  customerId: Customer;
  chefId: string;
  meals: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
}

interface OrderState {
  pendingOrders: Order[];
  acceptedOrders: Order[];
  preparedOrders: Order[];
  completedOrders: Order[];
  cancelledOrders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  pendingOrders: [],
  acceptedOrders: [],
  preparedOrders: [],
  completedOrders: [],
  cancelledOrders: [],
  loading: false,
  error: null,
};

// Async thunk: Fetch a chef's orders
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Orders
      .addCase(fetchChefOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChefOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingOrders = action.payload.pendingOrders;
        state.acceptedOrders = action.payload.acceptedOrders;
        state.preparedOrders = action.payload.preparedOrders;
        state.completedOrders = action.payload.completedOrders;
        state.cancelledOrders = action.payload.cancelledOrders;
      })
      .addCase(fetchChefOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
