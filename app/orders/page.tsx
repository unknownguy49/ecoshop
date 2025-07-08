"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Truck,
  CheckCircle,
  Recycle,
  Leaf,
  TrendingDown,
  MapPin,
  Calendar,
  RotateCcw,
  Gift,
  Star,
} from "lucide-react";
import Image from "next/image";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 89.97,
    items: [
      {
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
        sustainability: { plastic: 2, co2: 0.8, packaging: "biodegradable" },
      },
      {
        name: "Bamboo Water Bottle",
        price: 24.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        sustainability: { plastic: 5, co2: 0.3, packaging: "recyclable" },
      },
    ],
    delivery: "Green Delivery",
    totalImpact: { plastic: 7, co2: 1.1, trees: 0.5 },
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    status: "delivered",
    total: 149.98,
    items: [
      {
        name: "Solar Power Bank",
        price: 49.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        sustainability: { plastic: 8, co2: 1.2, packaging: "minimal" },
      },
      {
        name: "Organic Skincare Set",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        sustainability: { plastic: 12, co2: 0.6, packaging: "biodegradable" },
      },
    ],
    delivery: "Standard Delivery",
    totalImpact: { plastic: 20, co2: 1.8, trees: 0.8 },
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    status: "processing",
    total: 59.98,
    items: [
      {
        name: "Recycled Yoga Mat",
        price: 39.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        sustainability: { plastic: 15, co2: 0.9, packaging: "recyclable" },
      },
      {
        name: "Biodegradable Phone Case",
        price: 19.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        sustainability: { plastic: 3, co2: 0.2, packaging: "compostable" },
      },
    ],
    delivery: "Green Delivery",
    totalImpact: { plastic: 18, co2: 1.1, trees: 0.6 },
  },
];

const statusConfig = {
  processing: { color: "bg-yellow-500", icon: Package, label: "Processing" },
  shipped: { color: "bg-blue-500", icon: Truck, label: "Shipped" },
  delivered: { color: "bg-green-500", icon: CheckCircle, label: "Delivered" },
} as const;

type OrderStatus = keyof typeof statusConfig;

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  const totalImpact = orders.reduce(
    (acc, order) => ({
      plastic: acc.plastic + order.totalImpact.plastic,
      co2: acc.co2 + order.totalImpact.co2,
      trees: acc.trees + order.totalImpact.trees,
    }),
    { plastic: 0, co2: 0, trees: 0 }
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                My Green Orders
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Track your orders and see the positive environmental impact of
              your purchases.
            </p>
          </div>

          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <Recycle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {totalImpact.plastic}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Plastic bottles saved
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {totalImpact.co2.toFixed(1)}kg
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  CO₂ emissions avoided
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {totalImpact.trees.toFixed(1)}
                </div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300">
                  Trees equivalent planted
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="border-green-200 dark:border-green-800"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Truck className="h-4 w-4" />
                            <span>{order.delivery}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            statusConfig[order.status as OrderStatus].color +
                            " text-white mb-2"
                          }
                        >
                          {React.createElement(
                            statusConfig[order.status as OrderStatus].icon,
                            { className: "h-3 w-3 mr-1" }
                          )}
                          {statusConfig[order.status as OrderStatus].label}
                        </Badge>
                        <div className="text-2xl font-bold text-green-600">
                          ${order.total}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Quantity: {item.quantity} × ${item.price}
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-xs">
                              <div className="flex items-center space-x-1 text-green-600">
                                <Recycle className="h-3 w-3" />
                                <span>
                                  {item.sustainability.plastic} bottles saved
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-blue-600">
                                <TrendingDown className="h-3 w-3" />
                                <span>{item.sustainability.co2}kg CO₂</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {item.sustainability.packaging}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Reorder
                            </Button>
                            <Button size="sm" variant="outline">
                              <Star className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Impact */}
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Leaf className="h-4 w-4 text-green-600 mr-2" />
                        Environmental Impact of This Order
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {order.totalImpact.plastic}
                          </div>
                          <div className="text-green-700 dark:text-green-300">
                            Plastic bottles saved
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {order.totalImpact.co2}kg
                          </div>
                          <div className="text-blue-700 dark:text-blue-300">
                            CO₂ emissions avoided
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-600">
                            {order.totalImpact.trees}
                          </div>
                          <div className="text-emerald-700 dark:text-emerald-300">
                            Trees equivalent
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm">
                        <Package className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                      <Button variant="outline" size="sm">
                        <Gift className="h-4 w-4 mr-2" />
                        Donate Packaging
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Delivery Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Other tab contents would filter orders by status */}
            <TabsContent value="processing">
              {orders
                .filter((order) => order.status === "processing")
                .map((order) => (
                  <div key={order.id} className="text-center py-8">
                    <Package className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Order {order.id} is being processed
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We're preparing your eco-friendly items!
                    </p>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="shipped">
              <div className="text-center py-8">
                <Truck className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No shipped orders
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your orders are either processing or delivered.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="delivered">
              {orders
                .filter((order) => order.status === "delivered")
                .map((order) => (
                  <Card
                    key={order.id}
                    className="border-green-200 dark:border-green-800 mb-4"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Delivered on{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
