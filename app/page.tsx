"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  ShoppingCart,
  Recycle,
  Globe,
  TrendingDown,
  Award,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "2.5M+", label: "Plastic Bottles Saved", icon: Recycle },
    { value: "150K", label: "Tons CO₂ Reduced", icon: TrendingDown },
    { value: "50K+", label: "Eco Warriors", icon: Award },
    { value: "99%", label: "Customer Satisfaction", icon: CheckCircle },
  ];

  const features = [
    {
      icon: Leaf,
      title: "Eco-Certified Products",
      description:
        "Every product is verified for environmental impact and sustainability standards.",
    },
    {
      icon: Recycle,
      title: "Zero Waste Packaging",
      description: "Biodegradable and recyclable packaging for all orders.",
    },
    {
      icon: Globe,
      title: "Carbon Neutral Delivery",
      description:
        "Offset your delivery emissions with our green logistics network.",
    },
    {
      icon: TrendingDown,
      title: "Impact Tracking",
      description:
        "See your real-time environmental impact with every purchase.",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 -left-20 w-60 h-60 bg-emerald-200 dark:bg-emerald-800 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-200 dark:bg-teal-800 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div
              className={`space-y-8 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Retail with Purpose
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Shop Smarter.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                    Shop Greener.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reduce waste, carbon emissions, and promote conscious
                  shopping. Join thousands of eco-warriors building a
                  sustainable future, one purchase at a time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg animate-pulse-green"
                  asChild
                >
                  <Link href="/shop">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Start Eco-Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 px-8 py-4 text-lg bg-transparent"
                  asChild
                >
                  <Link href="/dashboard">
                    <Play className="mr-2 h-5 w-5" />
                    Explore Your Impact
                  </Link>
                </Button>
              </div>

              {/* Mission Statement */}
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  <strong>Our Mission:</strong> Reduce waste, carbon emissions,
                  and promote conscious shopping for a sustainable and
                  responsible future.
                </p>
              </div>
            </div>

            {/* Hero Visual */}
            <div
              className={`relative ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              } delay-300`}
            >
              <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 to-emerald-900 rounded-3xl p-8 shadow-2xl">
                {/* Rotating Stats Display */}
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {stats[currentStat].value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 flex items-center justify-center">
                    {(() => {
                      const StatIcon = stats[currentStat].icon;
                      return StatIcon ? (
                        <StatIcon className="h-5 w-5 mr-2" />
                      ) : null;
                    })()}
                    {stats[currentStat].label}
                  </div>
                </div>

                {/* Visual Elements */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center">
                    <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Eco Products</div>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center">
                    <Recycle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Zero Waste</div>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center">
                    <Globe className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                    <div className="text-sm font-medium">Carbon Neutral</div>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 text-center">
                    <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Impact Tracking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Why Choose EcoShop?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're not just another online store. We're your partner in
              building a sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <feature.icon className="h-12 w-12 text-green-500 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our community of conscious consumers and start your journey
            towards sustainable shopping today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/shop">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Browse Eco Products
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
              asChild
            >
              <Link href="/dashboard">
                <Globe className="mr-2 h-5 w-5" />
                View Impact Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Verified & Certified
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our commitment to sustainability is backed by recognized
              certifications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">B-Corp Certified</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Verified social and environmental performance
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Climate Neutral</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Certified carbon neutral operations
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">LEED Platinum</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Green building certified warehouses
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Fair Trade</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ethically sourced products
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
