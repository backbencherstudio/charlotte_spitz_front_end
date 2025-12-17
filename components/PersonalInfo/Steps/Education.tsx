"use client";

import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface EducationData {
  degree: string;
  institution: string;
  result: string;
  passingYear: string;
  location: string;
}

interface EducationStepProps {
  data: EducationData[];
  onUpdate: (data: EducationData[]) => void;
  onSnapshot?: (getter: () => EducationData[]) => void;
}

export default function EducationStep({
  data,
  onUpdate,
  onSnapshot,
}: EducationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<{ educations: EducationData[] }>({
    defaultValues: { educations: data },
  });

  const getErrorMessage = (
    idx: number,
    key: keyof EducationData
  ): string | undefined => {
    const edErrors = (
      errors as unknown as {
        educations?: Array<
          Partial<Record<keyof EducationData, { message?: string }>>
        >;
      }
    ).educations;
    const msg = edErrors?.[idx]?.[key]?.message;
    return typeof msg === "string" ? msg : undefined;
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  // Provide snapshot getter for parent to pull values on navigation
  useEffect(() => {
    onSnapshot?.(() => getValues().educations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure at least one education block exists
  const ensuredOnceRef = useRef(false);
  useEffect(() => {
    if (ensuredOnceRef.current) return;
    const current = getValues().educations || [];
    if (!current.length) {
      append({
        degree: "",
        institution: "",
        result: "",
        passingYear: "",
        location: "",
      });
    }
    ensuredOnceRef.current = true;
  }, [append, getValues]);

  const onSubmit = (formData: { educations: EducationData[] }) => {
    onUpdate(formData.educations);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Education
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1D1F2C]">
                Education {index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center justify-center h-8 w-8 border border-[#5952FF] text-[#5952FF] rounded-sm cursor-pointer hover:bg-[#5952FF]/10"
                  aria-label="Remove education"
                  title="Remove education"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div>
              <Label
                htmlFor={`degree-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Degree/Certificate
              </Label>
              <input
                id={`degree-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter degree"
                {...register(`educations.${index}.degree` as const, {
                  required: "Degree is required",
                })}
              />
              {getErrorMessage(index, "degree") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "degree")}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor={`institution-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Institution Name
              </Label>
              <input
                id={`institution-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter institution name"
                {...register(`educations.${index}.institution` as const, {
                  required: "Institution name is required",
                })}
              />
              {getErrorMessage(index, "institution") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "institution")}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor={`passingYear-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Passing Year:
              </Label>
              <input
                id={`passingYear-${index}`}
                type="date"
                placeholder="Enter passing year"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                {...register(`educations.${index}.passingYear` as const, {
                  required: "Passing year is required",
                })}
              />
              {getErrorMessage(index, "passingYear") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "passingYear")}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor={`result-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Result/CGPA:
              </Label>
              <input
                id={`result-${index}`}
                type="number"
                step="0.01"
                min="0"
                max="5"
                placeholder="e.g., 3.75"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                {...register(`educations.${index}.result` as const, {
                  required: "Result is required",
                  validate: (value) => {
                    const n = Number(value);
                    if (Number.isNaN(n)) return "Enter a valid number";
                    if (n < 0 || n > 5) return "Result must be between 0 and 5";
                    return true;
                  },
                })}
              />
              {getErrorMessage(index, "result") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "result")}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor={`location-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Location
              </Label>
              <input
                id={`location-${index}`}
                type="text"
                placeholder="Enter location"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                {...register(`educations.${index}.location` as const, {
                  required: "Location is required",
                })}
              />
              {getErrorMessage(index, "location") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "location")}
                </span>
              )}
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={() =>
              append({
                degree: "",
                institution: "",
                result: "",
                passingYear: "",
                location: "",
              })
            }
            className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Plus size={18} />
            <span>Add another one</span>
          </button>
        </div>
      </form>
    </div>
  );
}
