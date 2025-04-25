/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartItem {
  mealId: string;
  chefId: string;
  name: string;
  price: number;
  quantity: number;
  availableQty: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  actionloading: boolean;
  cartLoading: boolean;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  actionloading: false,
  cartLoading: false,
};
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item: { mealId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/cart/add", item);
      return res.data.item;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);
export const increaseCartQty = createAsyncThunk(
  "cart/increaseCartQty",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch("/cart/increase", { mealId });
      return res.data.item;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to increase quantity"
      );
    }
  }
);
export const decreaseCartQty = createAsyncThunk(
  "cart/decreaseCartQty",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch("/cart/decrease", { mealId });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to decrease quantity"
      );
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/cart/remove", {
        data: { mealId },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove item"
      );
    }
  }
);
export const saveCart = createAsyncThunk(
  "cart/save",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { items } = state.cart;

    if (items.length === 0) return;
    try {
      axiosInstance.post("/cart", { items });
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
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalAmount = calTotalAmount(action.payload);
        state.cartLoading = false;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
      })
      .addCase(addToCart.pending, (state) => {
        state.actionloading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload as CartItem;
        const index = state.items.findIndex((i) => i.mealId === newItem.mealId);

        if (index !== -1) {
          state.items[index].quantity = newItem.quantity;
        } else {
          state.items.push(newItem);
        }
        state.totalAmount = calTotalAmount(state.items);
        state.actionloading = false;
      })
      .addCase(increaseCartQty.pending, (state) => {
        state.actionloading = true;
      })
      .addCase(increaseCartQty.fulfilled, (state, action) => {
        const updatedItem = action.payload as CartItem;
        const item = state.items.find((i) => i.mealId === updatedItem.mealId);
        if (item) {
          item.quantity = updatedItem.quantity;
          state.totalAmount = calTotalAmount(state.items);
        }
        state.actionloading = false;
      })
      .addCase(decreaseCartQty.pending, (state) => {
        state.actionloading = true;
      })
      .addCase(decreaseCartQty.fulfilled, (state, action) => {
        const { item, removed, mealId } = action.payload;

        const index = state.items.findIndex((i) => i.mealId === mealId);

        if (removed && index !== -1) {
          state.items.splice(index, 1);
        } else if (item && index !== -1) {
          state.items[index].quantity = item.quantity;
        }

        state.totalAmount = calTotalAmount(state.items);
        state.actionloading = false;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.actionloading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const removedId = action.meta.arg;
        state.items = state.items.filter((item) => item.mealId !== removedId);
        state.totalAmount = calTotalAmount(state.items);
        state.actionloading = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
