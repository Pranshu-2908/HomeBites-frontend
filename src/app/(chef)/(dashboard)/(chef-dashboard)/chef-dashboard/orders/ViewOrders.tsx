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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import {
  fetchChefOrdersByStatus,
  updateOrderStatus,
} from "@/redux/slices/orderSlice";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ViewOrders() {
  const { pendingOrders, acceptedOrders, preparingOrders, loading } =
    useAppSelector((store: RootState) => store.order);
  const orders = [...pendingOrders, ...acceptedOrders, ...preparingOrders];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchChefOrdersByStatus());
  }, [dispatch]);

  const getStatusBadgeClass = (status: string) => {
    if (status === "pending") return "bg-yellow-400 text-black";
    if (status === "accepted") return "bg-blue-500 text-white";
    return "bg-orange-500 text-white";
  };

  const handleAccept = async (orderId: string) => {
    await dispatch(updateOrderStatus({ orderId, status: "accepted" }));
    await dispatch(fetchChefOrdersByStatus());
  };
  const handlePreparing = async (orderId: string) => {
    await dispatch(updateOrderStatus({ orderId, status: "preparing" }));
    await dispatch(fetchChefOrdersByStatus());
  };
  const handleCompleted = async (orderId: string) => {
    await dispatch(updateOrderStatus({ orderId, status: "completed" }));
    await dispatch(fetchChefOrdersByStatus());
  };
  const handleReject = async (orderId: string) => {
    await dispatch(updateOrderStatus({ orderId, status: "rejected" }));
    await dispatch(fetchChefOrdersByStatus());
  };
  if (loading) return <LoadingSpinner message="Loading live orders...." />;
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
                    <TableCell className="text-center">
                      <Badge className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {order.status === "pending" && (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAccept(order._id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(order._id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {order.status === "accepted" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreparing(order._id)}
                        >
                          Mark in Progress
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCompleted(order._id)}
                        >
                          Mark as Completed
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
              <Card key={order._id} className="p-4 border shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-medium">{order._id}</div>
                  <Badge className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="flex flex-col gap-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">
                      {order.customerId?.name}
                    </span>
                  </div>

                  <div className="pt-2 border-y">
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

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {order.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAccept(order._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(order._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {order.status === "accepted" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreparing(order._id)}
                    >
                      Mark in Progress
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCompleted(order._id)}
                    >
                      Mark as completed
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
