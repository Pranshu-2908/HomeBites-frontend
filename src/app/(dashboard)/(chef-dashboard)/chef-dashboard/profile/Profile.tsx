"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateProfile() {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-6">
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">
            Create Profile
          </h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input type="text" className="w-full" defaultValue="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input type="text" className="w-full" defaultValue="Mumbai" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                className="w-full min-h-24"
                defaultValue="10+ years experience"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input type="tel" className="w-full" defaultValue="9998823742" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Working Hours
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Input type="time" className="w-full" defaultValue="09:00" />
                <span className="text-gray-700 self-center hidden sm:block">
                  to
                </span>
                <span className="text-gray-700 self-start sm:hidden">to</span>
                <Input type="time" className="w-full" defaultValue="17:00" />
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
