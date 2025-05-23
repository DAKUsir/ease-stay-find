
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    reviewCount: number;
    images: string[];
    type: string;
    beds: number;
    baths: number;
    superhost?: boolean;
  };
  onClick?: () => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="relative" onClick={onClick}>
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-200">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Image indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <Heart
            size={16}
            className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </Button>

        {/* Superhost badge */}
        {property.superhost && (
          <Badge className="absolute top-2 left-2 bg-white text-gray-900 text-xs">
            Superhost
          </Badge>
        )}
      </div>

      <CardContent className="p-4" onClick={onClick}>
        {/* Location and rating */}
        <div className="flex justify-between items-start mb-1">
          <p className="font-medium text-gray-900 text-sm">{property.location}</p>
          <div className="flex items-center space-x-1">
            <Star size={12} className="fill-current text-gray-900" />
            <span className="text-sm text-gray-900">{property.rating}</span>
            <span className="text-sm text-gray-500">({property.reviewCount})</span>
          </div>
        </div>

        {/* Property details */}
        <p className="text-gray-500 text-sm mb-1">{property.type}</p>
        <p className="text-gray-500 text-sm mb-3">
          {property.beds} bed{property.beds !== 1 ? 's' : ''} · {property.baths} bath{property.baths !== 1 ? 's' : ''}
        </p>

        {/* Price */}
        <div className="flex items-baseline space-x-1">
          <span className="font-semibold text-gray-900">${property.price}</span>
          <span className="text-gray-500 text-sm">night</span>
        </div>
      </CardContent>
    </Card>
  );
};
