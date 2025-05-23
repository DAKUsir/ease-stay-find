
import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [propertyType, setPropertyType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock listings data
  const listings = [
    {
      id: "1",
      title: "Modern Downtown Loft",
      location: "New York, NY",
      price: 150,
      rating: 4.8,
      reviewCount: 42,
      images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop"],
      type: "Entire apartment",
      beds: 2,
      baths: 1,
      superhost: true,
    },
    {
      id: "2",
      title: "Cozy Beach House",
      location: "Santa Monica, CA",
      price: 220,
      rating: 4.9,
      reviewCount: 67,
      images: ["https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop"],
      type: "Entire house",
      beds: 3,
      baths: 2,
    },
    {
      id: "3",
      title: "Mountain View Cabin",
      location: "Aspen, CO",
      price: 180,
      rating: 4.7,
      reviewCount: 89,
      images: ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop"],
      type: "Entire cabin",
      beds: 2,
      baths: 1,
      superhost: true,
    },
    {
      id: "4",
      title: "Historic City Center",
      location: "Boston, MA",
      price: 95,
      rating: 4.6,
      reviewCount: 124,
      images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop"],
      type: "Private room",
      beds: 1,
      baths: 1,
    },
    {
      id: "5",
      title: "Luxury Penthouse",
      location: "Miami, FL",
      price: 350,
      rating: 4.9,
      reviewCount: 56,
      images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop"],
      type: "Entire apartment",
      beds: 3,
      baths: 2,
      superhost: true,
    },
    {
      id: "6",
      title: "Charming Cottage",
      location: "Portland, OR",
      price: 125,
      rating: 4.5,
      reviewCount: 78,
      images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop"],
      type: "Entire house",
      beds: 2,
      baths: 1,
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesType = propertyType === "all" || listing.type.toLowerCase().includes(propertyType);
    
    return matchesSearch && matchesPrice && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {filteredListings.length} properties found
              </Badge>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="cabin">Cabin</SelectItem>
                      <SelectItem value="room">Private room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={25}
                    className="mt-2"
                  />
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("");
                      setPriceRange([0, 500]);
                      setPropertyType("all");
                    }}
                    className="flex items-center gap-2"
                  >
                    <X size={16} />
                    Clear filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => navigate(`/listing/${property.id}`)}
            />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
