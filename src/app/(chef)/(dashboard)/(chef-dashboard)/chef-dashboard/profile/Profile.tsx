"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/slices/authSlice";
import { Loader2 } from "lucide-react";

export default function CreateProfile() {
  const { user, status } = useAppSelector((store: RootState) => store.auth);
  const [name, setName] = useState(user?.name);
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [certifications, setCertifications] = useState(
    user?.certifications || ""
  );
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Split time into hour & minute
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("phoneNumber", phoneNumber);
    formData.append("location", location);
    formData.append("bio", bio);
    formData.append("certifications", certifications);
    formData.append("startHour", String(startHour));
    formData.append("startMinute", String(startMinute));
    formData.append("endHour", String(endHour));
    formData.append("endMinute", String(endMinute));

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-6">
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">
            Create Profile
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                className="w-full min-h-24"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                className="w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certifications
              </label>
              <Input
                type="text"
                className="w-full"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Working Hours
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Input
                  type="time"
                  className="w-full"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <span className="text-gray-700 self-center hidden sm:block">
                  to
                </span>
                <span className="text-gray-700 self-start sm:hidden">to</span>
                <Input
                  type="time"
                  className="w-full"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              {status === "loading" ? (
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Updating.....
                </Button>
              ) : (
                <Button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                  type="submit"
                >
                  Save Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
