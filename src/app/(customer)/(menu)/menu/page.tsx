"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchMeals } from "@/redux/slices/mealSlice";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cartSlice";
interface Meal {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
export default function MenuPage() {
  const { meals, loading, error } = useAppSelector(
    (store: RootState) => store.meal
  );
  const { user } = useAppSelector((store: RootState) => store.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(search.toLowerCase()) &&
      (cuisine === "" ||
        meal.cuisine.toLowerCase().includes(cuisine.toLowerCase())) &&
      (category === "" ||
        meal.category.toLowerCase().startsWith(category.toLowerCase())) &&
      (time === "" || meal.preparationTime <= parseInt(time))
  );
  const resetTypeFilter = () => {
    setCategory("");
  };
  const resetTimeFilter = () => {
    setTime("");
  };

  const handleAddToCart = (meal: Meal) => {
    if (!user) {
      toast("Login to add items in cart!");
      return;
    }
    dispatch(
      addToCart({
        id: meal._id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
        availableQty: meal.quantity,
      })
    );
    toast.success("Meal added to cart");
  };

  if (loading) return <LoadingSpinner message="Loading Meals..." />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!meals) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
        <Input
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Input
          placeholder="Enter Cuisine..."
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full md:w-1/4"
        />
        <div className="flex gap-1 items-center">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Veg</SelectItem>
              <SelectItem value="non-veg">Non-Veg</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size={"icon"}
            onClick={resetTypeFilter}
            className="h-6 w-6 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <X className="text-black" />
          </Button>
        </div>
        <div className="flex gap-1 items-center">
          <Select onValueChange={(value) => setTime(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Delivery Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 min</SelectItem>
              <SelectItem value="30">30 min</SelectItem>
              <SelectItem value="45">45 min</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size={"icon"}
            onClick={resetTimeFilter}
            className="h-6 w-6 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <X className="text-black" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal) => (
          <Card key={meal._id} className="overflow-hidden p-0">
            <Image
              src={meal.images[0] || "/biryani.jpg"}
              alt={meal.name}
              width={400}
              height={160}
              className="w-full h-40 object-cover"
              onClick={() => router.push(`/menu/${meal._id}`)}
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">{meal.name}</h3>
              <p className="text-sm text-gray-600">{meal.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">₹{meal.price}</span>
                <span
                  className={
                    meal.category === "vegetarian"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {meal.category}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {meal.quantity} available • {meal.preparationTime} prep time
              </p>
              <div className="flex mt-2">
                {[...Array(meal.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500" />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  className="mt-4 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
                  onClick={() => handleAddToCart(meal)}
                >
                  Add to cart
                </Button>

                <Button
                  size={"icon"}
                  className="bg-gray-200 border border-gray-300 shadow-md hover:bg-gray-300"
                  onClick={() => router.push(`/menu/${meal._id}`)}
                >
                  <ExternalLink size={24} className="text-black" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
