"use client";
import DashboardPage from "@/components/DashboardPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaStar,
  FaUtensils,
  FaCheckCircle,
  FaFire,
  FaMoneyBillWave,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const orderTrends = [
  { date: "Mar 25", orders: 15 },
  { date: "Mar 26", orders: 22 },
  { date: "Mar 27", orders: 30 },
  { date: "Mar 28", orders: 25 },
  { date: "Mar 29", orders: 40 },
];
const chefStats = {
  rating: 4.8,
  totalRatings: 120,
  totalMeals: 35,
  totalOrdersDelivered: 520,
  liveOrders: 5,
  revenue: 15200, // Assume this is in USD or INR
  mostPopularDish: "Spicy Paneer Wrap",
  pendingOrders: 3,
  avgPrepTime: 25, // in minutes
};

function Page() {
  const router = useRouter();
  return (
    <DashboardPage title="DASHBOARD" hideBackButton={true}>
      <div className="flex flex-col gap-8">
        <div className="bg-white shadow-md p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-lg font-bold mb-2">Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrends}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Rating */}
          <Card className="bg-yellow-100 border-yellow-300 shadow-2xl hover:scale-110 transition-all duration-500">
            <CardHeader className="flex items-center gap-2">
              <FaStar className="text-yellow-500 text-2xl" />
              <CardTitle>Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{chefStats.rating} ⭐</p>
              <p className="text-sm text-gray-600">
                ({chefStats.totalRatings} customers rated)
              </p>
            </CardContent>
          </Card>

          {/* Total Meals */}
          <Card
            className="bg-blue-100 border-blue-300 shadow-2xl hover:scale-110 transition-all duration-500"
            onClick={() => router.push("chef-dashboard/meals")}
          >
            <CardHeader className="flex items-center gap-2">
              <FaUtensils className="text-blue-500 text-2xl" />
              <CardTitle>Total Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{chefStats.totalMeals}</p>
            </CardContent>
          </Card>

          {/* Total Orders Delivered */}
          <Card
            className="bg-green-100 border-green-300 shadow-2xl hover:scale-110 transition-all duration-500"
            onClick={() => router.push("chef-dashboard/order-history")}
          >
            <CardHeader className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-2xl" />
              <CardTitle>Orders Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">
                {chefStats.totalOrdersDelivered}
              </p>
            </CardContent>
          </Card>

          {/* Live Orders */}
          <Card
            className="bg-red-100 border-red-300 shadow-2xl hover:scale-110 transition-all duration-500"
            onClick={() => router.push("chef-dashboard/orders")}
          >
            <CardHeader className="flex items-center gap-2">
              <FaFire className="text-red-500 text-2xl" />
              <CardTitle>Live Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{chefStats.liveOrders}</p>
            </CardContent>
          </Card>

          {/* Revenue Earned */}
          <Card className="bg-purple-100 border-purple-300 shadow-2xl hover:scale-110 transition-all duration-500">
            <CardHeader className="flex items-center gap-2">
              <FaMoneyBillWave className="text-purple-500 text-2xl" />
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">
                ₹{chefStats.revenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Most Popular Dish */}
          <Card className="bg-pink-100 border-pink-300 shadow-2xl hover:scale-110 transition-all duration-500">
            <CardHeader className="flex items-center gap-2">
              <FaUtensils className="text-pink-500 text-2xl" />
              <CardTitle>Most Popular Dish</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{chefStats.mostPopularDish}</p>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card
            className="bg-orange-100 border-orange-300 shadow-2xl hover:scale-110 transition-all duration-500"
            onClick={() => router.push("chef-dashboard/orders")}
          >
            <CardHeader className="flex items-center gap-2">
              <FaSpinner className="text-orange-500 text-2xl" />
              <CardTitle>Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{chefStats.pendingOrders}</p>
            </CardContent>
          </Card>

          {/* Average Preparation Time */}
          <Card className="bg-teal-100 border-teal-300 shadow-2xl hover:scale-110 transition-all duration-500">
            <CardHeader className="flex items-center gap-2">
              <FaClock className="text-teal-500 text-2xl" />
              <CardTitle>Avg. Prep Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{chefStats.avgPrepTime} min</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPage>
  );
}

export default Page;
