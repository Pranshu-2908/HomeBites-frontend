"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Contact, Loader2, Mail, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/slices/authSlice";
import { fetchCustomerOrders } from "@/redux/slices/orderSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import ReviewModal from "./reviewModal";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statusColor: Record<string, string> = {
  completed: "bg-green-500",
  pending: "bg-orange-500",
  accepted: "bg-blue-500",
  cancelled: "bg-red-500",
  rejected: "bg-red-500",
  preparing: "bg-yellow-500",
};

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, status } = useAppSelector((store: RootState) => store.auth);
  const [activeReviewOrderId, setActiveReviewOrderId] = useState<string | null>(
    null
  );
  const { customerOrders, loading } = useAppSelector(
    (store: RootState) => store.order
  );
  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [editData, setEditData] = useState({
    name: user?.name || "",
    phone: user?.phoneNumber || "",
    location: user?.location || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("phoneNumber", editData.phone);
    formData.append("location", editData.location);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    await dispatch(updateProfile(formData));
    setIsDialogOpen(false);
  };

  return (
    <motion.section
      className="px-4 py-8 md:px-16 bg-gray-100 min-h-screen"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex flex-col gap-6 max-w-6xl mx-auto mt-10 p-4">
        <Card className="bg-white border shadow-md rounded-2xl overflow-hidden p-2">
          <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-6 px-4 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <Image
                src={
                  user?.profilePicture ||
                  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                }
                alt="Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="flex flex-col">
                <div className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
                  {editData.name}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-gray-600">
                  <div className="flex gap-2 items-center">
                    <Mail className="text-black font-bold" />
                    {user?.email}
                  </div>
                  <hr className="hidden sm:inline border-2 border-black h-6" />
                  <div className="flex gap-2 items-center">
                    <Contact className="text-black font-bold" />
                    {editData.phone}
                  </div>
                  <hr className="hidden sm:inline border-2 border-black h-6" />
                  <div className="flex gap-2 items-center">
                    <MapPin className="text-black font-bold" />
                    {editData.location}
                  </div>
                </div>
              </div>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="absolute top-0 right-2 bg-gray-300 hover:bg-gray-400 cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Pencil className="h-12 w-12 text-black" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="Name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="Phone"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>

                    <Input
                      placeholder="Location"
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile</Label>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setProfilePicture(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  {status === "loading" ? (
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Updating.....
                    </Button>
                  ) : (
                    <Button
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                      type="submit"
                    >
                      Save Profile
                    </Button>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {loading ? (
          <LoadingSpinner message="Loading your orders..." />
        ) : customerOrders.length <= 0 ? (
          <div className="text-xl text-center">Place orders to see here</div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Orders
            </h2>
            <div className="grid grid-cols-1 gap-6 bg-white rounded-xl p-4">
              {customerOrders.map((order, index) => {
                const isLive =
                  order.status !== "completed" &&
                  order.status !== "cancelled" &&
                  order.status !== "rejected";
                const isCompleted = order.status === "completed";
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                  >
                    <Card
                      key={order._id}
                      className={`rounded-xl border shadow-sm hover:shadow-md transition-shadow ${
                        isLive
                          ? "border-yellow-400 bg-yellow-50"
                          : isCompleted
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <CardContent className="flex flex-col gap-3">
                        <div>
                          <h1>#{order._id}</h1>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Ordered on -{" "}
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )
                                : "N/A"}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              statusColor[order.status]
                            } text-black text-xs px-3 py-1 rounded-full`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <hr className="w-full px-2 border-2 border-gray-200" />

                        <div className="space-y-2">
                          {order.meals.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-700 flex justify-between"
                            >
                              <span className="font-medium">
                                {item.mealId.name} --- x{item.quantity}
                              </span>
                              <span>₹{item.mealId.price}</span>
                            </div>
                          ))}
                        </div>
                        <hr className="w-full px-2 border-2 border-gray-200" />
                        <div className="flex justify-between">
                          {order.status === "completed" && !order.reviewed ? (
                            <>
                              <Button
                                onClick={() =>
                                  setActiveReviewOrderId(order._id)
                                }
                                className="bg-yellow-300 animate-pulse hover:bg-amber-300 text-black cursor-pointer"
                              >
                                Leave a Review
                              </Button>
                              {activeReviewOrderId === order._id && (
                                <ReviewModal
                                  order={order}
                                  open={true}
                                  onClose={() => setActiveReviewOrderId(null)}
                                />
                              )}
                            </>
                          ) : order.reviewed ? (
                            <div className="bg-yellow-200 text-black-800 px-3 py-1 rounded-full text-sm font-medium w-fit">
                              Reviewed
                            </div>
                          ) : (
                            <div></div>
                          )}

                          <div className="text-right font-semibold text-gray-800">
                            Total: ₹{order.totalAmount}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
