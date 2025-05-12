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
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getChefAverageRating } from "@/redux/slices/reviewSlice";
import { motion } from "framer-motion";
import { fetchChefStats, fetchOrderTrends } from "@/redux/slices/chefSlice";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

function Page() {
  const { chefStats, orderTrends } = useAppSelector(
    (store: RootState) => store.chef
  );
  const { user } = useAppSelector((store: RootState) => store.auth);
  const { chefAverageRating, totalReviewOfAChef } = useAppSelector(
    (store: RootState) => store.review
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderTrends(user?._id || ""));
    dispatch(getChefAverageRating(user?._id || ""));
    dispatch(fetchChefStats());
  }, [dispatch, user?._id]);
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
          <motion.div {...fadeUp(0.1)}>
            <Card className="bg-yellow-100 border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-2 p-4">
                <FaStar className="text-yellow-500 text-xl" />
                <CardTitle className="text-sm sm:text-base">Rating</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4 px-4 flex justify-between">
                <p className="text-lg font-bold">{chefAverageRating} ⭐</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  ({totalReviewOfAChef} rated)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Meals */}
          <motion.div {...fadeUp(0.2)}>
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
          </motion.div>
          {/* Total Orders Delivered */}
          <motion.div {...fadeUp(0.3)}>
            <Card
              className="bg-green-100 border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => router.push("chef-dashboard/order-history")}
            >
              <CardHeader className="flex flex-row items-center gap-2 p-4">
                <FaCheckCircle className="text-green-500 text-xl" />
                <CardTitle className="text-sm sm:text-base">
                  Orders Completed
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4 px-4">
                <p className="text-lg font-bold">
                  {chefStats.totalOrdersCompleted}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          {/* Live Orders */}
          <motion.div {...fadeUp(0.4)}>
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
          </motion.div>

          {/* Revenue Earned */}
          <motion.div {...fadeUp(0.5)}>
            <Card className="bg-purple-100 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-2 p-4">
                <FaMoneyBillWave className="text-purple-500 text-xl" />
                <CardTitle className="text-sm sm:text-base">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4 px-4">
                <p className="text-lg font-bold">₹{chefStats.revenue}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Most Popular Dish */}
          <motion.div {...fadeUp(0.6)}>
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
          </motion.div>

          {/* Pending Orders */}
          <motion.div {...fadeUp(0.7)}>
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
          </motion.div>

          {/* Average Preparation Time */}
          <motion.div {...fadeUp(0.8)}>
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
          </motion.div>
        </div>
      </div>
    </DashboardPage>
  );
}

export default Page;
