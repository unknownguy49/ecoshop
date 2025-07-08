"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  email?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string, email?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      const { isAuthenticated: saved, user: savedUser } = JSON.parse(savedAuth);
      setIsAuthenticated(saved);
      setUser(savedUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Admin account for testing - not exposed to UI
    if (username === "johndoe" && password === "johndoe") {
      setIsAuthenticated(true);
      setUser({ username });
      localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthenticated: true, user: { username } })
      );
      return true;
    }

    // Check for registered users in localStorage
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const foundUser = registeredUsers.find(
      (u: any) => u.username === username && u.password === password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser({ username: foundUser.username, email: foundUser.email });
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: { username: foundUser.username, email: foundUser.email },
        })
      );
      return true;
    }

    return false;
  };

  const signup = (
    username: string,
    password: string,
    email?: string
  ): boolean => {
    // Check if username already exists
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const userExists = registeredUsers.find(
      (u: any) => u.username === username
    );

    if (userExists) {
      return false; // Username already taken
    }

    // Register new user
    const newUser = { username, password, email };
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Automatically log in the new user
    setIsAuthenticated(true);
    setUser({ username, email });
    localStorage.setItem(
      "auth",
      JSON.stringify({ isAuthenticated: true, user: { username, email } })
    );
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
