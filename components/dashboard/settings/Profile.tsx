"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

import { toast } from "sonner";
import Image from "next/image";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/src/redux/features/(auth)/profile";

export default function Profile() {
  const { data: profileData } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    language: "",
    image: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Set default values when profileData is available
  useEffect(() => {
    const func = () => {
      if (profileData?.data) {
        const avatarUrl = profileData.data.userProfile?.avatar || "";
        setFormData({
          first_name: profileData.data.userProfile?.firstName || "",
          last_name: profileData.data.userProfile?.lastName || "",
          email: profileData.data.email || "",
          phoneNumber: profileData.data.userProfile?.phoneNumber || "",
          designation: profileData.data.userProfile?.designation || "",
          language: profileData.data.userProfile?.language || "",
          image: avatarUrl,
        });
        setImagePreview(avatarUrl);
      }
    };
    func();
  }, [profileData]);

  // Cleanup blob URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const payload = new FormData();

    payload.append("firstName", formData.first_name);
    payload.append("lastName", formData.last_name);
    payload.append("email", formData.email);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("designation", formData.designation);
    payload.append("language", formData.language);

    if (selectedImageFile) {
      payload.append("image", selectedImageFile);
    }

    try {
      const res = await updateProfile(payload);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Section - Read-only Profile Display */}
        <Card className="bg-card py-6">
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="size-28 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {profileData?.data?.userProfile?.avatar ? (
                    <Image
                      src={profileData?.data?.userProfile?.avatar}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  ) : (
                    <User className="size-16 text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">
                  {profileData?.data?.userProfile?.firstName}{" "}
                  {profileData?.data?.userProfile?.lastName || ""}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {profileData?.data?.userProfile?.designation || "N/A"}
                </p>
                <p className="text-sm font-semibold">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Personal Information</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Name:</span>
                  <span className="font-bold text-sm">
                    {profileData?.data?.userProfile?.firstName}{" "}
                    {profileData?.data?.userProfile?.lastName || ""}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Email Address:
                  </span>
                  <span className="font-bold text-sm">
                    {profileData?.data?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Phone Number:
                  </span>
                  <span className="font-bold text-sm">
                    {profileData?.data?.userProfile?.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Designation:
                  </span>
                  <span className="font-bold text-sm">
                    {profileData?.data?.userProfile?.designation || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">
                    Languages:
                  </span>
                  <span className="font-bold text-sm">
                    {profileData?.data?.userProfile?.language || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Section - Editable Profile Form */}
        <Card className="bg-card py-6">
          <CardHeader>
            <div className="flex items-center gap-2 justify-between">
              <Button variant="outline" className="bg-[#E2DEFF] text-[#5952FF]">
                Edit profile
              </Button>
              <Button onClick={handleSave} className="bg-[#5952FF] text-white">
                Save
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Profile Image</h4>
              <div className="relative inline-block">
                <div className="size-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-[#5952FF]">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  ) : (
                    <User className="size-16 text-muted-foreground" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 size-8 rounded-full bg-amber-50 text-black flex items-center justify-center border-2 border-background shadow-sm transition-colors cursor-pointer hover:bg-amber-100"
                >
                  <Pencil className="size-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      // Clean up previous blob URL if it exists
                      if (imagePreview && imagePreview.startsWith("blob:")) {
                        URL.revokeObjectURL(imagePreview);
                      }
                      setSelectedImageFile(file);
                      const previewUrl = URL.createObjectURL(file);
                      setImagePreview(previewUrl);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="font-bold">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter your name"
                  value={formData.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="font-bold">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="font-bold">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation" className="font-bold">
                  Designation
                </Label>
                <Select
                  value={formData.designation}
                  onValueChange={(value) =>
                    handleInputChange("designation", value)
                  }
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
                <Label htmlFor="languages" className="font-bold">
                  Languages
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    handleInputChange("language", value)
                  }
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
