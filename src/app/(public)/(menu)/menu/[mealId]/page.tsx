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
import {
  getChefAverageRating,
  getMealAverageRating,
  getMealReviews,
} from "@/redux/slices/reviewSlice";
import { motion } from "framer-motion";

export default function MealDetailsPage() {
  const { mealId } = useParams() as { mealId: string };
  const { user } = useAppSelector((store: RootState) => store.auth);
  const { reviews, chefAverageRating } = useAppSelector(
    (store: RootState) => store.review
  );
  const { selectedMeal, loading, error } = useAppSelector(
    (store: RootState) => store.meal
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!mealId) return;
    dispatch(fetchMealById(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    dispatch(getMealReviews(mealId));
    dispatch(getMealAverageRating(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    dispatch(getChefAverageRating(selectedMeal?.chefId?._id));
  }, [dispatch, selectedMeal?.chefId?._id]);
  const handleAddToCart = async (mealId: string, quantity: number) => {
    if (!user) {
      toast("Login to add items in cart!");
      return;
    }
    const res = await dispatch(
      addToCart({
        mealId: mealId,
        quantity,
      })
    );
    if (addToCart.fulfilled.match(res)) {
      toast.success("Meal added to cart");
    } else {
      toast.error("Failed to add meal to cart");
    }
  };
  if (loading) return <LoadingSpinner message="Loading meal..." />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedMeal) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
            <Image
              src={selectedMeal.images?.[0] || "/biryani.jpg"}
              alt={selectedMeal?.name || "Meal Image"}
              width={500}
              height={256}
              className="w-auto h-64 object-cover rounded-lg mx-auto"
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
                <div className="flex items-center mt-4 gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-blue-800/50 text-white w-fit transition duration-300 hover:scale-105">
                  <Star
                    className="text-yellow-400 w-6 h-6 drop-shadow-sm"
                    strokeWidth="3"
                  />
                  <p className="font-semibold text-lg tracking-wide">
                    {selectedMeal.averageRating}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold">Chef Information</h2>
                <p className="text-gray-600">
                  👨‍🍳 Chef : {selectedMeal?.chefId?.name}
                </p>
                <p className="text-gray-600">
                  👨‍🍳 Chef rating :{" "}
                  <span className="font-bold text-black">
                    {chefAverageRating}
                  </span>
                </p>
                <p className="text-gray-600">
                  📅 bio : {selectedMeal.chefId?.bio}
                </p>
                <p className="text-gray-600">
                  📍 Location : {selectedMeal.chefId?.location}
                </p>
                <p className="text-gray-600">
                  📍 Working Hours : From{" "}
                  {selectedMeal.chefId?.workingHours?.startHour}:
                  {selectedMeal.chefId?.workingHours?.startMinute} to{" "}
                  {selectedMeal.chefId?.workingHours?.endHour}:
                  {selectedMeal.chefId?.workingHours?.endMinute}
                </p>
              </div>

              <Button
                className="mt-4 bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700"
                onClick={() => handleAddToCart(selectedMeal._id, 1)}
              >
                Add to cart
              </Button>
            </CardContent>
          </div>
        </Card>
      </motion.div>
      <h2 className="text-xl font-semibold mt-8">Customer Reviews</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <Carousel className="mt-4 w-full">
          <CarouselContent className="flex">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="basis-full sm:basis-1/2 lg:basis-1/3 p-2"
              >
                <CarouselItem key={index}>
                  <Card className="border rounded-lg ml-2 p-4">
                    <CardContent className="flex flex-col gap-2">
                      <div className="flex gap-2 justify-start">
                        <Image
                          src={`${review.customerId?.profilePicture}`}
                          alt={`${review.customerId?.name}`}
                          height={48}
                          width={48}
                          sizes="icon"
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <h3 className="font-bold text-xl">
                            {review.customerId?.name}
                          </h3>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-6 h-6 text-yellow-500 animate-pulse"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-1 ml-4">
                        “{review.comment}”
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </motion.div>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:inline" />
          <CarouselNext className="hidden lg:inline" />
        </Carousel>
      </motion.div>
    </div>
  );
}
