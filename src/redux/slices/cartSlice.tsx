/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartItem {
  mealId: string;
  name: string;
  price: number;
  quantity: number;
  availableQty: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const saveCart = createAsyncThunk(
  "cart/save",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { items } = state.cart;

    if (items.length === 0) return;
    try {
      console.log(items);
      axiosInstance.post("/cart", { items });
      console.log("saved");
    } catch (error: any) {
      toast.error("unable to save the cart info");
      return rejectWithValue(
        error.response?.data?.message || "not able to save cart"
      );
    }
  }
);
export const loadCart = createAsyncThunk(
  "cart/load",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/cart");
      return res.data.items as CartItem[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/cart");
      return res.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart"
      );
    }
  }
);

const calTotalAmount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.mealId === action.payload.mealId
      );
      if (existing) {
        if (existing.quantity < existing.availableQty) {
          existing.quantity += 1;
        }
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = calTotalAmount(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.mealId !== action.payload
      );
      state.totalAmount = calTotalAmount(state.items);
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.mealId === action.payload);
      if (item && item.quantity < item.availableQty) {
        item.quantity += 1;
      }
      state.totalAmount = calTotalAmount(state.items);
    },
    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.mealId === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.mealId !== action.payload);
        }
      }
      state.totalAmount = calTotalAmount(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalAmount = calTotalAmount(action.payload);
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
