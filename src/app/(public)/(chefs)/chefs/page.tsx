"use client";
import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { fetchAllchefs } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();
  const { chefs, loading } = useAppSelector((store: RootState) => store.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllchefs());
  }, [dispatch]);

  if (loading) return <LoadingSpinner message="Loading Chefs..." />;
  if (!chefs) {
    return <p className="text-center text-red-500">Meal not found.</p>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefs.map((chef, index) => (
          <motion.div
            key={chef._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 h-full p-0">
              <CardContent className="p-6 text-left space-y-4">
                <div className="w-full h-72 relative rounded-xl overflow-hidden">
                  <Image
                    src={chef.profilePicture ?? ""}
                    alt={chef.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{chef.name}</h3>
                <p className="text-sm text-gray-600">Bio: {chef.bio}</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-yellow-500" />
                    <span className="text-md font-medium">{4}</span>
                  </div>
                  <Button
                    size={"icon"}
                    className="bg-gray-200 border border-gray-300 shadow-md hover:bg-gray-300 cursor-pointer"
                    onClick={() => router.push(`/chefs/${chef._id}`)}
                  >
                    <ExternalLink size={24} className="text-black " />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
