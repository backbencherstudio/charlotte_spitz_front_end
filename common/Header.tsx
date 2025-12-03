import React from "react";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Dashboard title */}
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Right side - Search bar and icons */}
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="search anything..."
              className="pl-10 w-64 h-9 bg-gray-100 border-gray-200 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300"
            />
          </div>

          {/* Notification icon */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-colors border border-gray-200">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>

          {/* User profile icon */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-colors border border-gray-200">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
