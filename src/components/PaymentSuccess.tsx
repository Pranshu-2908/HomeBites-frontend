"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  useEffect(() => {
    const fetchOrderId = async () => {
      if (!sessionId) return;
      console.log(sessionId);
      try {
        const { data } = await axiosInstance.get(
          `/payment/session/${sessionId}`
        );
        setOrderId(data.orderId);
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };

    fetchOrderId();
  }, [sessionId]);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <Card className="bg-green-100 border-green-300 shadow-xl text-green-800 w-full max-w-md rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [1.2, 1, 1.1, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl"
            >
              ✅
            </motion.div>
            <h1 className="text-3xl font-bold">Payment Successful</h1>
            <p className="text-sm text-green-700">
              Your order has been placed successfully!
            </p>
            <p className="text-sm text-green-800">
              Order ID: <strong>{orderId}</strong>
            </p>
            <Button
              variant="default"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/profile")}
            >
              Track your Order Status
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
