
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    location: "",
    price: "",
    beds: 1,
    baths: 1,
    guests: 1,
    amenities: [] as string[],
    images: [] as string[],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const amenitiesList = [
    "WiFi", "Kitchen", "Parking", "Air conditioning", "Heating", 
    "TV", "Washer", "Pool", "Hot tub", "Gym", "Workspace"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAmenityToggle = (amenity: string) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    handleInputChange("amenities", updatedAmenities);
  };

  const handleSubmit = () => {
    console.log("Listing submitted:", formData);
    // Here you would submit to your API
    navigate("/dashboard");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your place</h2>
              <p className="text-gray-600">Basic information about your property</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Property title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Cozy apartment in downtown"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your space in detail..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="propertyType">Property type</Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="cabin">Cabin</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State, Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Property details</h2>
              <p className="text-gray-600">How many guests can your place accommodate?</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Number of guests</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("guests", Math.max(1, formData.guests - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{formData.guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("guests", formData.guests + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Bedrooms</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("beds", Math.max(1, formData.beds - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{formData.beds}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("beds", formData.beds + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Bathrooms</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("baths", Math.max(1, formData.baths - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{formData.baths}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("baths", formData.baths + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Amenities</h2>
              <p className="text-gray-600">What amenities do you offer?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm font-medium">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos & pricing</h2>
              <p className="text-gray-600">Add photos and set your price</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Photos</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload photos</h3>
                  <p className="text-gray-500 mb-4">Add at least 5 photos of your space</p>
                  <Button variant="outline">Choose files</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price per night (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Set a competitive price for your area
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create a new listing</h1>
          <p className="text-gray-600 mt-2">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600">
              Publish listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewListing;
