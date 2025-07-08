"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Lock } from "lucide-react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Authentication Required
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please log in to access this page and view your sustainable
                shopping data.
              </p>
              <div className="space-y-3">
                <Link href="/profile">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Leaf className="h-4 w-4 mr-2" />
                    Login to Continue
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
