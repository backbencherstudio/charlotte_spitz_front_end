import React from "react";

const ProgressBar = ({
  currentStep,
  STEPS,
}: {
  currentStep: number;
  STEPS: { id: number; name: string; label: string; icon: React.ReactNode }[];
}) => (
  <div className="w-full">
    <div className="flex items-center justify-between relative">
      <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-10" />

      {currentStep > 0 && (
        <div
          className="absolute top-5 left-0 h-0.5 -z-10 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
          }}
        />
      )}

      {STEPS.map((step) => (
        <div key={step.id} className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2 mb-2 ${
              step.id < currentStep
                ? "bg-[#E5E7EB] text-[#000000] border"
                : step.id === currentStep
                ? "bg-[#155DFC] text-white border"
                : "bg-[#E5E7EB] text-[#000000] border"
            }`}
          >
            {step.icon}
          </div>

          <span
            className={
              step.id === currentStep
                ? "text-[#155DFC] font-semibold"
                : "text-[#4A5565]"
            }
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ProgressBar;
