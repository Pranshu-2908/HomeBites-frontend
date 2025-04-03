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
  const getStatusBadgeClass = (status: string) => {
    if (status === "Pending") return "bg-yellow-400 text-black";
    if (status === "Accepted") return "bg-blue-500 text-white";
    return "bg-orange-500 text-white";
  };

  return (
    <div className="p-2 md:p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Live Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop View */}
          <div className="hidden xl:block overflow-x-auto">
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
                      <Badge className={getStatusBadgeClass(order.status)}>
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
          </div>

          {/* Mobile View and tablet view */}
          <div className="xl:hidden space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4 border shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-medium">{order.id}</div>
                  <Badge className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">{order.customer}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-bold">₹{order.totalPrice}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-gray-500 mb-1">Items:</div>
                    {order.meals.map((meal, index) => (
                      <div key={index} className="flex justify-between py-1">
                        <span>{meal.name}</span>
                        <span>
                          {meal.quantity}x (₹{meal.price})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {order.status === "Pending" && (
                    <Button variant="outline" size="sm">
                      Accept
                    </Button>
                  )}
                  {order.status !== "In Progress" && (
                    <Button variant="outline" size="sm">
                      Mark In Progress
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
