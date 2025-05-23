
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Mock data for featured properties
  const featuredProperties = [
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
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      text: "StayEase made finding the perfect vacation rental so easy. The booking process was seamless!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      location: "Austin, TX", 
      text: "Amazing selection of properties and excellent customer service. Highly recommend!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      location: "Seattle, WA",
      text: "Love how user-friendly the platform is. Found exactly what we were looking for.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find your perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                getaway
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover unique places to stay around the world, from cozy apartments to luxury villas
            </p>
          </div>
          
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured stays</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/listings")}
            className="hidden md:inline-flex"
          >
            View all
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => navigate(`/listing/${property.id}`)}
            />
          ))}
        </div>
        
        <div className="text-center mt-8 md:hidden">
          <Button onClick={() => navigate("/listings")}>
            View all properties
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Browse by property type
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Apartments", count: "2,431", icon: "🏢" },
              { name: "Houses", count: "1,892", icon: "🏠" },
              { name: "Cabins", count: "743", icon: "🏕️" },
              { name: "Villas", count: "456", icon: "🏖️" },
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-500">{category.count} properties</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          What our guests say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Host CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start hosting?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of hosts earning extra income by sharing their space
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate("/host/new")}
          >
            Become a host
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
