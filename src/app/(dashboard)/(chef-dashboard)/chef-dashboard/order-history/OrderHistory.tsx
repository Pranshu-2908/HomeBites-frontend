"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const completedOrders = [
  {
    id: "ORD004",
    customer: "Sneha Kapoor",
    meals: [
      { name: "Paneer Butter Masala", quantity: 2, price: 500 },
      { name: "Garlic Naan", quantity: 2, price: 80 },
    ],
    totalPrice: 580,
    deliveryTime: "12:45 PM",
  },
  {
    id: "ORD005",
    customer: "Arjun Verma",
    meals: [
      { name: "Chicken Biryani", quantity: 1, price: 350 },
      { name: "Raita", quantity: 1, price: 50 },
    ],
    totalPrice: 400,
    deliveryTime: "1:30 PM",
  },
  {
    id: "ORD006",
    customer: "Emma Watson",
    meals: [{ name: "Vegan Buddha Bowl", quantity: 3, price: 600 }],
    totalPrice: 600,
    deliveryTime: "2:15 PM",
  },
];

export default function OrderHistory() {
  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Completed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="text-center">Customer</TableHead>
                <TableHead className="text-center">Meal</TableHead>
                <TableHead className="text-center">Total Price (₹)</TableHead>
                <TableHead className="text-center">Delivery Time</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell className="text-center">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.meals.map((meal, index) => (
                      <div key={index}>
                        🍽 {meal.name} - {meal.quantity}x (₹{meal.price})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    ₹{order.totalPrice}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.deliveryTime}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-500 text-white">Completed</Badge>
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
