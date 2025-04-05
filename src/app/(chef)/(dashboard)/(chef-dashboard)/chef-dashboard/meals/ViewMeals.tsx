"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchChefMeals } from "@/redux/slices/mealSlice";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ViewMeals() {
  const router = useRouter();
  const { chefMeals } = useAppSelector((store: RootState) => store.meal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChefMeals());
  }, [dispatch]);

  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const toggleMealDetails = (id: string) => {
    setExpandedMeal(expandedMeal === id ? null : id);
  };

  return (
    <div className="w-full">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            My Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop view */}
          <div className="hidden xl:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Category</TableHead>
                  <TableHead className="text-center">Cuisine</TableHead>
                  <TableHead className="text-center">Price (₹)</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Prep Time (min)</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chefMeals.map((meal) => (
                  <TableRow key={meal._id}>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell className="text-center">
                      {meal.category}
                    </TableCell>
                    <TableCell className="text-center">
                      {meal.cuisine}
                    </TableCell>
                    <TableCell className="text-center">₹{meal.price}</TableCell>
                    <TableCell className="text-center">
                      {meal.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {meal.preparationTime} min
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => {
                          console.log(`/chef-dashboard/meals/${meal._id}`);
                          router.push(`/chef-dashboard/meals/${meal._id}`);
                        }}
                      >
                        <Edit2 className="text-black w-6 h-6 animate-pulse" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="text-black w-6 h-6 animate-pulse" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile view and tablet view */}
          <div className="xl:hidden space-y-4">
            {chefMeals.map((meal) => (
              <Card key={meal._id} className="overflow-hidden">
                <div
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMealDetails(meal._id)}
                >
                  <h3 className="font-medium">{meal.name}</h3>
                  <span>₹{meal.price}</span>
                </div>

                {expandedMeal === meal._id && (
                  <div className="p-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold">Category:</p>
                        <p>{meal.category}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Cuisine:</p>
                        <p>{meal.cuisine}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Quantity:</p>
                        <p>{meal.quantity}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Prep Time:</p>
                        <p>{meal.preparationTime} min</p>
                      </div>
                    </div>

                    <div className="pt-2 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          router.push(`/chef-dashboard/meals/${meal._id}`)
                        }
                      >
                        <Edit2 className="text-black w-6 h-6 animate-pulse" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                      >
                        <Trash2 className="text-black w-6 h-6 animate-pulse" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
