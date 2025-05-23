
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Star, Heart, Share, MapPin, Wifi, Car, Users, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Mock listing data
  const listing = {
    id: "1",
    title: "Modern Downtown Loft with City Views",
    location: "New York, NY",
    price: 150,
    rating: 4.8,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    ],
    type: "Entire apartment",
    beds: 2,
    baths: 1,
    guests: 4,
    superhost: true,
    description: "Experience the heart of Manhattan in this stunning modern loft. Floor-to-ceiling windows offer breathtaking city views, while the open-plan design creates a spacious and airy atmosphere. Perfect for couples or small families looking to explore the city.",
    amenities: ["WiFi", "Kitchen", "Parking", "Air conditioning", "Heating", "TV", "Washer"],
    host: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2019",
      responseRate: "100%",
      responseTime: "within an hour",
      superhost: true,
    },
    reviews: [
      {
        id: "1",
        user: "Mike Chen",
        rating: 5,
        date: "March 2024",
        comment: "Amazing location and beautiful apartment. Sarah was incredibly responsive and helpful throughout our stay.",
      },
      {
        id: "2", 
        user: "Emily Davis",
        rating: 5,
        date: "February 2024",
        comment: "The views from this place are absolutely stunning! Clean, modern, and perfectly located.",
      },
    ],
  };

  const amenityIcons = {
    WiFi: <Wifi size={20} />,
    Kitchen: <Users size={20} />,
    Parking: <Car size={20} />,
    "Air conditioning": <Users size={20} />,
    Heating: <Users size={20} />,
    TV: <Users size={20} />,
    Washer: <Users size={20} />,
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights * listing.price;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-current text-gray-900" />
                <span className="font-medium text-gray-900">{listing.rating}</span>
                <span>({listing.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{listing.location}</span>
              </div>
              {listing.superhost && (
                <Badge variant="secondary">Superhost</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share size={16} />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2"
              >
                <Heart
                  size={16}
                  className={isLiked ? "fill-current text-red-500" : ""}
                />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            {listing.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${listing.title} ${index + 2}`}
                className="w-full h-32 md:h-48 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {listing.type} hosted by {listing.host.name}
              </h2>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <span>{listing.guests} guests</span>
                <span>·</span>
                <span>{listing.beds} bedroom{listing.beds !== 1 ? 's' : ''}</span>
                <span>·</span>
                <span>{listing.baths} bathroom{listing.baths !== 1 ? 's' : ''}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    {amenityIcons[amenity as keyof typeof amenityIcons] || <Users size={20} />}
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={listing.host.image} alt={listing.host.name} />
                    <AvatarFallback>{listing.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>Hosted by {listing.host.name}</span>
                      {listing.host.superhost && (
                        <Badge variant="secondary" className="text-xs">Superhost</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Joined in {listing.host.joinedDate}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Response rate: {listing.host.responseRate}</p>
                  </div>
                  <div>
                    <p className="font-medium">Response time: {listing.host.responseTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-current" />
                  {listing.rating} · {listing.reviewCount} reviews
                </div>
              </h3>
              <div className="space-y-6">
                {listing.reviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{review.user}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-baseline gap-2">
                  <span className="text-2xl">${listing.price}</span>
                  <span className="text-base font-normal text-gray-500">night</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left">
                        <CalendarIcon size={16} className="mr-2" />
                        {checkIn ? format(checkIn, "MMM dd") : "Check in"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left">
                        <CalendarIcon size={16} className="mr-2" />
                        {checkOut ? format(checkOut, "MMM dd") : "Check out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guest Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} guest{num !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Breakdown */}
                {checkIn && checkOut && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span>${listing.price} x {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-red-500 hover:bg-red-600" size="lg">
                  Reserve
                </Button>

                <p className="text-center text-sm text-gray-500">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
