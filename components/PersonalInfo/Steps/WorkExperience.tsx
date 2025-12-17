"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface WorkExperienceData {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string;
  achievements: string;
  currentlyWorking?: boolean;
}

interface WorkExperienceStepProps {
  data: WorkExperienceData[];
  onUpdate: (data: WorkExperienceData[]) => void;
  onSnapshot?: (getter: () => WorkExperienceData[]) => void;
}

export default function WorkExperienceStep({
  data,
  onUpdate,
  onSnapshot,
}: WorkExperienceStepProps) {
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<{ experiences: WorkExperienceData[] }>({
    defaultValues: { experiences: data },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const watchedExperiences = watch("experiences");

  const getErrorMessage = (
    idx: number,
    key: keyof WorkExperienceData
  ): string | undefined => {
    const exErrors = (
      errors as unknown as {
        experiences?: Array<
          Partial<Record<keyof WorkExperienceData, { message?: string }>>
        >;
      }
    ).experiences;
    const msg = exErrors?.[idx]?.[key]?.message;
    return typeof msg === "string" ? msg : undefined;
  };

  const onSubmit = (formData: { experiences: WorkExperienceData[] }) => {
    onUpdate(formData.experiences);
  };

  // Register snapshot getter for parent
  useEffect(() => {
    onSnapshot?.(() => getValues().experiences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure at least one experience block shows by default
  const ensuredOnceRef = useRef(false);
  useEffect(() => {
    if (ensuredOnceRef.current) return;
    const current = getValues().experiences || [];
    if (!current.length) {
      append({
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        location: "",
        responsibilities: "",
        achievements: "",
        currentlyWorking: false,
      });
    }
    ensuredOnceRef.current = true;
  }, [append, getValues]);

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Work Experience
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1D1F2C]">
                Experience {index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center justify-center h-8 w-8 border border-[#5952FF] text-[#5952FF] rounded-sm cursor-pointer hover:bg-[#5952FF]/10"
                  aria-label="Remove experience"
                  title="Remove experience"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="col-span-1">
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
                {...register(`experiences.${index}.jobTitle` as const, {
                  required: "Job title is required",
                })}
              />
              {getErrorMessage(index, "jobTitle") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "jobTitle")}
                </span>
              )}
            </div>

            <div className=" col-span-1 ">
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
                {...register(`experiences.${index}.companyName` as const, {
                  required: "Company name is required",
                })}
              />
              {getErrorMessage(index, "companyName") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "companyName")}
                </span>
              )}
            </div>
            <div className=" col-span-2  grid gap-3  justify-center h-full items-center grid-cols-1 md:grid-cols-3 ">
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
                  {...register(`experiences.${index}.startDate` as const, {
                    required: "Start date is required",
                  })}
                />
                {getErrorMessage(index, "startDate") && (
                  <span className="text-red-600 text-sm">
                    {getErrorMessage(index, "startDate")}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-start lg:justify-center h-full md:mt-4  gap-4">
                  <Checkbox
                    id="currentlyWorking"
                    className="cursor-pointer rounded-sm h-5 w-5 data-[state=checked]:bg-[#5952FF] data-[state=checked]:border-[#5952FF]"
                    {...register(
                      `experiences.${index}.currentlyWorking` as const
                    )}
                  />
                  <Label
                    htmlFor="currentlyWorking"
                    className="font-medium text-[#1D1F2C] cursor-pointer"
                  >
                    Currently Working Here
                  </Label>
                </div>
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
                  disabled={watchedExperiences?.[index]?.currentlyWorking}
                  className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF] disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                  {...register(`experiences.${index}.endDate` as const, {
                    validate: (value) => {
                      if (
                        !watchedExperiences?.[index]?.currentlyWorking &&
                        !value
                      ) {
                        return "End date is required";
                      }
                      return true;
                    },
                  })}
                />
                {getErrorMessage(index, "endDate") && (
                  <span className="text-red-600 text-sm">
                    {getErrorMessage(index, "endDate")}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2 ">
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
                {...register(`experiences.${index}.location` as const, {
                  required: "Location is required",
                })}
              />
              {getErrorMessage(index, "location") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "location")}
                </span>
              )}
            </div>
            <div className="col-span-2">
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
                {...register(`experiences.${index}.responsibilities` as const)}
              />
            </div>
            <div className="col-span-2">
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
                {...register(`experiences.${index}.achievements` as const)}
              />
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={() =>
              append({
                jobTitle: "",
                companyName: "",
                startDate: "",
                endDate: "",
                location: "",
                responsibilities: "",
                achievements: "",
                currentlyWorking: false,
              })
            }
            className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Plus size={18} />
            <span>Add another experience</span>
          </button>
        </div>
      </form>
    </div>
  );
}
