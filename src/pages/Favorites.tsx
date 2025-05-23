import { useState } from "react";
import { Heart, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteItem {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: 1,
      title: "Luxury Beach Villa",
      location: "Maldives",
      price: 450,
      image: "https://source.unsplash.com/random/800x600/?luxury-villa",
    },
    {
      id: 2,
      title: "Mountain Cabin",
      location: "Swiss Alps",
      price: 280,
      image: "https://source.unsplash.com/random/800x600/?mountain-cabin",
    },
    {
      id: 3,
      title: "City Apartment",
      location: "Paris, France",
      price: 200,
      image: "https://source.unsplash.com/random/800x600/?paris-apartment",
    },
    {
      id: 4,
      title: "Beachfront Condo",
      location: "Miami, USA",
      price: 320,
      image: "https://source.unsplash.com/random/800x600/?beach-house",
    },
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
        <span className="text-gray-600">{favorites.length} items</span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
          <p className="text-gray-500">Start exploring and save your favorite places!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => removeFavorite(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-700" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <Share2 className="h-4 w-4 text-gray-700" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.location}</p>
                <div className="flex justify-between items-center">
                  <div className="text-blue-600 font-semibold">
                    ${item.price} <span className="text-gray-500 text-sm">/night</span>
                  </div>
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;