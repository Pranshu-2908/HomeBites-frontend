/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axiosInstance";
import { RootState } from "../store";
import { toast } from "sonner";

interface Customer {
  _id: string;
  name: string;
  profilePicture: string;
}

interface Chef {
  _id: string;
  name: string;
}

interface Review {
  _id?: string;
  customerId?: Customer;
  orderId?: string;
  mealId?: string;
  chefId?: Chef;
  rating: number;
  comment: string;
}

interface ReviewState {
  loading: boolean;
  error: string | null;
  reviews: Review[];
  topReviews: Review[];
  totalReviewOfAChef: number | null;
  mealAverageRating: number | null;
  chefAverageRating: number | null;
}

const initialState: ReviewState = {
  loading: false,
  error: null,
  reviews: [],
  topReviews: [],
  totalReviewOfAChef: null,
  mealAverageRating: null,
  chefAverageRating: null,
};

export const addReview = createAsyncThunk(
  "review/addReview",
  async (
    payload: { orderId: string; mealReviews: Review[] },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post("/review/", payload);
      return res.data.reviews;
    } catch (err: any) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to add review"
      );
    }
  }
);
export const getMealReviews = createAsyncThunk(
  "review/getMealReviews",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/review/meal/${mealId}`);
      return res.data.reviews;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch meal's reviews"
      );
    }
  }
);
export const getMealAverageRating = createAsyncThunk(
  "review/getMealAverageRating",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/review/meal/average/${mealId}`);
      return res.data.averageRating;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch average rating of a meal"
      );
    }
  }
);
export const getChefAverageRating = createAsyncThunk(
  "review/getChefAverageRating",
  async (chefId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/review/chef/average/${chefId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch chef's average rating"
      );
    }
  }
);
export const getTopReviews = createAsyncThunk(
  "/review/top",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/review/top");
      return res.data.reviews;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch top reviews"
      );
    }
  }
);
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(...action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMealReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMealReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getMealReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMealAverageRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMealAverageRating.fulfilled, (state, action) => {
        state.loading = false;
        state.mealAverageRating = action.payload;
      })
      .addCase(getMealAverageRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChefAverageRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChefAverageRating.fulfilled, (state, action) => {
        state.loading = false;
        state.chefAverageRating = action.payload.averageRating;
        state.totalReviewOfAChef = action.payload.totalReviews;
      })
      .addCase(getChefAverageRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTopReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.topReviews = action.payload;
      })
      .addCase(getTopReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectReviews = (state: RootState) => state.review;

export default reviewSlice.reducer;
