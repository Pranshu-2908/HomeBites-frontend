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
  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-center">My Meals</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <TableCell className="text-center">{meal.category}</TableCell>
                  <TableCell className="text-center">{meal.cuisine}</TableCell>
                  <TableCell className="text-center">₹{meal.price}</TableCell>
                  <TableCell className="text-center">{meal.quantity}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
}
