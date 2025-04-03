"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const reviews = [
  { id: 1, name: "Alice", text: "Absolutely delicious!", rating: 5 },
  { id: 2, name: "Bob", text: "Loved the flavors!", rating: 4 },
  { id: 3, name: "Charlie", text: "Would order again!", rating: 5 },
  { id: 4, name: "Dave", text: "Tasty and fresh.", rating: 4 },
  { id: 5, name: "Eve", text: "Great portion size!", rating: 5 },
];

export default function MealDetailsPage() {
  const { meals } = useAppSelector((store: RootState) => store.meal);
  const { mealId } = useParams();
  const meal = meals.find((m) => m._id.toString() === mealId);

  if (!meal) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <img
            src="paneer.jpg"
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
                    meal.category === "vegetarian"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {meal.category === "vegetarian" ? "🌱 Veg" : "🍗 Non-Veg"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {meal.quantity} available • {meal.preparationTime} prep time
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

      <h2 className="text-xl font-semibold mt-8">Customer Reviews</h2>
      <Carousel className="mt-4 w-full">
        <CarouselContent className="flex">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 p-2"
            >
              <Card className="p-4 border rounded-lg ml-2">
                <h3 className="font-bold">{review.name}</h3>
                <p className="text-gray-600 mt-1">{review.text}</p>
                <div className="flex mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:inline" />
        <CarouselNext className="hidden lg:inline" />
      </Carousel>
    </div>
  );
}
