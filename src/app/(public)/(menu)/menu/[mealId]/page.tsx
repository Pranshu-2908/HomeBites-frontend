"use client";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
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
import { formatTime } from "@/utils/formatTime";
import { getDistance } from "geolib";
import { Badge } from "@/components/ui/badge";

export default function MealDetailsPage() {
  const { mealId } = useParams() as { mealId: string };
  const { user } = useAppSelector((store: RootState) => store.auth);
  const { reviews, chefAverageRating } = useAppSelector(
    (store: RootState) => store.review
  );
  const { selectedMeal, loading, error } = useAppSelector(
    (store: RootState) => store.meal
  );
  const [addingMealId, setAddingMealId] = useState<string | null>(null);

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
    setAddingMealId(mealId);
    if (!user) {
      toast.error("Login to add items in cart!");
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
    setAddingMealId(null);
  };
  const chefLocation = selectedMeal.chefId?.address?.coordinates;
  const userCoordinates = user?.address?.coordinates
    ? {
        latitude: user.address.coordinates.lat,
        longitude: user.address.coordinates.lng,
      }
    : null;
  let distanceInKm = null;
  if (
    userCoordinates?.latitude &&
    userCoordinates?.longitude &&
    chefLocation?.lat &&
    chefLocation?.lng
  ) {
    const chefCoordinates = {
      latitude: chefLocation.lat,
      longitude: chefLocation.lng,
    };
    const distance = getDistance(userCoordinates, chefCoordinates); // in meters
    distanceInKm = distance / 1000;
  }
  const maxDistanceKm = 20;
  if (loading) return <LoadingSpinner message="Loading meal..." />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedMeal) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }
  const isChefAvailable = (
    startHour: number,
    startMin: number,
    endHour: number,
    endMin: number
  ): boolean => {
    const now = new Date();

    const startTime = new Date(now);
    startTime.setHours(startHour, startMin, 0, 0);

    const endTime = new Date(now);
    endTime.setHours(endHour, endMin, 0, 0);
    console.log("Now:", now);
    console.log("startTime:", startTime);
    console.log("endTime:", endTime);
    return now >= startTime && now <= endTime;
  };
  const available = isChefAvailable(
    selectedMeal.chefId?.workingHours?.startHour ?? 0,
    selectedMeal.chefId?.workingHours?.startMinute ?? 0,
    selectedMeal.chefId?.workingHours?.endHour ?? 0,
    selectedMeal.chefId?.workingHours?.endMinute ?? 0
  );
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="overflow-hidden p-0 gap-0">
          <div className="flex flex-col gap-6 p-5">
            <div className="flex flex-col md:flex-row gap-4">
              <Image
                src={selectedMeal.images?.[0] || "/biryani.jpg"}
                alt={selectedMeal?.name || "Meal Image"}
                width={500}
                height={256}
                className="basis-1/2 w-fit h-72 object-cover rounded-lg mx-auto"
              />
              <div className="basis-1/2 p-4">
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
                {distanceInKm !== null && distanceInKm >= maxDistanceKm ? (
                  <Badge className="bg-rose-600 text-white rounded-md px-4 py-2 text-sm mt-4 w-full cursor-default">
                    Unable to deliver to your location
                  </Badge>
                ) : !available ? (
                  <Badge className="bg-rose-400  rounded-md px-4 py-2 text-sm text-black w-full mt-4 cursor-default">
                    Available from{" "}
                    {formatTime(
                      selectedMeal.chefId?.workingHours?.startHour ?? 0,
                      selectedMeal.chefId?.workingHours?.startMinute ?? 0
                    )}{" "}
                    to{" "}
                    {formatTime(
                      selectedMeal.chefId?.workingHours?.endHour ?? 0,
                      selectedMeal.chefId?.workingHours?.endMinute ?? 0
                    )}
                  </Badge>
                ) : (
                  <Button
                    className="mt-4 bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 w-full cursor-pointer"
                    onClick={() => handleAddToCart(selectedMeal._id, 1)}
                  >
                    {addingMealId === selectedMeal._id ? (
                      <div className="flex gap-2">
                        <Loader2 className="animate-spin" /> Adding...
                      </div>
                    ) : (
                      <p>Add to Cart</p>
                    )}
                  </Button>
                )}
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col justify-between">
                <div className="text-lg">
                  <h2 className="text-xl font-bold mb-4">Chef Information</h2>
                  <p className="text-gray-600">
                    👨‍🍳 <span className="font-bold">Name :</span>{" "}
                    {selectedMeal?.chefId?.name}
                  </p>
                  <p className="text-gray-600">
                    ⭐ <span className="font-bold">Rating :</span>{" "}
                    <span className="font-bold text-black">
                      {chefAverageRating}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    📅 <span className="font-bold">Bio :</span>{" "}
                    {selectedMeal.chefId?.bio}
                  </p>
                  <p className="text-gray-600">
                    📍<span className="font-bold">Address :</span>{" "}
                    {selectedMeal.chefId?.address?.city},{" "}
                    {selectedMeal.chefId?.address?.state}
                  </p>
                  <p className="text-gray-600">
                    🕒 <span className="font-bold">Working Hours :</span> From{" "}
                    {formatTime(
                      selectedMeal.chefId?.workingHours?.startHour ?? 0,
                      selectedMeal.chefId?.workingHours?.startMinute ?? 0
                    )}{" "}
                    to{" "}
                    {formatTime(
                      selectedMeal.chefId?.workingHours?.endHour ?? 0,
                      selectedMeal.chefId?.workingHours?.endMinute ?? 0
                    )}
                  </p>
                </div>
              </div>
              <Image
                src={selectedMeal.chefId?.profilePicture || "/profile.jpg"}
                alt={selectedMeal.chefId?.profilePicture || "chef Image"}
                width={200}
                height={200}
                className="w-35 h-40 object-fit"
              />
            </div>
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
        {reviews.length > 0 ? (
          <Carousel className="mt-4 w-full ">
            <CarouselContent className="flex">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="w-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full flex"
                  >
                    <Card className="border rounded-lg p-4 flex flex-col justify-between w-full">
                      <CardContent className="flex flex-col gap-2 w-full overflow-hidden flex-grow">
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
                        <p className="text-gray-700 mt-1 ml-4 flex-grow">
                          “
                          {review.comment && review.comment.length < 50
                            ? review.comment
                            : review.comment.slice(0, 50) + "..."}
                          ”
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:inline" />
            <CarouselNext className="hidden lg:inline" />
          </Carousel>
        ) : (
          <div className="text-center">Not yet Reviewed</div>
        )}
      </motion.div>
    </div>
  );
}
