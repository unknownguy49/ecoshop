"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Bike,
  Truck,
  Zap,
  Leaf,
  MapPin,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Package,
} from "lucide-react";

const deliveryOptions = [
  {
    id: "green",
    name: "Green Delivery",
    duration: "2-4 days",
    price: "Free",
    icon: Bike,
    impact: "low",
    co2: "0.2kg",
    description: "Eco-friendly delivery via bike or electric vehicle",
    features: ["Carbon neutral", "Biodegradable packaging", "Local couriers"],
    color: "green",
  },
  {
    id: "standard",
    name: "Standard Delivery",
    duration: "1-2 days",
    price: "$4.99",
    icon: Truck,
    impact: "medium",
    co2: "1.2kg",
    description: "Regular delivery with optimized routes",
    features: [
      "Route optimization",
      "Recyclable packaging",
      "Tracking included",
    ],
    color: "yellow",
  },
  {
    id: "express",
    name: "Express Delivery",
    duration: "Same day",
    price: "$12.99",
    icon: Zap,
    impact: "high",
    co2: "3.5kg",
    description: "Fast delivery with higher environmental impact",
    features: ["Same day delivery", "Priority handling", "Real-time tracking"],
    color: "red",
  },
];

const impactColors = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
} as const;

const impactBgColors = {
  low: "bg-green-100 dark:bg-green-900",
  medium: "bg-yellow-100 dark:bg-yellow-900",
  high: "bg-red-100 dark:bg-red-900",
} as const;

type ImpactLevel = keyof typeof impactColors;

export default function DeliveryPage() {
  const [selectedOption, setSelectedOption] = useState("green");
  const [showComparison, setShowComparison] = useState(false);

  const selectedDelivery = deliveryOptions.find(
    (option) => option.id === selectedOption
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Eco-Delivery Options
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Choose your delivery method based on environmental impact. Every
              choice makes a difference for our planet.
            </p>
          </div>

          {/* Impact Meter */}
          <Card className="mb-8 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <span>Environmental Impact Meter</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bike className="h-6 w-6 text-green-500" />
                    <span className="text-sm font-medium">🌍 Low Impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-6 w-6 text-yellow-500" />
                    <span className="text-sm font-medium">
                      ⚠️ Medium Impact
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-red-500" />
                    <span className="text-sm font-medium">🚨 High Impact</span>
                  </div>
                </div>

                <div className="relative">
                  <Progress
                    value={
                      selectedOption === "green"
                        ? 20
                        : selectedOption === "standard"
                        ? 60
                        : 90
                    }
                    className="h-4"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {selectedDelivery?.name}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Current selection CO₂ impact:{" "}
                    <strong>{selectedDelivery?.co2}</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-4 mb-8"
          >
            {deliveryOptions.map((option) => (
              <div key={option.id}>
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card
                    className={`transition-all duration-300 hover:shadow-lg ${
                      selectedOption === option.id
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
                                  impactBgColors[option.impact as ImpactLevel]
                                }`}
                              >
                                <option.icon
                                  className={`h-6 w-6 ${
                                    impactColors[option.impact as ImpactLevel]
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
                              <div className="text-sm text-gray-500">
                                {option.duration}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              className={`${
                                option.impact === "low"
                                  ? "bg-green-500"
                                  : option.impact === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              } text-white`}
                            >
                              {option.impact === "low" && (
                                <Leaf className="h-3 w-3 mr-1" />
                              )}
                              {option.impact === "medium" && (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {option.impact === "high" && (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {option.impact.toUpperCase()} IMPACT
                            </Badge>

                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              CO₂: <strong>{option.co2}</strong>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {option.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Comparison Toggle */}
          <div className="text-center mb-8">
            <Button
              variant="outline"
              onClick={() => setShowComparison(!showComparison)}
              className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
            >
              {showComparison ? "Hide" : "Show"} Environmental Comparison
            </Button>
          </div>

          {/* Environmental Comparison */}
          {showComparison && (
            <Card className="mb-8 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle>Environmental Impact Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Delivery Method</th>
                        <th className="text-center py-2">CO₂ Emissions</th>
                        <th className="text-center py-2">Packaging</th>
                        <th className="text-center py-2">Fuel Type</th>
                        <th className="text-center py-2">Route Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 flex items-center space-x-2">
                          <Bike className="h-4 w-4 text-green-500" />
                          <span>Green Delivery</span>
                        </td>
                        <td className="text-center text-green-600 font-medium">
                          0.2kg
                        </td>
                        <td className="text-center">Biodegradable</td>
                        <td className="text-center">Electric/Human</td>
                        <td className="text-center">Optimized</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-yellow-500" />
                          <span>Standard Delivery</span>
                        </td>
                        <td className="text-center text-yellow-600 font-medium">
                          1.2kg
                        </td>
                        <td className="text-center">Recyclable</td>
                        <td className="text-center">Hybrid/Diesel</td>
                        <td className="text-center">Optimized</td>
                      </tr>
                      <tr>
                        <td className="py-3 flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-red-500" />
                          <span>Express Delivery</span>
                        </td>
                        <td className="text-center text-red-600 font-medium">
                          3.5kg
                        </td>
                        <td className="text-center">Standard</td>
                        <td className="text-center">Gasoline</td>
                        <td className="text-center">Direct Route</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8"
            >
              <Package className="mr-2 h-5 w-5" />
              Confirm Delivery Choice
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 px-8 bg-transparent"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Track Your Order
            </Button>
          </div>

          {/* Eco Tips */}
          <Card className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                Eco-Friendly Delivery Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>
                    Choose green delivery when possible to reduce carbon
                    footprint
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>
                    Combine multiple orders to reduce delivery frequency
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Reuse or recycle packaging materials</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>
                    Consider pickup options for zero-emission delivery
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
