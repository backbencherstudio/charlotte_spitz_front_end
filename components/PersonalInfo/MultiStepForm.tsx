/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BriefcaseBusiness, FileText, GraduationCap } from "lucide-react";
import { useState } from "react";
import { BiSolidCertification } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import CertificateStep from "./Steps/Certificate";
import EducationStep from "./Steps/Education";
import PersonalInfoStep from "./Steps/PersonalInfoStep";
import ProgressBar from "./Steps/ProgressBar";
import SkillsSection from "./Steps/SkillsSection";
import WorkExperienceStep from "./Steps/WorkExperience";

const STEPS = [
  { id: 1, name: "Personal Info", label: "Personal Info", icon: <FileText /> },
  {
    id: 2,
    name: "Skills Section",
    label: "Skills Section",
    icon: <HiLightBulb className="h-8 w-8" />,
  },
  {
    id: 3,
    name: "Work Experience",
    label: "Work Experience",
    icon: <BriefcaseBusiness />,
  },
  {
    id: 4,
    name: "Education",
    label: "Education",
    icon: <GraduationCap />,
  },
  {
    id: 5,
    name: "Certification",
    label: "Certification",
    icon: <BiSolidCertification className="h-8 w-8" />,
  },
];

interface FormData {
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    cityState: string;
    resumeType: string;
    linkedinUrl: string;
    websiteUrl: string;
    professionalSummary: string;
  };
  skills: {
    hardSkills: string[];
    softSkills: string[];
    languages: string[];
  };
  workExperience: {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    location: string;
    responsibilities: string;
    achievements: string;
  };
  education: {
    degree: string;
    institution: string;
    result: string;
    passingYear: string;
    location: string;
  };
  certifications: {
    certificateName: string;
    organization: string;
    result: string;
    expiration: string;
    certificateId: string;
  };
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: "",
      phoneNumber: "",
      email: "",
      cityState: "",
      resumeType: "",
      linkedinUrl: "",
      websiteUrl: "",
      professionalSummary: "",
    },
    skills: {
      hardSkills: [],
      softSkills: [],
      languages: [],
    },
    workExperience: {
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      location: "",
      responsibilities: "",
      achievements: "",
    },
    education: {
      degree: "",
      institution: "",
      result: "",
      passingYear: "",
      location: "",
    },
    certifications: {
      certificateName: "",
      organization: "",
      result: "",
      expiration: "",
      certificateId: "",
    },
  });

  const handleUpdateFormData = <T extends keyof FormData>(
    stepName: T,
    data: FormData[T]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [stepName]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form completed:", formData);
      alert("Form submitted successfully!");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div className="py-20">
        <ProgressBar currentStep={currentStep} STEPS={STEPS} />
        <div className="mt-14 p-6 bg-[#F6F8FA] rounded-lg border">
          {currentStep === 1 && (
            <PersonalInfoStep
              data={formData.personalInfo}
              onUpdate={(data: any) =>
                handleUpdateFormData("personalInfo", data)
              }
            />
          )}
          {currentStep === 2 && (
            <SkillsSection
              data={formData.skills}
              onUpdate={(data: any) => handleUpdateFormData("skills", data)}
            />
          )}
          {currentStep === 3 && (
            <WorkExperienceStep
              data={formData.workExperience}
              onUpdate={(data: any) =>
                handleUpdateFormData("workExperience", data)
              }
            />
          )}
          {currentStep === 4 && (
            <EducationStep
              data={formData.education}
              onUpdate={(data: any) => handleUpdateFormData("education", data)}
            />
          )}
          {currentStep === 5 && (
            <CertificateStep
              data={formData.certifications}
              onUpdate={(data: any) =>
                handleUpdateFormData("certifications", data)
              }
            />
          )}

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-transparent text-[#5952FF] rounded-sm flex-1 cursor-pointer border border-[#5952FF] font-semibold"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#5952FF] text-white rounded-sm flex-1 cursor-pointer hover:bg-[#5952FF]/90 font-semibold"
            >
              {currentStep === STEPS.length ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
