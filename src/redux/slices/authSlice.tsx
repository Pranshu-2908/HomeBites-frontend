import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { axiosInstanceWithFormData } from "@/utils/axiosInstance";
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
  isAuthenticated: boolean;
  status: "idle" | "succeeded" | "loading";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};
export const updateProfile = createAsyncThunk<
  User, // Return type
  FormData, // Argument type
  { rejectValue: string; state: RootState } // Options
>("auth/updateProfile", async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstanceWithFormData.patch(
      "/user/profile",
      formData
    );
    toast.success(response.data.message);
    return response.data.user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to update profile");
    return rejectWithValue(
      err.response?.data?.message || "Failed to update profile"
    );
  }
});

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
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
