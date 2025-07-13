"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Leaf,
  Recycle,
  Package,
  MapPin,
  Search,
  ShoppingCart,
  Heart,
  Star,
  TrendingDown,
  Award,
} from "lucide-react";
import Image from "next/image";

type CarbonFootprint = "very-low" | "low" | "medium" | "high";
type BadgeType = "organic" | "recyclable" | "low-packaging" | "locally-sourced";
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badges: BadgeType[];
  carbonFootprint: CarbonFootprint;
  description: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image:
      "https://image.hm.com/assets/hm/06/c3/06c3e1d558e9a93ee2bd251cbdaefcbda928a17d.jpg?imwidth=1260",
    rating: 4.8,
    reviews: 124,
    badges: ["organic", "recyclable", "low-packaging"],
    carbonFootprint: "low",
    description:
      "Soft, breathable organic cotton tee made from sustainable farming practices.",
    category: "clothing",
  },
  {
    id: 2,
    name: "Bamboo Water Bottle",
    price: 24.99,
    image:
      "https://cdn.shopify.com/s/files/1/1616/9509/products/SS_570x570_crop_center@2x.jpg?v=1611093585",
    rating: 4.9,
    reviews: 89,
    badges: ["recyclable", "locally-sourced"],
    carbonFootprint: "very-low",
    description: "Eco-friendly bamboo water bottle with leak-proof design.",
    category: "accessories",
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://m.media-amazon.com/images/I/71TmDbz-G-L._AC_SL1500_.jpg",
    rating: 4.7,
    reviews: 156,
    badges: ["recyclable", "low-packaging"],
    carbonFootprint: "medium",
    description: "Portable solar charger with high-efficiency panels.",
    category: "electronics",
  },
  {
    id: 4,
    name: "Organic Skincare Set",
    price: 89.99,
    image:
      "https://i.pinimg.com/originals/3d/d6/1f/3dd61f6ca74afa7196878eaae78fd259.jpg",
    rating: 4.9,
    reviews: 203,
    badges: ["organic", "recyclable", "locally-sourced"],
    carbonFootprint: "low",
    description:
      "Complete skincare routine with certified organic ingredients.",
    category: "beauty",
  },
  {
    id: 5,
    name: "Recycled Yoga Mat",
    price: 39.99,
    image:
      "https://images.squarespace-cdn.com/content/5429e65fe4b0a96a7d7b36fc/1576201058571-YCC6LBGXIKB8MIZ71QFV/SugaMat.1.jpg?format=1500w&content-type=image%2Fjpeg",
    rating: 4.6,
    reviews: 78,
    badges: ["recyclable", "low-packaging"],
    carbonFootprint: "low",
    description: "Non-slip yoga mat made from recycled materials.",
    category: "fitness",
  },
  {
    id: 6,
    name: "Biodegradable Phone Case",
    price: 19.99,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.12lWxcy1LBuQvBGiYrlwnAHaFa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.5,
    reviews: 92,
    badges: ["organic", "recyclable"],
    carbonFootprint: "very-low",
    description: "Protective phone case that naturally decomposes.",
    category: "accessories",
  },
];

const badgeConfig = {
  organic: { icon: Leaf, label: "Organic", color: "bg-green-500" },
  recyclable: { icon: Recycle, label: "Recyclable", color: "bg-blue-500" },
  "low-packaging": {
    icon: Package,
    label: "Low Packaging",
    color: "bg-purple-500",
  },
  "locally-sourced": { icon: MapPin, label: "Local", color: "bg-orange-500" },
};

const carbonColors = {
  "very-low": "text-green-600",
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ecoOnly, setEcoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Eco-friendly only filter
    if (ecoOnly) {
      filtered = filtered.filter(
        (product) =>
          product.badges.includes("organic") ||
          product.badges.includes("recyclable")
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "carbon":
        const carbonOrder = { "very-low": 0, low: 1, medium: 2, high: 3 };
        filtered.sort(
          (a, b) =>
            carbonOrder[a.carbonFootprint as CarbonFootprint] -
            carbonOrder[b.carbonFootprint as CarbonFootprint]
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, ecoOnly, sortBy]);

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Green Storefront
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover eco-friendly products that make a difference for our
            planet.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-8 shadow-lg border border-green-200 dark:border-green-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="carbon">
                  Carbon Footprint: Low → High
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Eco Filter */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eco-only"
                checked={ecoOnly}
                onCheckedChange={(checked) => setEcoOnly(checked === true)}
              />
              <label htmlFor="eco-only" className="text-sm font-medium">
                Eco-friendly only
              </label>
            </div>

            {/* Cart Info */}
            <div className="flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-lg px-4 py-2">
              <ShoppingCart className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {cart.length} items
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.badges.map((badge) => {
                    const config = badgeConfig[badge as BadgeType];
                    return (
                      <Badge
                        key={badge}
                        className={`${config.color} text-white text-xs`}
                      >
                        <config.icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    );
                  })}
                </div>

                {/* Wishlist */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </Button>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <Badge className="absolute bottom-3 left-3 bg-red-500 text-white">
                    Sale
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown
                      className={`h-4 w-4 ${
                        carbonColors[product.carbonFootprint as CarbonFootprint]
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        carbonColors[product.carbonFootprint as CarbonFootprint]
                      }`}
                    >
                      {product.carbonFootprint.replace("-", " ")} carbon
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {product.reviews} reviews
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex space-x-2 w-full">
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <Award className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Sustainable Swap Suggestions */}
        <div className="mt-16 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Sustainable Swap Suggestions
            </span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Consider these eco-friendly alternatives for a greener lifestyle
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Organic Cotton</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Switch to organic cotton products for better skin and
                  environment
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Recycle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Recycled Materials</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose products made from recycled materials to reduce waste
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Package className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Minimal Packaging</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Opt for products with minimal or biodegradable packaging
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
