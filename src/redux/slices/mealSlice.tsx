/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstance,
  axiosInstanceWithFormData,
} from "@/utils/axiosInstance";
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
  profilePicture?: string;
  workingHours?: workingHours;
  location?: string;
  bio?: string;
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
  averageRating: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MealState {
  meals: Meal[];
  selectedMeal: Meal;
  chefMeals: Meal[];
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: [],
  selectedMeal: {} as Meal,
  chefMeals: [],
  loading: false,
  error: null,
};
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    const response = await axiosInstance.get("/meal/");
    return response.data.meals;
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
    } catch (error: any) {
      toast(error.response?.data?.message || "Failed to fetch meal");
      throw error;
    }
  }
);
export const fetchChefMeals = createAsyncThunk(
  "meals/fetchChefMeals",
  async () => {
    try {
      const response = await axiosInstance.get("/meal/chef");
      return response.data.meals;
    } catch (error: any) {
      toast(error.response?.data?.message || "Failed to fetch meals");
      throw error;
    }
  }
);

export const updateMeal = createAsyncThunk<
  Meal,
  { id: string; formData: FormData },
  { rejectValue: string }
>("meal/updateMeal", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstanceWithFormData.put(
      `/meal/${id}`,
      formData
    );
    toast.success(response.data.message);
    return response.data.meal;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Update failed");
  }
});
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
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteMeal = createAsyncThunk(
  "meal/delete",
  async (mealId: string) => {
    try {
      await axiosInstance.delete(`/meal/${mealId}`);
      toast.success("Meal Deleted Succesfully");
      return mealId;
    } catch (error) {
      toast.error("Failed to delete meal");
      throw error;
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
      })
      .addCase(fetchChefMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChefMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.chefMeals = action.payload;
      })
      .addCase(fetchChefMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch meals";
      })
      .addCase(updateMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.chefMeals = state.chefMeals.map((meal) =>
          meal._id === action.payload._id ? action.payload : meal
        );
      })
      .addCase(updateMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      })
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.chefMeals = state.chefMeals.filter(
          (meal) => meal._id !== action.payload
        );
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mealSlice.reducer;
