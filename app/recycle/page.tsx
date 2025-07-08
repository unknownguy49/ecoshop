"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Recycle,
  MapPin,
  Calendar,
  Package,
  Smartphone,
  Shirt,
  Home,
  Leaf,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Gift,
} from "lucide-react";

const recyclableItems = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    category: "clothing",
    purchaseDate: "2024-01-15",
    recyclable: true,
    condition: "good",
    instructions:
      "Remove any non-cotton elements like buttons or zippers before recycling.",
    dropOffPoints: ["EcoCenter Downtown", "Green Hub Mall"],
    estimatedValue: "$2.50",
  },
  {
    id: 2,
    name: "Bamboo Water Bottle",
    category: "accessories",
    purchaseDate: "2024-01-10",
    recyclable: true,
    condition: "excellent",
    instructions:
      "Clean thoroughly and separate bamboo from any metal components.",
    dropOffPoints: ["EcoCenter Downtown", "Bamboo Recycling Co."],
    estimatedValue: "$1.80",
  },
  {
    id: 3,
    name: "Solar Power Bank",
    category: "electronics",
    purchaseDate: "2024-01-05",
    recyclable: true,
    condition: "fair",
    instructions:
      "Remove battery safely. Electronic components can be recycled separately.",
    dropOffPoints: ["Electronics Recycling Center", "Tech Waste Hub"],
    estimatedValue: "$5.20",
  },
];

const dropOffLocations = [
  {
    name: "EcoCenter Downtown",
    address: "123 Green Street, Downtown",
    hours: "Mon-Sat: 9AM-6PM",
    distance: "0.8 miles",
    accepts: ["clothing", "accessories", "packaging"],
    rating: 4.8,
  },
  {
    name: "Electronics Recycling Center",
    address: "456 Tech Avenue, Industrial District",
    hours: "Mon-Fri: 8AM-5PM",
    distance: "2.3 miles",
    accepts: ["electronics", "batteries"],
    rating: 4.6,
  },
  {
    name: "Green Hub Mall",
    address: "789 Shopping Blvd, Mall Level 2",
    hours: "Daily: 10AM-9PM",
    distance: "1.5 miles",
    accepts: ["clothing", "accessories", "home"],
    rating: 4.7,
  },
];

const categoryIcons = {
  clothing: Shirt,
  electronics: Smartphone,
  accessories: Package,
  home: Home,
  packaging: Package,
  batteries: Package,
} as const;

type RecycleCategory = keyof typeof categoryIcons;

export default function RecyclePage() {
  const [selectedTab, setSelectedTab] = useState("items");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
    location: "",
    notes: "",
  });

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSchedulePickup = () => {
    // Handle pickup scheduling logic
    console.log("Scheduling pickup:", { selectedItems, scheduleForm });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Recycling & Return Center
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Give your items a second life. Schedule returns, find drop-off
              points, and learn how to recycle responsibly.
            </p>
          </div>

          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="items">My Recyclable Items</TabsTrigger>
              <TabsTrigger value="locations">Drop-off Locations</TabsTrigger>
              <TabsTrigger value="guide">Recycling Guide</TabsTrigger>
            </TabsList>

            {/* Recyclable Items Tab */}
            <TabsContent value="items" className="space-y-6">
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Recycle className="h-5 w-5 text-green-600" />
                    <span>Items Ready for Recycling</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recyclableItems.map((item) => {
                      const CategoryIcon =
                        categoryIcons[item.category as RecycleCategory] ||
                        Package;
                      const isSelected = selectedItems.includes(item.id);

                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-green-300"
                          }`}
                          onClick={() => toggleItemSelection(item.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                              <CategoryIcon className="h-6 w-6 text-green-600" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{item.name}</h3>
                                <div className="flex items-center space-x-2">
                                  <Badge className="bg-green-500 text-white">
                                    <Recycle className="h-3 w-3 mr-1" />
                                    Recyclable
                                  </Badge>
                                  <Badge variant="outline">
                                    {item.condition}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div>
                                  <p className="mb-1">
                                    <strong>Purchased:</strong>{" "}
                                    {new Date(
                                      item.purchaseDate
                                    ).toLocaleDateString()}
                                  </p>
                                  <p className="mb-1">
                                    <strong>Estimated Value:</strong>{" "}
                                    {item.estimatedValue}
                                  </p>
                                </div>
                                <div>
                                  <p className="mb-1">
                                    <strong>Drop-off Points:</strong>
                                  </p>
                                  <ul className="text-xs space-y-1">
                                    {item.dropOffPoints.map((point, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center space-x-1"
                                      >
                                        <MapPin className="h-3 w-3" />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  <strong>Recycling Instructions:</strong>{" "}
                                  {item.instructions}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                              {isSelected && (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold mb-3">
                        Schedule Pickup for Selected Items
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Pickup Date
                          </label>
                          <Input
                            type="date"
                            value={scheduleForm.date}
                            onChange={(e) =>
                              setScheduleForm({
                                ...scheduleForm,
                                date: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Preferred Time
                          </label>
                          <Select
                            value={scheduleForm.time}
                            onValueChange={(value) =>
                              setScheduleForm({ ...scheduleForm, time: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">
                                Morning (9AM-12PM)
                              </SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon (12PM-5PM)
                              </SelectItem>
                              <SelectItem value="evening">
                                Evening (5PM-8PM)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Special Instructions
                        </label>
                        <Textarea
                          placeholder="Any special instructions for pickup..."
                          value={scheduleForm.notes}
                          onChange={(e) =>
                            setScheduleForm({
                              ...scheduleForm,
                              notes: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={handleSchedulePickup}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Pickup ({selectedItems.length} items)
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Drop-off Locations Tab */}
            <TabsContent value="locations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dropOffLocations.map((location, index) => (
                  <Card
                    key={index}
                    className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">{location.name}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-yellow-600">★</span>
                          <span className="text-sm">{location.rating}</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm">{location.address}</p>
                          <p className="text-xs text-green-600">
                            {location.distance} away
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Clock className="h-4 w-4 text-gray-500 mt-1" />
                        <p className="text-sm">{location.hours}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Accepts:</p>
                        <div className="flex flex-wrap gap-1">
                          {location.accepts.map((category, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                        <Button size="sm" variant="outline">
                          <Truck className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recycling Guide Tab */}
            <TabsContent value="guide" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shirt className="h-5 w-5 text-green-600" />
                      <span>Clothing & Textiles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Cotton & Natural Fibers</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Remove buttons, zippers, and synthetic elements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                      <div>
                        <p className="font-medium">Synthetic Blends</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Check fiber content - some blends can be recycled
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                      <div>
                        <p className="font-medium">Heavily Damaged Items</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Consider textile recycling for fiber recovery
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <span>Electronics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Remove Batteries</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Separate batteries for specialized recycling
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Data Wiping</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Ensure all personal data is securely erased
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                      <div>
                        <p className="font-medium">Certified Recyclers</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Use only certified e-waste recycling facilities
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-green-600" />
                      <span>Packaging Materials</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Cardboard & Paper</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Remove tape and plastic elements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Biodegradable Packaging</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Can be composted in industrial facilities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Leaf className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Reuse First</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Consider reusing packaging for storage or shipping
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-green-600" />
                      <span>Donation Options</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Good Condition Items</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Donate to local charities or community centers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Educational Materials</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Schools and libraries often accept books and supplies
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Leaf className="h-4 w-4 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Extend Product Life</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Donation is often better than recycling
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
