"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Leaf,
  Recycle,
  TrendingDown,
  Truck,
  MapPin,
  CheckCircle,
  Gift,
  Minimize,
  Layers,
} from "lucide-react";

const packagingOptions = [
  {
    id: "minimal",
    name: "Minimal Packaging",
    description: "Items packed with the least amount of materials possible",
    icon: Minimize,
    impact: "very-low",
    co2Reduction: "85%",
    wasteReduction: "90%",
    features: [
      "No unnecessary padding",
      "Biodegradable materials only",
      "Compact sizing",
      "Reusable containers when possible",
    ],
    price: "Free",
    deliveryImpact: "Reduced shipping volume",
  },
  {
    id: "bulk",
    name: "Bulk Packaging",
    description: "Multiple items combined in one eco-friendly package",
    icon: Layers,
    impact: "low",
    co2Reduction: "70%",
    wasteReduction: "75%",
    features: [
      "Consolidated shipping",
      "Shared protective materials",
      "Optimized box sizing",
      "Reduced delivery trips",
    ],
    price: "Free",
    deliveryImpact: "Fewer delivery trips",
  },
  {
    id: "standard",
    name: "Standard Eco Packaging",
    description: "Regular packaging with sustainable materials",
    icon: Package,
    impact: "medium",
    co2Reduction: "45%",
    wasteReduction: "50%",
    features: [
      "Recyclable materials",
      "Appropriate protection",
      "Standard sizing",
      "Eco-friendly tape",
    ],
    price: "Free",
    deliveryImpact: "Standard delivery",
  },
  {
    id: "premium",
    name: "Premium Protection",
    description: "Extra protection with sustainable materials",
    icon: Gift,
    impact: "medium-high",
    co2Reduction: "30%",
    wasteReduction: "35%",
    features: [
      "Enhanced protection",
      "Premium eco materials",
      "Gift-ready presentation",
      "Reusable packaging",
    ],
    price: "$2.99",
    deliveryImpact: "Slightly larger packages",
  },
];

const impactColors = {
  "very-low": "text-green-600",
  low: "text-green-500",
  medium: "text-yellow-500",
  "medium-high": "text-orange-500",
  high: "text-red-500",
} as const;

const impactBgColors = {
  "very-low": "bg-green-100 dark:bg-green-900",
  low: "bg-green-100 dark:bg-green-900",
  medium: "bg-yellow-100 dark:bg-yellow-900",
  "medium-high": "bg-orange-100 dark:bg-orange-900",
  high: "bg-red-100 dark:bg-red-900",
} as const;

type ImpactLevel = keyof typeof impactColors;

export default function PackagingPage() {
  const [selectedPackaging, setSelectedPackaging] = useState("minimal");
  const [additionalOptions, setAdditionalOptions] = useState({
    pickupOption: false,
    carbonOffset: false,
    donatePackaging: false,
  });

  const selectedOption = packagingOptions.find(
    (option) => option.id === selectedPackaging
  );

  const handleOptionChange = (option: string, checked: boolean) => {
    setAdditionalOptions((prev) => ({ ...prev, [option]: checked }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Smart Packaging Options
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Choose packaging that aligns with your environmental values. Every
              choice reduces waste and carbon footprint.
            </p>
          </div>

          {/* Current Selection Impact */}
          {selectedOption && (
            <Card className="mb-8 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  <span>Environmental Impact of Your Choice</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {selectedOption.co2Reduction}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      CO₂ Reduction
                    </div>
                    <Progress
                      value={Number.parseInt(selectedOption.co2Reduction)}
                      className="mt-2"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {selectedOption.wasteReduction}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Waste Reduction
                    </div>
                    <Progress
                      value={Number.parseInt(selectedOption.wasteReduction)}
                      className="mt-2"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {selectedOption.price}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Additional Cost
                    </div>
                    <div className="mt-2 text-xs text-emerald-600">
                      Sustainable choice
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Packaging Options */}
          <Card className="mb-8 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle>Choose Your Packaging Style</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedPackaging}
                onValueChange={setSelectedPackaging}
                className="space-y-4"
              >
                {packagingOptions.map((option) => (
                  <div key={option.id}>
                    <Label htmlFor={option.id} className="cursor-pointer">
                      <Card
                        className={`transition-all duration-300 hover:shadow-lg ${
                          selectedPackaging === option.id
                            ? "ring-2 ring-green-500 border-green-500"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <RadioGroupItem
                              value={option.id}
                              id={option.id}
                              className="mt-1"
                            />

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`p-2 rounded-lg ${
                                      impactBgColors[
                                        option.impact as ImpactLevel
                                      ]
                                    }`}
                                  >
                                    <option.icon
                                      className={`h-6 w-6 ${
                                        impactColors[
                                          option.impact as ImpactLevel
                                        ]
                                      }`}
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">
                                      {option.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                      {option.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-lg font-bold text-green-600">
                                    {option.price}
                                  </div>
                                  <Badge
                                    className={`${
                                      option.impact === "very-low" ||
                                      option.impact === "low"
                                        ? "bg-green-500"
                                        : option.impact === "medium"
                                        ? "bg-yellow-500"
                                        : "bg-orange-500"
                                    } text-white`}
                                  >
                                    {option.impact
                                      .replace("-", " ")
                                      .toUpperCase()}{" "}
                                    IMPACT
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Features:
                                  </h4>
                                  <ul className="space-y-1">
                                    {option.features.map((feature, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center space-x-2 text-sm"
                                      >
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Impact:</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <TrendingDown className="h-4 w-4 text-green-500" />
                                      <span>
                                        CO₂: {option.co2Reduction} reduction
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Recycle className="h-4 w-4 text-blue-500" />
                                      <span>
                                        Waste: {option.wasteReduction} reduction
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Truck className="h-4 w-4 text-purple-500" />
                                      <span>{option.deliveryImpact}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card className="mb-8 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle>Additional Eco-Friendly Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="pickup"
                  checked={additionalOptions.pickupOption}
                  onCheckedChange={(checked) =>
                    handleOptionChange("pickupOption", checked as boolean)
                  }
                />
                <Label
                  htmlFor="pickup"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium">Pickup Option</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Collect from our eco-friendly pickup points (Zero
                      emissions)
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="carbon-offset"
                  checked={additionalOptions.carbonOffset}
                  onCheckedChange={(checked) =>
                    handleOptionChange("carbonOffset", checked as boolean)
                  }
                />
                <Label
                  htmlFor="carbon-offset"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Leaf className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium">Carbon Offset (+$1.50)</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Offset remaining emissions through verified carbon credits
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="donate-packaging"
                  checked={additionalOptions.donatePackaging}
                  onCheckedChange={(checked) =>
                    handleOptionChange("donatePackaging", checked as boolean)
                  }
                />
                <Label
                  htmlFor="donate-packaging"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Gift className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium">
                      Donate Packaging Materials
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      We'll collect and donate reusable packaging to local
                      schools
                    </div>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Packaging Tips */}
          <Card className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span>Smart Packaging Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Combine multiple orders to reduce packaging waste
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Choose minimal packaging for non-fragile items</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Reuse packaging materials for storage or shipping
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Consider pickup options to eliminate delivery packaging
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Return packaging materials through our recycling program
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Share packaging materials with neighbors and friends
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8"
            >
              <Package className="mr-2 h-5 w-5" />
              Apply Packaging Choice
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 px-8 bg-transparent"
            >
              <Recycle className="mr-2 h-5 w-5" />
              Learn More About Recycling
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
