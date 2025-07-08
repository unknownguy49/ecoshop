"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import {
  Mail,
  Lock,
  LogIn,
  Leaf,
  Shield,
  Eye,
  EyeOff,
  User,
  LogOut,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { isAuthenticated, user, login, signup, logout } = useAuth();
  const router = useRouter();

  const handleLoginChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginData.username, loginData.password);
    if (success) {
      router.push("/dashboard"); // Redirect to dashboard after login
    } else {
      setError("Invalid credentials. Please check your username and password.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const success = signup(
      signupData.username,
      signupData.password,
      signupData.email
    );
    if (success) {
      router.push("/dashboard"); // Redirect to dashboard after signup
    } else {
      setError("Username already exists. Please choose a different username.");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/"); // Redirect to home after logout
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Profile
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back to EcoShop!
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Logged in as</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {user?.username}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    Account Status
                  </h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Membership:</span>
                      <span className="text-green-600 font-medium">
                        Eco Warrior
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO₂ Saved:</span>
                      <span className="text-blue-600 font-medium">15.2kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orders:</span>
                      <span className="font-medium">3 eco-friendly orders</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome to EcoShop
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Login to your account or create a new one to start shopping
            sustainably
          </p>
        </div>

        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="p-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-username">Username</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) =>
                          handleLoginChange("username", e.target.value)
                        }
                        className="pl-10 border-green-200 focus:border-green-500"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) =>
                          handleLoginChange("password", e.target.value)
                        }
                        className="pl-10 pr-10 border-green-200 focus:border-green-500"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-username">Username</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="signup-username"
                        type="text"
                        value={signupData.username}
                        onChange={(e) =>
                          handleSignupChange("username", e.target.value)
                        }
                        className="pl-10 border-green-200 focus:border-green-500"
                        placeholder="Choose username"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email (optional)</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) =>
                          handleSignupChange("email", e.target.value)
                        }
                        className="pl-10 border-green-200 focus:border-green-500"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={(e) =>
                          handleSignupChange("password", e.target.value)
                        }
                        className="pl-10 pr-10 border-green-200 focus:border-green-500"
                        placeholder="Create password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm-password">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          handleSignupChange("confirmPassword", e.target.value)
                        }
                        className="pl-10 pr-10 border-green-200 focus:border-green-500"
                        placeholder="Confirm password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Join the Green Revolution Card */}
        <Card className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <h3 className="font-semibold text-center mb-3 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-green-600 mr-2" />
              Join the Green Revolution
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-green-600">50K+</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Eco Warriors
                </div>
              </div>
              <div>
                <div className="font-bold text-blue-600">2.5M</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Bottles Saved
                </div>
              </div>
              <div>
                <div className="font-bold text-emerald-600">150K</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Tons CO₂ Reduced
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
