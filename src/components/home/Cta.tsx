import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full bg-gradient-to-r from-orange-100 to-yellow-50 py-16 px-4 sm:px-10 text-center rounded-xl shadow-sm my-4">
      <h2 className="heading text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Ready to Experience the Taste of Home?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Whether you are a home chef or a food lover — HomeBites brings you
        together.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Link href="/login">
          <Button className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
            Order Now
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-100 px-8 py-6 text-lg"
          >
            Become a Chef
          </Button>
        </Link>
      </div>
    </section>
  );
}
