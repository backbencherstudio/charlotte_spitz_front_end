"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface WorkExperienceData {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  location: string;
  responsibilities: string;
  achievements: string;
  isCurrentRole?: boolean;
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
  const [experiences, setExperiences] = useState<WorkExperienceData[]>(
    data.length > 0
      ? data
      : [
          {
            jobTitle: "",
            companyName: "",
            startDate: "",
            endDate: "",
            location: "",
            responsibilities: "",
            achievements: "",
            isCurrentRole: false,
          },
        ]
  );

  // Register snapshot getter for parent
  useEffect(() => {
    onSnapshot?.(() => experiences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences]);

  const handleFieldChange = (
    index: number,
    field: keyof WorkExperienceData,
    value: string | boolean
  ) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
    onUpdate(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        location: "",
        responsibilities: "",
        achievements: "",
        isCurrentRole: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      const updated = experiences.filter((_, i) => i !== index);
      setExperiences(updated);
      onUpdate(updated);
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Work Experience
      </h2>

      <div>
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-headerColor">
                Experience {index + 1}
              </h3>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="inline-flex items-center justify-center h-8 w-8 border border-primaryColor text-primaryColor rounded-sm cursor-pointer hover:bg-primaryColor/10"
                  aria-label="Remove experience"
                  title="Remove experience"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="col-span-1">
              <Label
                htmlFor={`jobTitle-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                Job Title
              </Label>
              <input
                id={`jobTitle-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
                placeholder="Enter job title"
                value={experience.jobTitle}
                onChange={(e) =>
                  handleFieldChange(index, "jobTitle", e.target.value)
                }
              />
            </div>

            <div className="col-span-1">
              <Label
                htmlFor={`companyName-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                Company Name
              </Label>
              <input
                id={`companyName-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
                placeholder="Enter company name"
                value={experience.companyName}
                onChange={(e) =>
                  handleFieldChange(index, "companyName", e.target.value)
                }
              />
            </div>
            <div className="col-span-2 grid gap-3 justify-center h-full items-center grid-cols-1 md:grid-cols-3">
              <div>
                <Label
                  htmlFor={`startDate-${index}`}
                  className="block mb-2 font-medium text-headerColor"
                >
                  Start Date
                </Label>
                <input
                  id={`startDate-${index}`}
                  type="date"
                  placeholder="Enter start date"
                  className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  value={experience.startDate}
                  onChange={(e) =>
                    handleFieldChange(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <div className="flex items-center justify-start lg:justify-center h-full md:mt-4 gap-4">
                  <Checkbox
                    id={`isCurrentRole-${index}`}
                    className="cursor-pointer rounded-sm h-5 w-5 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                    checked={experience.isCurrentRole}
                    onCheckedChange={(checked) =>
                      handleFieldChange(index,  "isCurrentRole", !!checked)
                    }
                  />
                  <Label
                    htmlFor={`isCurrentRole-${index}`}
                    className="font-medium text-headerColor cursor-pointer"
                  >
                    Currently Working Here
                  </Label>
                </div>
              </div>
              <div>
                <Label
                  htmlFor={`endDate-${index}`}
                  className="block mb-2 font-medium text-headerColor"
                >
                  End Date
                </Label>
                <input
                  id={`endDate-${index}`}
                  type="date"
                  placeholder="Enter end date"
                  disabled={experience.isCurrentRole}
                  className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                  value={experience.endDate}
                  onChange={(e) =>
                    handleFieldChange(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-span-2">
              <Label
                htmlFor={`location-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                Location
              </Label>
              <input
                id={`location-${index}`}
                type="text"
                placeholder="Enter location"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
                value={experience.location}
                onChange={(e) =>
                  handleFieldChange(index, "location", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <Label
                htmlFor={`responsibilities-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                List your responsibilities
              </Label>
              <textarea
                id={`responsibilities-${index}`}
                placeholder="List your responsibilities in this role."
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
                rows={4}
                value={experience.responsibilities}
                onChange={(e) =>
                  handleFieldChange(index, "responsibilities", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <Label
                htmlFor={`achievements-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                List your achievements
              </Label>
              <textarea
                id={`achievements-${index}`}
                placeholder="List your achievements in this role."
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor"
                rows={4}
                value={experience.achievements}
                onChange={(e) =>
                  handleFieldChange(index, "achievements", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={addExperience}
            className="px-5 py-3 text-primaryColor border border-primaryColor rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Plus size={18} />
            <span>Add another experience</span>
          </button>
        </div>
      </div>
    </div>
  );
}
