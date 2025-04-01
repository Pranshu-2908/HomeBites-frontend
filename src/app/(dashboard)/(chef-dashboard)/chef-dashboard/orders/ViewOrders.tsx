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
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "ORD001",
    customer: "Rahul Sharma",
    meals: [
      { name: "Paneer Butter Masala", quantity: 2, price: 500 },
      { name: "Garlic Naan", quantity: 3, price: 120 },
    ],
    totalPrice: 620,
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Aisha Khan",
    meals: [{ name: "Chicken Biryani", quantity: 1, price: 350 }],
    totalPrice: 350,
    status: "Accepted",
  },
  {
    id: "ORD003",
    customer: "John Doe",
    meals: [
      { name: "Vegan Buddha Bowl", quantity: 3, price: 600 },
      { name: "Green Smoothie", quantity: 1, price: 150 },
    ],
    totalPrice: 750,
    status: "In Progress",
  },
];

export default function ViewOrders() {
  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Live Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="text-center">Customer</TableHead>
                <TableHead className="text-center">Meals</TableHead>
                <TableHead className="text-center">Total Price (₹)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell className="text-center">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.meals.map((meal, index) => (
                      <div key={index}>
                        {meal.name} - {meal.quantity}x (₹{meal.price})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    ₹{order.totalPrice}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        order.status === "Pending"
                          ? "bg-yellow-400 text-black"
                          : order.status === "Accepted"
                          ? "bg-blue-500 text-white"
                          : "bg-orange-500 text-white"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.status === "Pending" && (
                      <Button variant="outline" size="sm" className="mr-2">
                        Accept
                      </Button>
                    )}
                    {order.status !== "In Progress" && (
                      <Button variant="outline" size="sm">
                        Mark In Progress
                      </Button>
                    )}
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
