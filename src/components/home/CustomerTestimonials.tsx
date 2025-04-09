import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Arjun Mehta",
    feedback: "The food tasted just like home. Loved the warmth and flavors!",
    rating: 5,
    chef: "Chef Rina",
  },
  {
    name: "Sanya Kapoor",
    feedback:
      "Quick delivery, and the parathas were heavenly! Will order again.",
    rating: 4,
    chef: "Chef Anjali",
  },
  {
    name: "Vikram Singh",
    feedback: "Such a unique concept. The biryani was rich and authentic.",
    rating: 5,
    chef: "Chef Khalid",
  },
  {
    name: "Vikram Singh",
    feedback: "Such a unique concept. The biryani was rich and authentic.",
    rating: 5,
    chef: "Chef Khalid",
  },
  {
    name: "Vikram Singh",
    feedback: "Such a unique concept. The biryani was rich and authentic.",
    rating: 5,
    chef: "Chef Khalid",
  },
  {
    name: "Vikram Singh",
    feedback: "Such a unique concept. The biryani was rich and authentic.",
    rating: 5,
    chef: "Chef Khalid",
  },
];

export default function CustomerTestimonials() {
  return (
    <section className="py-16 px-6 bg-purple-50">
      <div className="text-center mb-10">
        <h2 className="heading text-3xl md:text-4xl font-bold mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600">
          Authentic stories from happy food lovers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <Card
            key={index}
            className="p-6 shadow-md hover:shadow-lg transition-all"
          >
            <CardContent className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{t.name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">Ordered from {t.chef}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.feedback}”</p>
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
