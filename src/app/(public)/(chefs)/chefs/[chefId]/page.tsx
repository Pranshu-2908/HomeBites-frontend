"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getChefMealsById } from "@/redux/slices/mealSlice";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cartSlice";
import { Loader2, Star } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { getDistance } from "geolib";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/utils/formatTime";

export default function ChefDetailsPage() {
  const dispatch = useAppDispatch();
  const { chefId } = useParams() as { chefId: string };
  const { user } = useAppSelector((store: RootState) => store.auth);
  const { chefMealsById, loading } = useAppSelector(
    (store: RootState) => store.meal
  );
  const [addingMealId, setAddingMealId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getChefMealsById(chefId));
  }, [chefId, dispatch]);
  const userCoordinates = user?.address?.coordinates
    ? {
        latitude: user.address.coordinates.lat,
        longitude: user.address.coordinates.lng,
      }
    : null;
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
  if (loading) return <LoadingSpinner message="Loading meals" />;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="space-y-4">
        {chefMealsById.map((meal, index) => {
          const chefLocation = meal.chefId.address?.coordinates;

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
            const distance = getDistance(userCoordinates, chefCoordinates);
            distanceInKm = distance / 1000;
          }
          const maxDistanceKm = 20;
          const available = isChefAvailable(
            meal.chefId.workingHours?.startHour ?? 0,
            meal.chefId.workingHours?.startMinute ?? 0,
            meal.chefId.workingHours?.endHour ?? 0,
            meal.chefId.workingHours?.endMinute ?? 0
          );
          return (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                key={meal._id}
                className="flex flex-row items-center space-x-4 p-4 shadow-md"
              >
                <div className="basis-1/3 ">
                  <Image
                    src={meal.images[0]}
                    alt={meal.name}
                    width={500}
                    height={500}
                    className="w-full h-60 rounded-md object-cover"
                  />
                </div>
                <div className="basis-2/3 flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{meal.name}</h1>
                  <p className="text-gray-600">{meal.description}</p>
                  <div className="flex items-center justify-between">
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
                  <p className="text-sm text-gray-500">
                    {meal.quantity} available • {meal.preparationTime} prep time
                  </p>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-blue-800/50 text-white w-fit transition duration-300 hover:scale-105">
                    <Star
                      className="text-yellow-400 w-4 h-4 drop-shadow-sm"
                      strokeWidth="3"
                    />
                    <p className="font-semibold text-md tracking-wide">
                      {meal.averageRating}
                    </p>
                  </div>
                  {distanceInKm !== null && distanceInKm >= maxDistanceKm ? (
                    <Badge className="bg-rose-600 text-black rounded-md px-4 py-2 text-sm w-full cursor-default">
                      Unable to deliver to your location
                    </Badge>
                  ) : !available ? (
                    <Badge className="bg-rose-400  rounded-md px-4 py-2 text-sm text-black w-full cursor-default">
                      Available from{" "}
                      {formatTime(
                        meal.chefId?.workingHours?.startHour ?? 0,
                        meal.chefId?.workingHours?.startMinute ?? 0
                      )}{" "}
                      to{" "}
                      {formatTime(
                        meal.chefId?.workingHours?.endHour ?? 0,
                        meal.chefId?.workingHours?.endMinute ?? 0
                      )}
                    </Badge>
                  ) : (
                    <Button
                      className="mt-4 bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 w-full cursor-pointer"
                      onClick={() => handleAddToCart(meal._id, 1)}
                    >
                      {addingMealId === meal._id ? (
                        <div className="flex gap-2">
                          <Loader2 className="animate-spin" /> Adding...
                        </div>
                      ) : (
                        <p>Add to Cart</p>
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
