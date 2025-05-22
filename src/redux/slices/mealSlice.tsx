/* eslint-disable @typescript-eslint/no-unused-vars */
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

export interface address {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
export interface Chef {
  _id: string;
  name: string;
  profilePicture?: string;
  workingHours?: workingHours;
  location?: string;
  address?: address;
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
  chefMealsById: Meal[];
  pastMeals: Meal[];
  loadingPastMeals: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: [],
  selectedMeal: {} as Meal,
  chefMeals: [],
  pastMeals: [],
  loadingPastMeals: false,
  chefMealsById: [],
  loading: false,
  error: null,
};
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    const response = await axiosInstance.get("/meal/");
    return response.data.meals;
  } catch (error: any) {
    toast(error.response?.data?.message || "failed to fetch meals");
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
    }
  }
);
export const getChefMealsById = createAsyncThunk(
  "meals/fetchChefMealsById",
  async (chefId: ParamValue) => {
    try {
      const response = await axiosInstance.get(`/meal/chef/${chefId}`);
      return response.data.meals;
    } catch (error: any) {
      toast(error.response?.data?.message || "Failed to fetch meals");
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
    }
  }
);

export const fetchPastMeals = createAsyncThunk<Meal[]>(
  "meals/fetchPastMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("meal/pastOrderMeals");
      return response.data.pastMeals;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch past meals"
      );
    }
  }
);

const shuffleArray = (array: Meal[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
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
        state.meals = shuffleArray(action.payload);
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
      .addCase(getChefMealsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChefMealsById.fulfilled, (state, action) => {
        state.loading = false;
        state.chefMealsById = action.payload;
      })
      .addCase(getChefMealsById.rejected, (state, action) => {
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
      })
      .addCase(fetchPastMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPastMeals.fulfilled, (state, action) => {
        state.pastMeals = action.payload;
        state.loadingPastMeals = false;
      })
      .addCase(fetchPastMeals.rejected, (state, action) => {
        state.loadingPastMeals = false;
      });
  },
});

export default mealSlice.reducer;
