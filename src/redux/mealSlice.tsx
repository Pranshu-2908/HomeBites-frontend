import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstance,
  axiosInstanceWithFormData,
} from "@/utils/axiosInstance"; // Use the centralized axios instance
import { toast } from "sonner";
import { ParamValue } from "next/dist/server/request/params";

export interface workingHours {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}
export interface Chef {
  _id: string;
  name: string;
  profilePicture: string;
  workingHours: workingHours;
  location: string;
  bio: string;
}
interface Meal {
  _id: string;
  chefId: Chef;
  name: string;
  description: string;
  price: number;
  category: string;
  cuisine: string;
  preparationTime: number;
  images: string[];
  quantity: number;
  rating: number;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MealState {
  meals: Meal[];
  selectedMeal: Meal;
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: [],
  selectedMeal: {} as Meal,
  loading: false,
  error: null,
};
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    const response = await axiosInstance.get("/meal/");
    return response.data.meals;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast(error.response?.data?.message || "failed to fetch meals");
    throw error;
  }
});
export const fetchMealById = createAsyncThunk(
  "meals/fetchMealById",
  async (mealId: ParamValue) => {
    try {
      const response = await axiosInstance.get(`/meal/${mealId}`);
      return response.data.meal;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.response?.data?.message || "Failed to fetch meal");
      throw error;
    }
  }
);

export const createMeal = createAsyncThunk(
  "meal/createMeal",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceWithFormData.post(
        "/meal/",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      return response.data.meal;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

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
      })
      .addCase(fetchMealById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMeal = action.payload;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the meal";
      })
      .addCase(createMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.meals.push(action.payload);
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mealSlice.reducer;
