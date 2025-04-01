import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateProfile() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Create Profile</h1>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            defaultValue="John Doe"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            defaultValue="Mumbai"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <Input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            defaultValue="10+ years experience"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            defaultValue="9998823742"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Working Hours
          </label>
          <div className="flex space-x-4">
            <Input
              type="time"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              defaultValue="09:00"
            />
            <span className="text-gray-700 mt-2">to</span>
            <Input
              type="time"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              defaultValue="17:00"
            />
          </div>
        </div>

        <Button className="mt-4 bg-blue-600 text-white py-2 px-4 hover:bg-blue-700">
          Save Profile
        </Button>
      </form>
    </div>
  );
}
