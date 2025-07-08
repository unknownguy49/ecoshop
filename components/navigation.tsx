"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import {
  Leaf,
  ShoppingCart,
  BarChart3,
  Truck,
  History,
  Recycle,
  Package,
  BookOpen,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Public navigation items (visible to everyone)
const publicNavigation = [
  { name: "Home", href: "/", icon: Leaf },
  { name: "Shop", href: "/shop", icon: ShoppingCart },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

// Private navigation items (visible only when logged in)
const privateNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Orders", href: "/orders", icon: History },
  { name: "Delivery", href: "/delivery", icon: Truck },
  { name: "Packaging", href: "/packaging", icon: Package },
  { name: "Recycle", href: "/recycle", icon: Recycle },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  // Combine navigation items based on authentication status
  const navigation = isAuthenticated
    ? [...publicNavigation, ...privateNavigation]
    : publicNavigation;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-200 dark:border-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Leaf className="h-8 w-8 text-green-600 group-hover:text-green-700 transition-colors animate-pulse-green" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              EcoShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-green-100 dark:hover:bg-green-900/50",
                    isActive
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-700 dark:text-green-300"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.name === "Shop" && isAuthenticated && cartItems > 0 && (
                    <Badge className="ml-1 bg-green-500 hover:bg-green-600 text-white">
                      {cartItems}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Auth & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Authentication Section */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user?.username}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/profile">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-700 dark:text-green-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {item.name === "Shop" &&
                      isAuthenticated &&
                      cartItems > 0 && (
                        <Badge className="ml-auto bg-green-500 hover:bg-green-600 text-white">
                          {cartItems}
                        </Badge>
                      )}
                  </Link>
                );
              })}

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {user?.username}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
