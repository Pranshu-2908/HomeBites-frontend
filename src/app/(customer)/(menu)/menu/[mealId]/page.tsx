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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchMealById } from "@/redux/slices/mealSlice";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/slices/cartSlice";
interface Meal {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
const reviews = [
  { id: 1, name: "Alice", text: "Absolutely delicious!", rating: 5 },
  { id: 2, name: "Bob", text: "Loved the flavors!", rating: 4 },
  { id: 3, name: "Charlie", text: "Would order again!", rating: 5 },
  { id: 4, name: "Dave", text: "Tasty and fresh.", rating: 4 },
  { id: 5, name: "Eve", text: "Great portion size!", rating: 5 },
];

export default function MealDetailsPage() {
  const { mealId } = useParams() as { mealId: string };
  const { user } = useAppSelector((store: RootState) => store.auth);
  const { selectedMeal, loading, error } = useAppSelector(
    (store: RootState) => store.meal
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!mealId) return;
    dispatch(fetchMealById(mealId));
  }, [dispatch, mealId]);

  const handleAddToCart = (meal: Meal) => {
    if (!user) {
      toast("Login to add items in cart!");
      return;
    }
    dispatch(
      addToCart({
        mealId: meal._id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
        availableQty: meal.quantity,
      })
    );
    toast.success("Meal added to cart");
  };
  if (loading) return <LoadingSpinner message="Loading meal..." />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedMeal) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <Image
            src={selectedMeal.images?.[0] || "/biryani.jpg"}
            alt={selectedMeal?.name || "Meal Image"}
            width={500}
            height={256}
            className="w-full h-64 object-cover rounded-lg"
          />
          <CardContent className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{selectedMeal.name}</h1>
              <p className="text-gray-600 mt-2">{selectedMeal.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-semibold">
                  ₹{selectedMeal.price}
                </span>
                <span
                  className={
                    selectedMeal.category === "vegetarian"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedMeal.category === "vegetarian"
                    ? "🌱 Veg"
                    : "🍗 Non-Veg"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {selectedMeal.quantity} available •{" "}
                {selectedMeal.preparationTime} prep time
              </p>
              <div className="flex mt-2">
                {[...Array(selectedMeal.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500" />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Chef Information</h2>
              <p className="text-gray-600">
                👨‍🍳 Chef: {selectedMeal?.chefId?.name}
              </p>
              <p className="text-gray-600">
                📅 bio: {selectedMeal.chefId?.bio}
              </p>
              <p className="text-gray-600">
                📍 Location: {selectedMeal.chefId?.location}
              </p>
              <p className="text-gray-600">
                📍 Working Hours: From{" "}
                {selectedMeal.chefId?.workingHours?.startHour}:
                {selectedMeal.chefId?.workingHours?.startMinute} to{" "}
                {selectedMeal.chefId?.workingHours?.endHour}:
                {selectedMeal.chefId?.workingHours?.endMinute}
              </p>
            </div>

            <Button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => handleAddToCart(selectedMeal)}
            >
              Add to cart
            </Button>
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
