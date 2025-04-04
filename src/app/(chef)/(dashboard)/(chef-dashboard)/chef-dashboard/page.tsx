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
      <div className="flex flex-col gap-6">
        {/* Chart Section */}
        <div className="bg-white shadow-md p-3 sm:p-4 rounded-xl border-2 border-gray-200">
          <h2 className="text-base sm:text-lg font-bold mb-2">Orders Trend</h2>
          <div className="h-64 sm:h-80 md:h-96 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderTrends}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: "0.75rem" }}
                  axisLine={{ strokeWidth: 1 }}
                />
                <YAxis
                  tick={{ fontSize: "0.75rem" }}
                  axisLine={{ strokeWidth: 1 }}
                />
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Rating */}
          <Card className="bg-yellow-100 border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaStar className="text-yellow-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">Rating</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">{chefStats.rating} ⭐</p>
              <p className="text-xs sm:text-sm text-gray-600">
                ({chefStats.totalRatings} rated)
              </p>
            </CardContent>
          </Card>

          {/* Total Meals */}
          <Card
            className="bg-blue-100 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push("chef-dashboard/meals")}
          >
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaUtensils className="text-blue-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Total Meals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">{chefStats.totalMeals}</p>
            </CardContent>
          </Card>

          {/* Total Orders Delivered */}
          <Card
            className="bg-green-100 border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push("chef-dashboard/order-history")}
          >
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaCheckCircle className="text-green-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Orders Delivered
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">
                {chefStats.totalOrdersDelivered}
              </p>
            </CardContent>
          </Card>

          {/* Live Orders */}
          <Card
            className="bg-red-100 border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push("chef-dashboard/orders")}
          >
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaFire className="text-red-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Live Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">{chefStats.liveOrders}</p>
            </CardContent>
          </Card>

          {/* Revenue Earned */}
          <Card className="bg-purple-100 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaMoneyBillWave className="text-purple-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">
                ₹{chefStats.revenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          {/* Most Popular Dish */}
          <Card className="bg-pink-100 border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaUtensils className="text-pink-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Popular Dish
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p
                className="text-base font-bold truncate"
                title={chefStats.mostPopularDish}
              >
                {chefStats.mostPopularDish}
              </p>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card
            className="bg-orange-100 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push("chef-dashboard/orders")}
          >
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaSpinner className="text-orange-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">{chefStats.pendingOrders}</p>
            </CardContent>
          </Card>

          {/* Average Preparation Time */}
          <Card className="bg-teal-100 border-teal-300 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-2 p-4">
              <FaClock className="text-teal-500 text-xl" />
              <CardTitle className="text-sm sm:text-base">
                Avg. Prep Time
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
              <p className="text-lg font-bold">{chefStats.avgPrepTime} min</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPage>
  );
}

export default Page;
