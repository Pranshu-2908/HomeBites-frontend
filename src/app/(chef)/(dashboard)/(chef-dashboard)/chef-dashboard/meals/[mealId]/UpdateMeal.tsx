"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { fetchMealById } from "@/redux/slices/mealSlice";
import { updateMeal } from "@/redux/slices/mealSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function EditMealPage() {
  const { mealId } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedMeal, loading } = useAppSelector((state) => state.meal);
  const [images, setImages] = useState<File | null>(null);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    cuisine: "",
    preparationTime: "",
  });

  useEffect(() => {
    if (selectedMeal) {
      setInput({
        name: selectedMeal.name || "",
        description: selectedMeal.description || "",
        price: selectedMeal.price?.toString() || "",
        quantity: selectedMeal.quantity?.toString() || "",
        category: selectedMeal.category || "",
        cuisine: selectedMeal.cuisine || "",
        preparationTime: selectedMeal.preparationTime?.toString() || "",
      });
    }
  }, [selectedMeal]);

  useEffect(() => {
    dispatch(fetchMealById(mealId as string));
  }, [mealId, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name || "");
    formData.append("description", input.description);
    formData.append("price", input.price.toString());
    formData.append("category", input.category);
    formData.append("cuisine", input.cuisine);
    formData.append("quantity", input.quantity.toString());
    formData.append("preparationTime", input.preparationTime.toString());
    if (images) {
      formData.append("images", images);
    }
    dispatch(updateMeal({ id: mealId as string, formData }));
    if (loading !== true) {
      router.back();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">Edit Meal</h2>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block mb-1 font-medium text-sm">Name</label>
              <Input
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Category</label>
              <Input
                name="category"
                value={input.category}
                onChange={handleChange}
                placeholder="Category"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-sm">
                Description
              </label>
              <Textarea
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Price</label>
              <Input
                id="price"
                name="price"
                type="number"
                value={input.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Quantity</label>
              <Input
                name="quantity"
                type="number"
                value={input.quantity}
                onChange={handleChange}
                placeholder="Quantity"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Cuisine</label>
              <Input
                name="cuisine"
                value={input.cuisine}
                onChange={handleChange}
                placeholder="Cuisine"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">
                Preparation Time (min)
              </label>
              <Input
                name="preparationTime"
                type="number"
                value={input.preparationTime}
                onChange={handleChange}
                placeholder="Prep Time"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <Input
                name="images"
                type="file"
                accept="image/*"
                onChange={(e) => setImages(e.target.files?.[0] || null)}
                multiple
                className="w-full"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              {loading ? (
                <Button>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Adding Meal...
                </Button>
              ) : (
                <Button type="submit">Update Meal</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
