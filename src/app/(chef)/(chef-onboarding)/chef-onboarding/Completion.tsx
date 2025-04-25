import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Completion() {
  const router = useRouter();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">You are all set! ✅</h2>
      <p className="mb-6">Welcome to your HomeBites dashboard.</p>
      <Button
        onClick={() => router.push("/chef-dashboard")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
