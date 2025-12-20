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
import { useEffect } from "react";
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
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<PersonalInfoData>({
    defaultValues: data,
  });

  // Provide a snapshot getter to parent so it can pull latest values on navigation
  useEffect(() => {
    onSnapshot?.(() => getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (formData: PersonalInfoData) => {
    onUpdate(formData);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Let&apos;s Start With the Basics
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="fullName"
              className="block mb-2 font-medium text-[#1D1F2C]"
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
              className="block mb-2 font-medium text-[#1D1F2C]"
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
              className="block mb-2 font-medium text-[#1D1F2C]"
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
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              City & State
            </Label>
            <input
              id="cityState"
              placeholder="Bangladesh"
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
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Resume Type
            </Label>
            <Select onValueChange={(value) => setValue("resumeType", value)}>
              <SelectTrigger className="w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF] cursor-pointer py-6 px-6">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Resume Types</SelectLabel>
                  <SelectItem value="Standard">Standard</SelectItem>
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
              className="block mb-2 font-medium text-[#1D1F2C]"
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
              className="block mb-2 font-medium text-[#1D1F2C]"
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
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Website/Portfolio URL (optional)
            </Label>
            <input
              id="websiteUrl"
              {...register("websiteUrl")}
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
            />
          </div>

          {/* <div className="md:col-span-2">
            <Label
              htmlFor="summary"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Website/Portfolio URL (optional)
            </Label>
            <input
              id="websiteUrl"
              {...register("websiteUrl")}
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
            />
          </div> */}
          {/* <div className="md:col-span-2">
            <Label
              htmlFor="summary"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Professional Summary/Objective (optional)
            </Label>
            <input
              id="websiteUrl"
              {...register('websiteUrl')}
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
            />
          </div> */}
          <div className="md:col-span-2">
            <Label
              htmlFor="summary"
              className="block mb-2 font-medium text-[#1D1F2C]"
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
