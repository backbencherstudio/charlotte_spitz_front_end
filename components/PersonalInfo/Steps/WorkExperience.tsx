"use client";

import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface WorkExperienceData {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string;
  achievements: string;
}

interface WorkExperienceStepProps {
  data: WorkExperienceData;
  onUpdate: (data: WorkExperienceData) => void;
}

export default function WorkExperienceStep({
  data,
  onUpdate,
}: WorkExperienceStepProps) {
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WorkExperienceData>({
    defaultValues: data,
  });

  const onSubmit = (formData: WorkExperienceData) => {
    onUpdate(formData);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Work Experience
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="jobTitle"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Job Title
            </Label>
            <input
              id="jobTitle"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter job title"
              {...register("jobTitle", { required: "Job title is required" })}
            />
            {errors.jobTitle && (
              <span className="text-red-600 text-sm">
                {errors.jobTitle.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="companyName"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Company Name
            </Label>
            <input
              id="companyName"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter company name"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <span className="text-red-600 text-sm">
                {errors.companyName.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="startDate"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Start Date
            </Label>
            <input
              id="startDate"
              type="date"
              placeholder="Enter start date"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("startDate", {
                required: "Start date is required",
              })}
            />
            {errors.startDate && (
              <span className="text-red-600 text-sm">
                {errors.startDate.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="endDate"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              End Date
            </Label>
            <input
              id="endDate"
              type="date"
              placeholder="Enter end date"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("endDate", {
                required: "End date is required",
              })}
            />
            {errors.endDate && (
              <span className="text-red-600 text-sm">
                {errors.endDate.message}
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
          <div className="md:col-span-2">
            <Label
              htmlFor="responsibilities"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              List your responsibilities
            </Label>
            <textarea
              id="responsibilities"
              placeholder="List your responsibilities in this role."
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              rows={4}
              {...register("responsibilities")}
            />
          </div>
          <div className="md:col-span-2">
            <Label
              htmlFor="achievements"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              List your achievements
            </Label>
            <textarea
              id="achievements"
              placeholder="List your achievements in this role."
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              rows={4}
              {...register("achievements")}
            />
          </div>
        </div>
        <div>
          <button className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer">
            <Plus size={18} />
            <span>Add another experience</span>
          </button>
        </div>
      </form>
    </div>
  );
}
