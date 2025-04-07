import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
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

const calTotalAmount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
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
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = calTotalAmount(state.items);
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.availableQty) {
        item.quantity += 1;
      }
      state.totalAmount = calTotalAmount(state.items);
    },
    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
      state.totalAmount = calTotalAmount(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
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
