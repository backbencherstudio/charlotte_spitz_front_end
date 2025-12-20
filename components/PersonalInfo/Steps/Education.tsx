"use client";

import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface EducationData {
  passingYear: string;
  location: string;
  degreeOrCertificate?: string;
  certificate?: string;
  institutionName?: string;
  resultOrCGPA?: string;
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
  const normalizedInitial = useMemo(() => {
    if (!data || !data.length) {
      return [
        {
          degreeOrCertificate: "",
          institutionName: "",
          resultOrCGPA: "",
          passingYear: "",
          location: "",
        },
      ];
    }
    return data.map((item: EducationData) => ({
      degreeOrCertificate: item.degreeOrCertificate ?? item.certificate ?? "",
      institutionName: item.institutionName ?? item.resultOrCGPA ?? "",
      resultOrCGPA: item.resultOrCGPA ?? item.resultOrCGPA ?? "",
      passingYear: item.passingYear ?? "",
      location: item.location ?? "",
    }));
  }, [data]);

  const [educations, setEducations] =
    useState<EducationData[]>(normalizedInitial);

  // Provide snapshot getter for parent to pull values on navigation
  useEffect(() => {
    onSnapshot?.(() => educations);
  }, [educations, onSnapshot]);

  const handleFieldChange = (
    index: number,
    field: keyof EducationData,
    value: string
  ) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
    onUpdate(updated);
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        result: "",
        passingYear: "",
        location: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    if (educations.length > 1) {
      const updated = educations.filter((_, i) => i !== index);
      setEducations(updated);
      onUpdate(updated);
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Education
      </h2>

      <div>
        {educations.map((education, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-headerColor">
                Education {index + 1}
              </h3>
              {educations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
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
                htmlFor={`degreeOrCertificate`}
                className="block mb-2 font-medium text-headerColor"
              >
                Degree/Certificate
              </Label>
              <input
                id={`degreeOrCertificate-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter degree"
                required
                value={education.degreeOrCertificate}
                onChange={(e) =>
                  handleFieldChange(index, "degreeOrCertificate", e.target.value)
                }
              />
            </div>

            <div>
              <Label
                htmlFor={`institutionName`}
                className="block mb-2 font-medium text-headerColor"
              >
                Institution Name
              </Label>
              <input
                id={`institutionName-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter institution name"
                required
                value={education.institutionName}
                onChange={(e) =>
                  handleFieldChange(index, "institutionName", e.target.value)
                }
              />
            </div>

            <div>
              <Label
                htmlFor={`passingYear`}
                className="block mb-2 font-medium text-headerColor"
              >
                Passing Year:
              </Label>
              <input
                id={`passingYear-${index}`}
                type="date"
                placeholder="Enter passing year"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                required
                value={education.passingYear}
                onChange={(e) =>
                  handleFieldChange(index, "passingYear", e.target.value)
                }
              />
            </div>

            <div>
              <Label
                htmlFor={`resultOrCGPA`}
                className="block mb-2 font-medium text-headerColor"
              >
                Result/CGPA:
              </Label>
              <input
                id={`resultOrCGPA-${index}`}
                type="number"
                step="0.01"
                min="0"
                max="5"
                placeholder="e.g., 3.75"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                required
                value={education.resultOrCGPA}
                onChange={(e) =>
                  handleFieldChange(index, "resultOrCGPA", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor={`location`}
                className="block mb-2 font-medium text-headerColor"
              >
                Location
              </Label>
              <input
                id={`location-${index}`}
                type="text"
                placeholder="Enter location"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                required
                value={education.location}
                onChange={(e) =>
                  handleFieldChange(index, "location", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={addEducation}
            className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Plus size={18} />
            <span>Add another one</span>
          </button>
        </div>
      </div>
    </div>
  );
}
