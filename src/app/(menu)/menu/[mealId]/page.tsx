"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
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
export default function MealDetailsPage() {
  const { mealId } = useParams();
  const meal = meals.find((m) => m.id.toString() === mealId);

  if (!meal) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <CardContent className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{meal.name}</h1>
              <p className="text-gray-600 mt-2">{meal.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-semibold">₹{meal.price}</span>
                <span
                  className={
                    meal.type === "vegetarian"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {meal.type === "vegetarian" ? "🌱 Veg" : "🍗 Non-Veg"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {meal.quantity} available • {meal.prepTime} prep time
              </p>
              <div className="flex mt-2">
                {[...Array(meal.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500" />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Chef Information</h2>
              <p className="text-gray-600">👨‍🍳 Chef: John Doe</p>
              <p className="text-gray-600">📅 Experience: 10+ years</p>
              <p className="text-gray-600">📍 Location: Mumbai</p>
            </div>

            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Add to cart
            </button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
