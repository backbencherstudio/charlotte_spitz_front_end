"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface PersonalInfoData {
  fullName: string;
  phoneNumber: string;
  email: string;
  city_and_state: string;
  resumeType: string;
  linkedinUrl: string;
  websiteUrl: string;
  professionalSummary: string;
  includeFullAddress: boolean;
}
interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onUpdate: (data: PersonalInfoData) => void;
  onSnapshot?: (getter: () => PersonalInfoData) => void;
}

export default function PersonalInfoStep({
  data,
  onUpdate,
  onSnapshot,
}: PersonalInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<PersonalInfoData>({
    defaultValues: data,
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSnapshot?.(() => getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (formData: PersonalInfoData) => {
    const data = {
      ...formData,
      profileImage
    }
    onUpdate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCircleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Let&apos;s Start With the Basics
      </h2>

      {/* Profile Photo Upload */}
      <div className="flex flex-col items-center mb-8">
        <div
          onClick={handleCircleClick}
          className="relative w-24 h-24 rounded-full border-2 border-dashed border-[#5952FF] cursor-pointer overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors group"
          title="Click to upload photo"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-[#5952FF] transition-colors">
              {/* Camera icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
              <span className="text-xs font-medium">Add Photo</span>
            </div>
          )}

          {/* Overlay on hover when image is present */}
          {profileImage && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <p className="mt-2 text-xs text-gray-400">
          {profileImage ? "Click to change photo" : "Upload profile photo (optional)"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="fullName"
              className="block mb-2 font-medium text-headerColor"
            >
              Full Name
            </Label>
            <input
              id="fullName"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter legal name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <span className="text-red-600 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="phoneNumber"
              className="block mb-2 font-medium text-headerColor"
            >
              Phone Number
            </Label>
            <input
              id="phoneNumber"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter your number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-600 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className="block mb-2 font-medium text-headerColor"
            >
              Email Address
            </Label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="cityState"
              className="block mb-2 font-medium text-headerColor"
            >
              City & State
            </Label>
            <input
              id="cityState"
              placeholder="Enter your city & state"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("city_and_state", {
                required: "City & State is required",
              })}
            />
            {errors.city_and_state && (
              <span className="text-red-600 text-sm">
                {errors.city_and_state.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="resumeType"
              className="block mb-2 font-medium text-headerColor"
            >
              Resume Type
            </Label>
            <Select onValueChange={(value) => setValue("resumeType", value)}>
              <SelectTrigger className="w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF] cursor-pointer py-6 px-6">
                <SelectValue placeholder="Select" defaultValue="STANDARD" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="STANDARD">Standard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.city_and_state && (
              <span className="text-red-600 text-sm">
                {errors.city_and_state.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="resumeType"
              className="block mb-2 font-medium text-headerColor"
            >
              Do you want your full address on your resume? (Yes/No)
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("includeFullAddress", value === "true")
              }
            >
              <SelectTrigger className="w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF] cursor-pointer py-6 px-6">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.includeFullAddress && (
              <span className="text-red-600 text-sm">
                {errors.includeFullAddress.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="linkedinUrl"
              className="block mb-2 font-medium text-headerColor"
            >
              LinkedIn URL (optional)
            </Label>
            <input
              id="linkedinUrl"
              {...register("linkedinUrl")}
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
            />
          </div>

          <div>
            <Label
              htmlFor="websiteUrl"
              className="block mb-2 font-medium text-headerColor"
            >
              Website/Portfolio URL (optional)
            </Label>
            <input
              id="websiteUrl"
              {...register("websiteUrl")}
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
            />
          </div>

          <div className="md:col-span-2">
            <Label
              htmlFor="summary"
              className="block mb-2 font-medium text-headerColor"
            >
              Professional Summary/Objective (optional)
            </Label>
            <textarea
              id="summary"
              placeholder="Write a concise summary of your career goals and key achievements."
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              rows={4}
              {...register("professionalSummary")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}