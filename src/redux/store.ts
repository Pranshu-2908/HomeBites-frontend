import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mealReducer from "./slices/mealSlice";
import orderReducer from "./slices/orderSlice";
import cartReducer from "./slices/cartSlice";
import reviewReducer from "./slices/reviewSlice";
import chefReducer from "./slices/chefSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meal: mealReducer,
    order: orderReducer,
    cart: cartReducer,
    review: reviewReducer,
    chef: chefReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
