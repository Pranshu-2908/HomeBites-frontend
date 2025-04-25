"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { createMeal } from "@/redux/slices/mealSlice";
import { RootState } from "@/redux/store";
import { axiosInstance } from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AddMealForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((store: RootState) => store.meal);
  const [images, setImages] = useState<File | null>(null);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    cuisine: "",
    quantity: "",
    preparationTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSelectChange = (value: string) => {
    setInput((prevState) => ({
      ...prevState,
      category: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name || "");
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append("cuisine", input.cuisine);
    formData.append("quantity", input.quantity);
    formData.append("preparationTime", input.preparationTime);
    if (images) {
      formData.append("images", images);
    }
    await dispatch(createMeal(formData));
    const res = await axiosInstance.patch("/user/onboarding-step");
    dispatch(setUser(res.data));
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Step 2: Add Your First Meal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              name="description"
              value={input.description}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              name="price"
              value={input.price}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleSelectChange} value={input.category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-veg</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine">Cuisine</Label>
            <Input
              id="cuisine"
              type="text"
              name="cuisine"
              value={input.cuisine}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity Available</Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              value={input.quantity}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
            <Input
              id="preparationTime"
              type="number"
              name="preparationTime"
              value={input.preparationTime}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image Upload</Label>
            <Input
              id="images"
              type="file"
              name="images"
              onChange={(e) => setImages(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          {loading ? (
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Adding Meal...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Meal
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
