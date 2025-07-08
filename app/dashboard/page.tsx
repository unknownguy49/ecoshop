"use client";

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Recycle,
  TrendingDown,
  MapPin,
  Package,
  Award,
  Leaf,
  Globe,
  Droplets,
  Zap,
  TreePine,
  Target,
} from "lucide-react";

const impactData = [
  { month: "Jan", plastic: 45, co2: 12, packaging: 8 },
  { month: "Feb", plastic: 52, co2: 15, packaging: 10 },
  { month: "Mar", plastic: 48, co2: 18, packaging: 12 },
  { month: "Apr", plastic: 61, co2: 22, packaging: 15 },
  { month: "May", plastic: 55, co2: 25, packaging: 18 },
  { month: "Jun", plastic: 67, co2: 28, packaging: 20 },
];

const categoryData = [
  { name: "Clothing", value: 35, color: "#10b981" },
  { name: "Electronics", value: 25, color: "#3b82f6" },
  { name: "Beauty", value: 20, color: "#8b5cf6" },
  { name: "Home", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ef4444" },
];

const achievements = [
  {
    title: "Eco Newbie",
    description: "Made your first sustainable purchase",
    earned: true,
    icon: Leaf,
    color: "text-green-500",
  },
  {
    title: "Plastic Saver",
    description: "Saved 50+ plastic bottles equivalent",
    earned: true,
    icon: Recycle,
    color: "text-blue-500",
  },
  {
    title: "Carbon Warrior",
    description: "Reduced 100kg+ CO₂ emissions",
    earned: true,
    icon: TrendingDown,
    color: "text-purple-500",
  },
  {
    title: "Local Hero",
    description: "Bought 20+ locally sourced products",
    earned: false,
    icon: MapPin,
    color: "text-orange-500",
  },
  {
    title: "Green Guardian",
    description: "Achieved 1 year of sustainable shopping",
    earned: false,
    icon: Award,
    color: "text-yellow-500",
  },
];

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    plastic: 0,
    co2: 0,
    distance: 0,
    packaging: 0,
  });

  const targetValues = {
    plastic: 342,
    co2: 156,
    distance: 2840,
    packaging: 89,
  };

  useEffect(() => {
    setIsVisible(true);

    // Animate counters
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        plastic: Math.floor(targetValues.plastic * progress),
        co2: Math.floor(targetValues.co2 * progress),
        distance: Math.floor(targetValues.distance * progress),
        packaging: Math.floor(targetValues.packaging * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div
            className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Sustainability Dashboard
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Track your environmental impact and celebrate your green
              achievements.
            </p>
          </div>

          {/* Impact Stats */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Plastic Saved
                    </p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {animatedValues.plastic}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      bottles equivalent
                    </p>
                  </div>
                  <Recycle className="h-12 w-12 text-green-500" />
                </div>
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    You've saved the equivalent of 50 plastic bottles this
                    month!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      CO₂ Offset
                    </p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {animatedValues.co2}kg
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      carbon reduced
                    </p>
                  </div>
                  <TrendingDown className="h-12 w-12 text-blue-500" />
                </div>
                <div className="mt-4">
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Equivalent to planting 7 trees!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      Distance Reduction
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {animatedValues.distance}km
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      local products
                    </p>
                  </div>
                  <MapPin className="h-12 w-12 text-purple-500" />
                </div>
                <div className="mt-4">
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    Supporting local businesses!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      Packaging Waste
                    </p>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {animatedValues.packaging}%
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      reduction
                    </p>
                  </div>
                  <Package className="h-12 w-12 text-orange-500" />
                </div>
                <div className="mt-4">
                  <Progress value={89} className="h-2" />
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    Minimal packaging choices!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Impact Over Time */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5 text-green-600" />
                  <span>Impact Over Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="plastic"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="co2"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="packaging"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-green-600" />
                  <span>Purchase Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="border-green-200 dark:border-green-800 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-600" />
                <span>Your Green Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.earned
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 opacity-60"
                    }`}
                  >
                    <div className="text-center">
                      <achievement.icon
                        className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`}
                      />
                      <h3 className="font-semibold text-sm mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        {achievement.description}
                      </p>
                      <Badge
                        variant={achievement.earned ? "default" : "secondary"}
                        className={
                          achievement.earned
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                        }
                      >
                        {achievement.earned ? "Earned" : "Locked"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Comparisons */}
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-green-600" />
                <span>Environmental Impact Comparisons</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl">
                  <Droplets className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    2,500L
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Water saved equivalent to 50 showers
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl">
                  <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    450kWh
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Energy saved = 1 month of LED lighting
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl">
                  <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    12 Trees
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Equivalent trees planted through your choices
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-xl">
                  <Target className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    85%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Progress toward your sustainability goals
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
