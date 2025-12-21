/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BriefcaseBusiness, FileText, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiCertification } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import CertificateStep from "./Steps/Certificate";
import PersonalInfoStep from "./Steps/PersonalInfoStep";
import ProgressBar from "./Steps/ProgressBar";
import SkillsSection from "./Steps/SkillsSection";
import WorkExperienceStep from "./Steps/WorkExperience";
import EducationStep from "./Steps/Education";

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
    name: "educations",
    label: "educations",
    icon: <GraduationCap />,
  },
  {
    id: 5,
    name: "Certification",
    label: "Certification",
    icon: <BiCertification className="h-8 w-8" />,
  },
];

interface FormattedSkill {
  name: string;
  type: "HARD" | "SOFT" | "LANGUAGE";
  isCustom: boolean;
}

interface FormData {
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    city_and_state: string;
    resumeType: string;
    linkedinUrl: string;
    includeFullAddress: boolean;
    websiteUrl: string;
    professionalSummary: string;
  };
  skills: FormattedSkill[];

  workExperiences: {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    location: string;
    responsibilities: string;
    achievements: string;
    currentlyWorking?: boolean;
  }[];
  educations: {
    degreeOrCertificate: string;
    institutionName: string;
    resultOrCGPA: string;
    passingYear: string;
    location: string;
  }[];
  certifications: {
    certificateName: string;
    issuingOrganization: string;
    expirationYear: string;
    certificateId: string;
  }[];
}

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedStep = window.localStorage.getItem("multiStepCurrentStep");
        if (savedStep) {
          const stepNum = Number(savedStep);
          if (
            !Number.isNaN(stepNum) &&
            stepNum >= 1 &&
            stepNum <= STEPS.length
          ) {
            return stepNum;
          }
        }
      } catch {}
    }
    return 1;
  });
  const [formData, setFormData] = useState<FormData>(() => {
    const initial: FormData = {
      personalInfo: {
        fullName: "",
        phoneNumber: "",
        email: "",
        city_and_state: "",
        resumeType: "",
        linkedinUrl: "",
        websiteUrl: "",
        professionalSummary: "",
        includeFullAddress: true,
      },
      skills: [],

      workExperiences: [
        {
          jobTitle: "",
          companyName: "",
          startDate: "",
          endDate: "",
          location: "",
          responsibilities: "",
          achievements: "",
          currentlyWorking: false,
        },
      ],
      educations: [
        {
          degreeOrCertificate: "",
          institutionName: "",
          resultOrCGPA: "",
          passingYear: "",
          location: "",
        },
      ],
      certifications: [
        {
          certificateName: "",
          issuingOrganization: "",

          expirationYear: "",
          certificateId: "",
        },
      ],
    };
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("multiStepFormData");
        if (saved) {
          const parsed = JSON.parse(saved) as any;
          // Migrate older shapes (single object) to arrays
          if (!Array.isArray(parsed.workExperience)) {
            parsed.workExperience = parsed.workExperience
              ? [parsed.workExperience]
              : [];
          }
          if (!Array.isArray(parsed.educations)) {
            parsed.educations = parsed.educations ? [parsed.educations] : [];
          }
          if (!Array.isArray(parsed.certifications)) {
            parsed.certifications = parsed.certifications
              ? [parsed.certifications]
              : [];
          }
          // Ensure at least one blank item exists for each array
          if (
            Array.isArray(parsed.workExperiences) &&
            parsed.workExperiences.length === 0
          ) {
            parsed.workExperiences = initial.workExperiences;
          }
          if (
            Array.isArray(parsed.educations) &&
            parsed.educations.length === 0
          ) {
            parsed.educations = initial.educations;
          }
          if (
            Array.isArray(parsed.certifications) &&
            parsed.certifications.length === 0
          ) {
            parsed.certifications = initial.certifications;
          }
          return parsed as FormData;
        }
      } catch {}
    }
    return initial;
  });

  // Snapshot getters registered by child steps
  const personalInfoGetterRef = useRef<(() => FormData["personalInfo"]) | null>(
    null
  );
  const skillsGetterRef = useRef<(() => FormData["skills"]) | null>(null);
  const workGetterRef = useRef<(() => FormData["workExperiences"]) | null>(null);
  const educationsGetterRef = useRef<(() => FormData["educations"]) | null>(null);
  const certGetterRef = useRef<(() => FormData["certifications"]) | null>(null);

  // LocalStorage keys
  const STORAGE_KEYS = {
    data: "multiStepFormData",
    step: "multiStepCurrentStep",
  } as const;

  // Initial state is hydrated from localStorage via useState initializers

  // Persist data/step on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        "multiStepFormData",
        JSON.stringify(formData)
      );
    } catch {
      // ignore
    }
  }, [formData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("multiStepCurrentStep", String(currentStep));
    } catch {
      // ignore
    }
  }, [currentStep]);

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
    // Pull snapshot for current step so we have the latest values
    let updated = formData;
    if (currentStep === 1 && personalInfoGetterRef.current) {
      updated = { ...formData, personalInfo: personalInfoGetterRef.current() };
    } else if (currentStep === 2 && skillsGetterRef.current) {
      updated = { ...formData, skills: skillsGetterRef.current() };
    } else if (currentStep === 3 && workGetterRef.current) {
      updated = { ...formData, workExperiences: workGetterRef.current() };
    } else if (currentStep === 4 && educationsGetterRef.current) {
      updated = { ...formData, educations: educationsGetterRef.current() };
    } else if (currentStep === 5 && certGetterRef.current) {
      updated = { ...formData, certifications: certGetterRef.current() };
    }
    setFormData(updated);
    console.log("MultiStepForm data (step " + currentStep + "):", updated);
    // Persist snapshot before navigating forward
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(updated));
      }
    } catch {}
    if (currentStep < STEPS.length) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length));
    } else {
      router.push("/payment");
    }
  };

  const handlePrevious = () => {
    // Pull snapshot for current step and persist before going back
    let updated = formData;
    if (currentStep === 1 && personalInfoGetterRef.current) {
      updated = { ...formData, personalInfo: personalInfoGetterRef.current() };
    } else if (currentStep === 2 && skillsGetterRef.current) {
      updated = { ...formData, skills: skillsGetterRef.current() };
    } else if (currentStep === 3 && workGetterRef.current) {
      updated = { ...formData, workExperiences: workGetterRef.current() };
    } else if (currentStep === 4 && educationsGetterRef.current) {
      updated = { ...formData, educations: educationsGetterRef.current() };
    } else if (currentStep === 5 && certGetterRef.current) {
      updated = { ...formData, certifications: certGetterRef.current() };
    }
    setFormData(updated);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(updated));
      }
    } catch {}
    if (currentStep > 1) {
      setCurrentStep((s) => Math.max(s - 1, 1));
    }
  };

  // const handleSubmited = () => {
  //   // Final snapshot pull
  //   let updated = formData;
  //   if (currentStep === 5 && certGetterRef.current) {
  //     updated = { ...formData, certifications: certGetterRef.current() };
  //   }
  //   console.log(updated, "data ceck==");
  // };

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
              onSnapshot={(getter) => {
                personalInfoGetterRef.current =
                  getter as () => FormData["personalInfo"];
              }}
            />
          )}
          {currentStep === 2 && (
            <SkillsSection
              data={formData.skills}
              onUpdate={(data: any) => handleUpdateFormData("skills", data)}
              onSnapshot={(getter) => {
                skillsGetterRef.current = getter;
              }}
            />
          )}
          {currentStep === 3 && (
            <WorkExperienceStep
              data={formData.workExperiences}
              onUpdate={(data: any) =>
                handleUpdateFormData("workExperiences", data)
              }
              onSnapshot={(getter) => {
                workGetterRef.current =
                  getter as () => FormData["workExperiences"];
              }}
            />
          )}
          {currentStep === 4 && (
            <EducationStep
              data={formData.educations}
              onUpdate={(data: any) => handleUpdateFormData("educations", data)}
              onSnapshot={(getter) => {
                educationsGetterRef.current =
                  getter as () => FormData["educations"];
              }}
            />
          )}
          {currentStep === 5 && (
            <CertificateStep
              data={formData.certifications}
              onUpdate={(data: any) =>
                handleUpdateFormData("certifications", data)
              }
              onSnapshot={(getter) => {
                certGetterRef.current =
                  getter as () => FormData["certifications"];
              }}
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
            {/* {currentStep === STEPS.length ? (
              <button
                onClick={handleSubmited}
                type="submit"
                className="px-6 py-3 bg-[#5952FF] text-white rounded-sm flex-1 cursor-pointer hover:bg-[#5952FF]/90 font-semibold"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                type="submit"
                className="px-6 py-3 bg-[#5952FF] text-white rounded-sm flex-1 cursor-pointer hover:bg-[#5952FF]/90 font-semibold"
              >
                Continue
              </button>
            )} */}
            <button
              onClick={handleNext}
              type="submit"
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
