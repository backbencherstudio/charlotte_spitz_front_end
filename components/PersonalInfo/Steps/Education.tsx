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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface EducationData {
  degree: string;
  institution: string;
  result: string;
  passingYear: string;
  location: string;
}

interface EducationStepProps {
  data: EducationData;
  onUpdate: (data: EducationData) => void;
}

export default function EducationStep({ data, onUpdate }: EducationStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EducationData>({
    defaultValues: data,
  });

  const onSubmit = (formData: EducationData) => {
    onUpdate(formData);
  };

  return (
    <div>
      <h2 className="text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Education
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="degree"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Degree/Certificate
            </Label>
            <input
              id="degree"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter degree"
              {...register("degree", { required: "Degree is required" })}
            />
            {errors.degree && (
              <span className="text-red-600 text-sm">
                {errors.degree.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="institution"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Institution Name
            </Label>
            <input
              id="institution"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter institution name"
              {...register("institution", {
                required: "Institution name is required",
              })}
            />
            {errors.institution && (
              <span className="text-red-600 text-sm">
                {errors.institution.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="passingYear"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Passing Year:
            </Label>
            <input
              id="passingYear"
              type="date"
              placeholder="Enter passing year"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("passingYear", {
                required: "Passing year is required",
              })}
            />
            {errors.passingYear && (
              <span className="text-red-600 text-sm">
                {errors.passingYear.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="resumeType"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Result/CGPA:
            </Label>
            <Select onValueChange={(value) => setValue("result", value)}>
              <SelectTrigger className="w-full border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF] cursor-pointer py-6 px-6">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Result Types</SelectLabel>
                  <SelectItem value="1">3.00</SelectItem>
                  <SelectItem value="2">3.50</SelectItem>
                  <SelectItem value="3">4.00</SelectItem>
                  <SelectItem value="4">4.50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.result && (
              <span className="text-red-600 text-sm">
                {errors.result.message}
              </span>
            )}
          </div>

          <div className="md:col-span-2">
            <Label
              htmlFor="location"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Location
            </Label>
            <input
              id="location"
              type="text"
              placeholder="Enter location"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("location", {
                required: "Location is required",
              })}
            />
            {errors.location && (
              <span className="text-red-600 text-sm">
                {errors.location.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <button className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer">
            <Plus size={18} />
            <span>Add another one</span>
          </button>
        </div>
      </form>
    </div>
  );
}
