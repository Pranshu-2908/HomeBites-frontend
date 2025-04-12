"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PaymentCancelPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <Card className="bg-red-500 border-red-300 shadow-xl w-full max-w-md rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-rose-300 p-4">
              <motion.div
                initial={{ rotate: -20 }}
                animate={{ rotate: [-20, 20, -10, 10, 0] }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-5xl"
              >
                ❌
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold">Payment Failed</h1>
            <p className="text-sm text-black">
              Something went wrong and your payment was not completed.
            </p>
            <Button className="w-full" onClick={() => router.push("/")}>
              Go Back to Home
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;
