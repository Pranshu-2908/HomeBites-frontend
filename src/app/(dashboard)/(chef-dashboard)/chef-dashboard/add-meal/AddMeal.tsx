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
import { useState } from "react";

export default function AddMeal() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    cuisine: "",
    quantity: "",
    preparationTime: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Meal added:", formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">Add a Meal</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-col-1  md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>category</SelectLabel>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-veg</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cuisine">Cuisine</Label>
            <Input
              id="cuisine"
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="preparationTime">
              Preparation Time (in minutes)
            </Label>
            <Input
              id="preparationTime"
              type="number"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full mt-1 p-2"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Add Meal
          </Button>
        </div>
      </form>
    </div>
  );
}
