import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axiosInstance"; // Use the centralized axios instance

interface Meal {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  cuisine: string;
  preparationTime: number;
  images: string[];
  quantity: number;
  rating: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MealState {
  meals: Meal[];
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: [],
  loading: false,
  error: null,
};
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await axiosInstance.get("/meal/");
  return response.data.meals;
});

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch meals";
      });
  },
});

export default mealSlice.reducer;
