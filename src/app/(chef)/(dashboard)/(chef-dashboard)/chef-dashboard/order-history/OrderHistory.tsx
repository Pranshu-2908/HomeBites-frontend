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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchChefOrdersByStatus } from "@/redux/slices/orderSlice";
import { RootState } from "@/redux/store";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function OrderHistory() {
  const { completedOrders, cancelledOrders, rejectedOrders, loading, error } =
    useAppSelector((store: RootState) => store.order);
  const orders = [...completedOrders, ...cancelledOrders, ...rejectedOrders];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchChefOrdersByStatus());
  }, [dispatch]);
  if (loading) return <LoadingSpinner message="Loading order history..." />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!completedOrders) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }
  const getStatusBadgeClass = (status: string) => {
    if (status === "completed") return "bg-green-400 text-black";
    if (status === "cancelled") return "bg-orange-500 text-white";
    if (status === "rejected") return "bg-red-500 text-black";
    return "bg-orange-500 text-white";
  };
  return (
    <div className="p-2 md:p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Completed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Large screen only*/}
          <div className="hidden xl:block overflow-x-auto">
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
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell className="text-center">
                      {order.customerId?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.meals.map((meal, index) => (
                        <div key={index}>
                          {meal.mealId?.name} - {meal.quantity}x (₹
                          {meal.mealId?.price})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="text-center">
                      ₹{order.totalAmount}
                    </TableCell>
                    <TableCell className="text-center">N/A</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile card and tablet view */}
          <div className="xl:hidden space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="p-4 border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{order._id}</div>
                  <Badge className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">
                      {order.customerId?.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivered:</span>
                    <span>N/A</span>
                  </div>
                  <div className="py-2 border-t border-b">
                    <div className="text-gray-500 mb-1">Items:</div>
                    {order.meals.map((meal, index) => (
                      <div key={index} className="flex justify-between py-1">
                        <span>{meal.mealId?.name}</span>
                        <span>
                          {meal.quantity}x (₹{meal.mealId?.price})
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-bold">₹{order.totalAmount}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
