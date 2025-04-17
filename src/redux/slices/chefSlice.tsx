/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IChefStats {
  totalRatings: number;
  totalMeals: number;
  totalOrdersCompleted: number;
  liveOrders: number;
  revenue: number;
  mostPopularDish: string;
  pendingOrders: number;
  avgPrepTime: number;
}
export interface OrderTrend {
  date: string;
  orders: number;
}

export const fetchChefStats = createAsyncThunk(
  "chef/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/chef/stats");
      return res.data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch stats");
    }
  }
);
export const fetchOrderTrends = createAsyncThunk<
  OrderTrend[],
  string,
  { rejectValue: string }
>("chef/fetchOrderTrends", async (chefId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/chef/order-trends`);
    return response.data as OrderTrend[];
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Something went wrong"
    );
  }
});

interface chefState {
  chefStats: IChefStats;
  loading: boolean;
  orderTrends: OrderTrend[];
}

const initialState: chefState = {
  chefStats: {} as IChefStats,
  loading: false,
  orderTrends: [],
};

const chefSlice = createSlice({
  name: "chef",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChefStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChefStats.fulfilled, (state, action) => {
        state.loading = false;
        state.chefStats = action.payload;
      })
      .addCase(fetchChefStats.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchOrderTrends.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.orderTrends = action.payload;
      })
      .addCase(fetchOrderTrends.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default chefSlice.reducer;
