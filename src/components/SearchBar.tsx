
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    console.log("Searching:", { location, checkIn, checkOut, guests });
    // Here you would implement the search functionality
  };

  return (
    <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        {/* Location */}
        <div className="flex-1 px-4 py-2">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-gray-400" />
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-900 block">Where</label>
              <Input
                placeholder="Search destinations"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 p-0 text-sm placeholder:text-gray-400 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Check In */}
        <div className="flex-1 px-4 py-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto flex items-center space-x-2 w-full justify-start">
                <CalendarIcon size={16} className="text-gray-400" />
                <div>
                  <div className="text-xs font-medium text-gray-900">Check in</div>
                  <div className="text-sm text-gray-600">
                    {checkIn ? format(checkIn, "MMM dd") : "Add dates"}
                  </div>
                </div>
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
        </div>

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Check Out */}
        <div className="flex-1 px-4 py-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto flex items-center space-x-2 w-full justify-start">
                <CalendarIcon size={16} className="text-gray-400" />
                <div>
                  <div className="text-xs font-medium text-gray-900">Check out</div>
                  <div className="text-sm text-gray-600">
                    {checkOut ? format(checkOut, "MMM dd") : "Add dates"}
                  </div>
                </div>
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

        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Guests */}
        <div className="flex-1 px-4 py-2">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-gray-400" />
            <div>
              <label className="text-xs font-medium text-gray-900 block">Who</label>
              <Input
                type="number"
                min="1"
                max="16"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="border-0 p-0 text-sm w-20 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          size="lg"
          className="bg-red-500 hover:bg-red-600 rounded-full p-3 m-1"
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};
