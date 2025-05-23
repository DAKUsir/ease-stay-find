import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "beaches", label: "Beaches" },
    { id: "mountains", label: "Mountains" },
    { id: "cities", label: "Cities" },
    { id: "countryside", label: "Countryside" },
    { id: "islands", label: "Islands" },
  ];

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      category: "islands",
      image: "https://source.unsplash.com/800x600/?bali",
      description: "Tropical paradise with beautiful beaches and rich culture",
    },
    {
      id: 2,
      name: "Swiss Alps",
      category: "mountains",
      image: "https://source.unsplash.com/800x600/?swiss-alps",
      description: "Majestic mountain ranges perfect for adventure seekers",
    },
    // Add more destinations as needed
  ];

  const filteredDestinations = selectedCategory === "all" 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Destinations</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {destination.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {destination.description}
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin size={16} className="mr-1" />
                <span>{destination.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;