"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, User } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "Jhon",
    lastName: "",
    email: "example@gmail.com",
    phone: "089318298493",
    designation: "Admin",
    languages: "English",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Profile</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Section - Read-only Profile Display */}
        <Card className="bg-card">
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="size-28 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                  <User className="size-16 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">{formData.firstName}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.designation}
                </p>
                <p className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Personal Information</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Name:</span>
                  <span className="font-medium text-sm">
                    {formData.firstName} {formData.lastName || ""}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Email Address:
                  </span>
                  <span className="font-medium text-sm">{formData.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Phone Number:
                  </span>
                  <span className="font-medium text-sm">{formData.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Designation:
                  </span>
                  <span className="font-medium text-sm">
                    {formData.designation}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Languages:
                  </span>
                  <span className="font-medium text-sm">
                    {formData.languages}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Section - Editable Profile Form */}
        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center gap-2 justify-between">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                Edit profile
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Profile Image</h4>
              <div className="relative inline-block">
                <div className="size-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                  <User className="size-12 text-muted-foreground" />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <Pencil className="size-4" />
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Select
                  value={formData.designation}
                  onValueChange={(value) =>
                    handleInputChange("designation", value)
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger id="designation" className="w-full">
                    <SelectValue placeholder="Select your Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <Select
                  value={formData.languages}
                  onValueChange={(value) =>
                    handleInputChange("languages", value)
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger id="languages" className="w-full">
                    <SelectValue placeholder="Select your Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
