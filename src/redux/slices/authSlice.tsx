/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  axiosInstance,
  axiosInstanceWithFormData,
} from "@/utils/axiosInstance";
import { toast } from "sonner";
interface User {
  _id: string;
  name: string;
  email: string;
  role: "chef" | "customer";
  phoneNumber?: string;
  location?: string;
  bio?: string;
  certifications?: string;
  profilePicture?: string;
  workingHours?: {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
  };
}

interface AuthState {
  user: User | null;
  chefs: User[];
  isAuthenticated: boolean;
  status: "idle" | "succeeded" | "loading";
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  chefs: [],
  status: "idle",
  loading: true,
  error: null,
};
export const updateProfile = createAsyncThunk<
  User,
  FormData,
  { rejectValue: string; state: RootState }
>("auth/updateProfile", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstanceWithFormData.patch(
      "/user/profile",
      formData
    );
    toast.success(response.data.message);
    return response.data.user;
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to update profile");
    return rejectWithValue(
      err.response?.data?.message || "Failed to update profile"
    );
  }
});
export const fetchAllchefs = createAsyncThunk(
  "auth/fetchAllChef",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/chefs");
      return res.data.chefs;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "unable to fetch chefs"
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.status = "succeeded";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.loading = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload || "Failed to update profile";
      })
      .addCase(fetchAllchefs.fulfilled, (state, action) => {
        state.chefs = action.payload;
        state.error = null;
      });
  },
});

export const { login, logout, setUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
