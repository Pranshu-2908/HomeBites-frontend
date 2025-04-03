import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: string;
  name: string;
  email: string;
  role: "chef" | "customer";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "succeeded";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
