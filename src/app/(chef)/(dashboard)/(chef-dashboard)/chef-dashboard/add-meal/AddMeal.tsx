"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { createMeal } from "@/redux/mealSlice";

export default function AddMeal() {
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
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
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    dispatch(createMeal(formData));
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-6">
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6">Add a Meal</h1>

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
                <Select
                  onValueChange={handleSelectChange}
                  value={input.category}
                >
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
                <Label htmlFor="preparationTime">
                  Preparation Time (minutes)
                </Label>
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
        </CardContent>
      </Card>
    </div>
  );
}
