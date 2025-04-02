"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const meals = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    description: "Rich and creamy paneer dish with Indian spices.",
    price: 250,
    image: "/paneer.jpg",
    type: "vegetarian",
    quantity: 10,
    prepTime: "30 min",
    cuisine: "Indian",
    rating: 4,
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with chicken and spices.",
    price: 350,
    image: "/biryani.jpg",
    type: "non-vegetarian",
    quantity: 8,
    prepTime: "45 min",
    cuisine: "Indian",
    rating: 5,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes, basil, and mozzarella.",
    price: 300,
    image: "/pizza.jpg",
    type: "vegetarian",
    quantity: 12,
    prepTime: "25 min",
    cuisine: "Italian",
    rating: 4,
  },
  {
    id: 4,
    name: "Sushi Platter",
    description: "Assorted sushi rolls with soy sauce and wasabi.",
    price: 500,
    image: "/sushi.jpeg",
    type: "non-vegetarian",
    quantity: 6,
    prepTime: "40 min",
    cuisine: "Japanese",
    rating: 5,
  },
  {
    id: 5,
    name: "Vegan Salad Bowl",
    description: "Healthy bowl with fresh veggies, nuts, and dressing.",
    price: 200,
    image: "/salad.jpg",
    type: "vegan",
    quantity: 15,
    prepTime: "15 min",
    cuisine: "Continental",
    rating: 4,
  },
];

export default function MenuPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");

  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(search.toLowerCase()) &&
      (cuisine === "" ||
        meal.cuisine.toLowerCase().includes(cuisine.toLowerCase())) &&
      (type === "" || meal.type.toLowerCase().startsWith(type.toLowerCase())) &&
      (time === "" || parseInt(meal.prepTime) <= parseInt(time))
  );
  const resetTypeFilter = () => {
    setType("");
  };
  const resetTimeFilter = () => {
    setTime("");
  };
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
          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Veg</SelectItem>
              <SelectItem value="non-vegetarian">Non-Veg</SelectItem>
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
          <Card
            key={meal.id}
            className="overflow-hidden p-0"
            onClick={() => router.push(`/menu/${meal.id}`)}
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">{meal.name}</h3>
              <p className="text-sm text-gray-600">{meal.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">₹{meal.price}</span>
                <span
                  className={
                    meal.type === "vegetarian"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {meal.type}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {meal.quantity} available • {meal.prepTime} prep time
              </p>
              <div className="flex mt-2">
                {[...Array(meal.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500" />
                ))}
              </div>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Add to cart
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
