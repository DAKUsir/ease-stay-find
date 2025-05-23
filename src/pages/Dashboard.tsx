
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "John Doe",
    type: "guest", // or "host"
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c2?w=100&h=100&fit=crop&crop=face",
  };

  const upcomingTrips = [
    {
      id: "1",
      property: "Modern Downtown Loft",
      location: "New York, NY",
      checkIn: "Dec 15, 2024",
      checkOut: "Dec 18, 2024",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
      status: "confirmed",
    },
    {
      id: "2",
      property: "Cozy Beach House",
      location: "Santa Monica, CA",
      checkIn: "Jan 5, 2025",
      checkOut: "Jan 12, 2025",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop",
      status: "pending",
    },
  ];

  const pastBookings = [
    {
      id: "3",
      property: "Mountain View Cabin",
      location: "Aspen, CO",
      dates: "Nov 1-5, 2024",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
      rating: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your trips and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Trips */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Upcoming trips</h2>
                <Button onClick={() => navigate("/listings")}>
                  <Plus size={16} className="mr-2" />
                  Book new trip
                </Button>
              </div>

              {upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 h-48 md:h-32">
                            <img
                              src={trip.image}
                              alt={trip.property}
                              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{trip.property}</h3>
                              <Badge variant={trip.status === "confirmed" ? "default" : "secondary"}>
                                {trip.status}
                              </Badge>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin size={16} className="mr-2" />
                              <span>{trip.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                              <Calendar size={16} className="mr-2" />
                              <span>{trip.checkIn} - {trip.checkOut}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View details
                              </Button>
                              <Button variant="outline" size="sm">
                                Contact host
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming trips</h3>
                    <p className="text-gray-500 mb-4">Book your next adventure!</p>
                    <Button onClick={() => navigate("/listings")}>
                      Explore properties
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Past Bookings */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Past bookings</h2>
              
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 h-48 md:h-32">
                            <img
                              src={booking.image}
                              alt={booking.property}
                              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{booking.property}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin size={16} className="mr-2" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                              <Calendar size={16} className="mr-2" />
                              <span>{booking.dates}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Star size={16} className="mr-2" />
                                Write review
                              </Button>
                              <Button variant="outline" size="sm">
                                Book again
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No past bookings yet</p>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-500 capitalize">{user.type}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Edit profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Account settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Payment methods
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Help center
                </Button>
              </CardContent>
            </Card>

            {/* Host Promotion */}
            {user.type === "guest" && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Become a host</h3>
                  <p className="text-blue-700 text-sm mb-4">
                    Earn extra income by sharing your space with travelers
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate("/host/new")}
                  >
                    Get started
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
