"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Search,
  Calendar,
  User,
  ArrowRight,
  Leaf,
  Recycle,
  Globe,
  TrendingUp,
  Heart,
  Share2,
  Clock,
  Tag,
} from "lucide-react"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "10 Simple Ways to Reduce Your Carbon Footprint While Shopping",
    excerpt:
      "Discover practical tips to make your shopping habits more sustainable and environmentally friendly without breaking the bank.",
    content: "Full article content would go here...",
    author: "Sarah Green",
    date: "2024-01-20",
    readTime: "5 min read",
    category: "tips",
    tags: ["carbon-footprint", "sustainable-shopping", "eco-tips"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    likes: 124,
    shares: 45,
  },
  {
    id: 2,
    title: "The Rise of Carbon-Neutral Brands: What You Need to Know",
    excerpt:
      "Learn about the growing movement of carbon-neutral brands and how to identify truly sustainable companies.",
    content: "Full article content would go here...",
    author: "Mike Eco",
    date: "2024-01-18",
    readTime: "7 min read",
    category: "brands",
    tags: ["carbon-neutral", "brands", "sustainability"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    likes: 89,
    shares: 32,
  },
  {
    id: 3,
    title: "How EcoShop is Revolutionizing Sustainable E-commerce",
    excerpt: "Behind the scenes look at how our platform promotes eco-friendliness and supports conscious consumers.",
    content: "Full article content would go here...",
    author: "EcoShop Team",
    date: "2024-01-15",
    readTime: "6 min read",
    category: "platform",
    tags: ["ecoshop", "e-commerce", "innovation"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    likes: 156,
    shares: 78,
  },
  {
    id: 4,
    title: "Plastic-Free Living: A Beginner's Guide",
    excerpt:
      "Start your journey towards a plastic-free lifestyle with these easy-to-follow steps and product recommendations.",
    content: "Full article content would go here...",
    author: "Emma Plastic-Free",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "lifestyle",
    tags: ["plastic-free", "zero-waste", "lifestyle"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    likes: 203,
    shares: 91,
  },
  {
    id: 5,
    title: "The Environmental Impact of Fast Fashion vs. Sustainable Clothing",
    excerpt:
      "Compare the environmental costs of fast fashion with sustainable alternatives and learn how to make better choices.",
    content: "Full article content would go here...",
    author: "Fashion Forward",
    date: "2024-01-10",
    readTime: "9 min read",
    category: "fashion",
    tags: ["fashion", "sustainability", "environment"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    likes: 167,
    shares: 54,
  },
  {
    id: 6,
    title: "Green Technology: Innovations Shaping Our Sustainable Future",
    excerpt:
      "Explore cutting-edge green technologies that are making sustainable living more accessible and effective.",
    content: "Full article content would go here...",
    author: "Tech Green",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "technology",
    tags: ["green-tech", "innovation", "future"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    likes: 134,
    shares: 67,
  },
]

const categories = [
  { id: "all", name: "All Articles", icon: BookOpen },
  { id: "tips", name: "Eco Tips", icon: Leaf },
  { id: "brands", name: "Sustainable Brands", icon: TrendingUp },
  { id: "platform", name: "Platform Updates", icon: Globe },
  { id: "lifestyle", name: "Lifestyle", icon: Heart },
  { id: "fashion", name: "Fashion", icon: User },
  { id: "technology", name: "Technology", icon: Recycle },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Filter and sort logic would go here
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Green Living Blog
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover sustainable living tips, eco-friendly brands, and the latest in green technology. Join our
            community of conscious consumers.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-xl transition-all duration-300 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-500 text-white">Featured</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="h-4 w-4" />
                          <span>{post.shares}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={150}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300 mb-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="h-3 w-3" />
                          <span>{post.shares}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Green Living Tips</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest articles, eco-tips, and sustainable living guides delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Join 10,000+ eco-conscious readers. Unsubscribe anytime.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
