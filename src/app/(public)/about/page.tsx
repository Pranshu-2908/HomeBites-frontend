import CreatorSection from "@/components/CreatorSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-300 text-gray-900 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About HomeBites</h1>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          HomeBites is a passion project by food lovers and tech enthusiasts who
          believe in the power of homemade meals and supporting local chefs.
        </p>
      </div>
      <CreatorSection />
    </div>
  );
}
