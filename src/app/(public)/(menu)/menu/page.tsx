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
import { ExternalLink, Loader2, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchMeals } from "@/redux/slices/mealSlice";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cartSlice";
import { motion } from "framer-motion";
import { getDistance } from "geolib";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/utils/formatTime";

export default function MenuPage() {
  const { meals, loading, error } = useAppSelector(
    (store: RootState) => store.meal
  );

  const { items } = useAppSelector((store: RootState) => store.cart);
  const { user } = useAppSelector((store: RootState) => store.auth);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [chefName, setchefName] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);
  const [addingMealId, setAddingMealId] = useState<string | null>(null);

  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(search.toLowerCase()) &&
      meal.chefId.name.toLowerCase().includes(chefName.toLowerCase()) &&
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

  const handleAddToCart = async (
    mealId: string,
    quantity: number,
    chefId: string
  ) => {
    setAddingMealId(mealId);
    if (!user) {
      toast("Login to add items in cart!");
      return;
    }
    if (items.length > 0 && items[0].chefId !== chefId) {
      toast.error("You can only add meals from the same chef to the cart.");
      setAddingMealId(null);
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
  const userCoordinates = user?.address?.coordinates
    ? {
        latitude: user.address.coordinates.lat,
        longitude: user.address.coordinates.lng,
      }
    : null;

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!meals) {
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 bg-gray-100 p-4 mx-4 rounded-lg md:sticky md:top-19 z-10">
        <Input
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Input
          placeholder="Enter chef name..."
          value={chefName}
          onChange={(e) => setchefName(e.target.value)}
          className="w-full md:w-1/4"
        />
        <Input
          placeholder="Enter Cuisine..."
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full md:w-1/4"
        />
        <div className="flex justify-between md:justify-center gap-6">
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
              className="h-6 w-6 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              <X className="text-black" />
            </Button>
          </div>
          <div className="flex gap-1 items-center">
            <Select onValueChange={(value) => setTime(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Preparation Time" />
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
              className="h-6 w-6 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
            >
              <X className="text-black" />
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner message="Loading Meals..." />
      ) : user ? (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal, index) => {
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

            if (distanceInKm !== null && distanceInKm <= maxDistanceKm) {
              return (
                <motion.div
                  key={meal._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden p-0 m-2 md:m-0">
                    <Image
                      src={meal.images[0] || "/biryani.jpg"}
                      alt={meal.name}
                      width={400}
                      height={250}
                      className="w-full h-60 object-cover cursor-pointer"
                      onClick={() => router.push(`/menu/${meal._id}`)}
                    />
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold">{meal.name}</h3>
                        <h3 className="text-md italic">
                          - by {meal.chefId.name}
                        </h3>
                      </div>
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
                        {meal.quantity} available • {meal.preparationTime} prep
                        time
                      </p>
                      <p className="text-sm text-gray-500">
                        Distance: {distanceInKm?.toFixed(2) ?? 0} km
                      </p>
                      <div className="flex items-center mt-2 gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-blue-800/50 text-white w-fit transition duration-300 hover:scale-105">
                        <Star
                          className="text-yellow-400 w-4 h-4 drop-shadow-sm"
                          strokeWidth="3"
                        />
                        <p className="font-semibold text-sm tracking-wide">
                          {meal.averageRating}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {!available ? (
                          <Badge className="bg-rose-400  rounded-md px-4 py-2 text-sm text-black cursor-default">
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
                            className=" bg-blue-900 text-white px-4 rounded-md hover:bg-blue-950 cursor-pointer"
                            onClick={() =>
                              handleAddToCart(meal._id, 1, meal.chefId._id)
                            }
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

                        <Button
                          size={"icon"}
                          className="bg-gray-200 border border-gray-300 shadow-md hover:bg-gray-300 cursor-pointer"
                          onClick={() => router.push(`/menu/${meal._id}`)}
                        >
                          <ExternalLink size={24} className="text-black " />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }
          })}
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="overflow-hidden p-0 m-2 md:m-0">
                <Image
                  src={meal.images[0] || "/biryani.jpg"}
                  alt={meal.name}
                  width={400}
                  height={250}
                  className="w-full h-60 object-cover cursor-pointer"
                  onClick={() => router.push(`/menu/${meal._id}`)}
                />
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{meal.name}</h3>
                    <h3 className="text-md italic">- by {meal.chefId.name}</h3>
                  </div>
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
                  <div className="flex items-center mt-2 gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-blue-800/50 text-white w-fit transition duration-300 hover:scale-105">
                    <Star
                      className="text-yellow-400 w-4 h-4 drop-shadow-sm"
                      strokeWidth="3"
                    />
                    <p className="font-semibold text-sm tracking-wide">
                      {meal.averageRating}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Button
                      className=" bg-blue-900 text-white px-4 rounded-md hover:bg-blue-950 cursor-pointer"
                      onClick={() =>
                        handleAddToCart(meal._id, 1, meal.chefId._id)
                      }
                    >
                      Add to cart
                    </Button>

                    <Button
                      size={"icon"}
                      className="bg-gray-200 border border-gray-300 shadow-md hover:bg-gray-300 cursor-pointer"
                      onClick={() => router.push(`/menu/${meal._id}`)}
                    >
                      <ExternalLink size={24} className="text-black " />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
