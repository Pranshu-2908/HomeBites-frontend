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
import { useEffect, useState } from "react";
import { fetchChefOrdersByStatus } from "@/redux/slices/orderSlice";
import { RootState } from "@/redux/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import Pagination from "@/components/Pagination";

const MotionTr = motion(TableRow);

export default function OrderHistory() {
  const { completedOrders, cancelledOrders, rejectedOrders, loading, error } =
    useAppSelector((store: RootState) => store.order);
  const orders = [...completedOrders, ...cancelledOrders, ...rejectedOrders];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-2 md:p-6"
    >
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Completed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Large screen only*/}
          {orders.length > 0 ? (
            <div className="hidden xl:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="text-center">Customer</TableHead>
                    <TableHead className="text-center">Meal</TableHead>
                    <TableHead className="text-center">
                      Total Price (₹)
                    </TableHead>
                    <TableHead className="text-center">
                      Order Date & Time
                    </TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order, ind) => (
                    <MotionTr
                      key={order._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: ind * 0.1 }}
                    >
                      <TableCell>{order._id}</TableCell>
                      <TableCell className="text-center">
                        {order.customerId?.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.meals.map((meal, index) => (
                          <div key={index}>
                            {meal.mealId?.name ?? "Not available"} -{" "}
                            {meal.quantity}x (₹
                            {meal.mealId?.price ?? "Not available"})
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="text-center">
                        ₹{order.totalAmount}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(order?.createdAt || "").toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            getStatusBadgeClass(order.status) + "cursor-default"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </MotionTr>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            <div>No Order History available</div>
          )}

          {/* Mobile card and tablet view */}
          <div className="xl:hidden space-y-4">
            {paginatedOrders.map((order) => (
              <Card key={order._id} className="p-4 border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="hidden sm:inline font-medium">
                    {order._id}
                  </div>
                  <Badge
                    className={
                      getStatusBadgeClass(order.status) + "cursor-default"
                    }
                  >
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
                        <span>{meal.mealId?.name ?? "Not available"}</span>
                        <span>
                          {meal.quantity}x (₹
                          {meal.mealId?.price ?? "Not available"})
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
