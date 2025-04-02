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
import { useState } from "react";

const meals = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    description: "Creamy tomato-based paneer dish",
    price: 250,
    category: "Vegetarian",
    cuisine: "Indian",
    quantity: 10,
    prepTime: 30,
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Spicy rice dish with tender chicken",
    price: 350,
    category: "Non-Vegetarian",
    cuisine: "Indian",
    quantity: 5,
    prepTime: 45,
  },
  {
    id: "3",
    name: "Vegan Buddha Bowl",
    description: "Healthy mixed grains with fresh veggies",
    price: 200,
    category: "Vegan",
    cuisine: "Continental",
    quantity: 8,
    prepTime: 25,
  },
];

export default function ViewMeals() {
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
                {meals.map((meal) => (
                  <TableRow key={meal.id}>
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
                      {meal.prepTime} min
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
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
            {meals.map((meal) => (
              <Card key={meal.id} className="overflow-hidden">
                <div
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMealDetails(meal.id)}
                >
                  <h3 className="font-medium">{meal.name}</h3>
                  <span>₹{meal.price}</span>
                </div>

                {expandedMeal === meal.id && (
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
                        <p>{meal.prepTime} min</p>
                      </div>
                    </div>

                    <div className="pt-2 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                      >
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
