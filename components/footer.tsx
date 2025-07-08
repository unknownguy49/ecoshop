import Link from "next/link";
import { Leaf, Heart, Recycle, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-teal-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-green-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="h-8 w-8 text-green-400 animate-pulse-green" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                EcoShop
              </span>
            </div>
            <p className="text-green-100 mb-6 leading-relaxed">
              Building a sustainable future through conscious shopping. Every
              purchase makes a difference for our planet.
            </p>
            <div className="flex items-center space-x-2 text-green-200">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm">Made with love for Earth</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Shop Green", href: "/shop" },
                { name: "Sustainability Dashboard", href: "/dashboard" },
                { name: "Eco Delivery", href: "/delivery" },
                { name: "Recycling Center", href: "/recycle" },
                { name: "Green Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-green-300 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <Recycle className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-300">
              Our Impact
            </h3>
            <div className="space-y-4">
              <div className="bg-green-800/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-green-400">2.5M+</div>
                <div className="text-sm text-green-200">
                  Plastic bottles saved
                </div>
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-emerald-400">150K+</div>
                <div className="text-sm text-green-200">CO₂ tons reduced</div>
              </div>
              <div className="bg-teal-800/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-teal-400">50K+</div>
                <div className="text-sm text-green-200">Happy eco-shoppers</div>
              </div>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-300">
              Stay Connected
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2 text-green-200">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@ecoshop.com</span>
              </div>
              <div className="flex items-center space-x-2 text-green-200">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) ECO-SHOP</span>
              </div>
              <div className="flex items-center space-x-2 text-green-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Green Valley, Earth</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-green-200">Get eco-tips & updates</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-green-800/30 border-green-600 text-white placeholder:text-green-300"
                />
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-green-200 text-sm">
              <Globe className="h-4 w-4" />
              <span>© 2025 EcoShop. Building a sustainable future.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-green-200 hover:text-green-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-green-200 hover:text-green-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sustainability"
                className="text-green-200 hover:text-green-300 transition-colors"
              >
                Sustainability Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-4 right-4">
        <Button
          size="icon"
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full animate-pulse-green"
        >
          <Recycle className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
}
