"use client";

import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchPastMeals } from "@/redux/slices/mealSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PastMealsSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pastMeals } = useAppSelector((state: RootState) => state.meal);

  useEffect(() => {
    dispatch(fetchPastMeals());
  }, [dispatch]);

  if (!pastMeals.length) return null;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-xl font-semibold mb-4 px-2 md:px-4 text-center md:text-left">
        Reorder Your Favorite Meals
      </h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {pastMeals.map((meal) => (
            <CarouselItem
              key={meal._id}
              className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card
                className="hover:shadow-lg p-0 transition cursor-pointer"
                onClick={() => router.push(`/menu/${meal._id}`)}
              >
                <CardContent className="p-0">
                  <Image
                    src={meal.images?.[0] || "/biryani.jpg"}
                    alt={meal.name}
                    width={400}
                    height={300}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PastMealsSlider;
