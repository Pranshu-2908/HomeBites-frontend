"use client";
import { useState } from "react";
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
import { Contact, Mail, MapPin, Pencil } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const dummyOrders = [
  {
    _id: "1",
    createdAt: "2025-04-06T10:00:00Z",
    status: "Completed",
    items: [
      { name: "Paneer Butter Masala", quantity: 1, price: 250 },
      { name: "Tandoori Roti", quantity: 4, price: 80 },
    ],
    totalAmount: 330,
  },
  {
    _id: "2",
    createdAt: "2025-04-05T15:30:00Z",
    status: "Preparing",
    items: [{ name: "Veg Biryani", quantity: 2, price: 400 }],
    totalAmount: 400,
  },
];

const statusColor: Record<string, string> = {
  Completed: "bg-green-500",
  Pending: "bg-orange-500",
  Accepted: "bg-blue-500",
  Cancelled: "bg-red-500",
  Rejected: "bg-red-500",
  Preparing: "bg-yellow-500",
};

export default function UserProfile() {
  const { user } = useAppSelector((store: RootState) => store.auth);
  const [editData, setEditData] = useState({
    name: user?.name || "John Doe",
    phone: user?.phoneNumber || "",
    location: user?.location || "",
    profilePhoto:
      user?.profilePicture ||
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto mt-10 p-4">
      {/* Profile Section */}
      <Card className="bg-white border shadow-md rounded-2xl overflow-hidden p-2">
        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-6 px-4 relative">
          <div className="flex items-center gap-4">
            <Image
              src={editData.profilePhoto}
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
                <div className="flex gap-2">
                  <Mail className="text-black font-bold" />
                  {user?.email}
                </div>
                <hr className="hidden sm:inline border-2 border-black h-6" />
                <div className="flex gap-2">
                  <Contact className="text-black font-bold" />
                  {editData.phone}
                </div>
                <hr className="hidden sm:inline border-2 border-black h-6" />
                <div className="flex gap-2">
                  <MapPin className="text-black font-bold" />
                  {editData.location}
                </div>
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="absolute top-0 right-2 bg-gray-300 hover:bg-gray-400"
              >
                <Pencil className="h-12 w-12 text-black" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form className="flex flex-col gap-4">
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
                    placeholder="Profile Photo URL"
                    value={editData.profilePhoto}
                    onChange={(e) =>
                      setEditData({ ...editData, profilePhoto: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-600 w-full"
                >
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Orders Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
        <div className="grid grid-cols-1 gap-6">
          {dummyOrders.map((order) => (
            <Card
              key={order._id}
              className="rounded-xl border shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="flex flex-col gap-3">
                <div>
                  <h1>#{order._id}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Ordered on - {new Date(order.createdAt).toLocaleString()}
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
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-700 flex justify-between"
                    >
                      <span className="font-medium">
                        {item.name} --- x{item.quantity}
                      </span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
                <hr className="w-full px-2 border-2 border-gray-200" />
                <div className="text-right font-semibold text-gray-800">
                  Total: ₹{order.totalAmount}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
