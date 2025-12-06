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
      {/* Background Line */}
      <div className="absolute top-5 left-9 right-9 h-0.5 bg-gray-200 -z-10" />

      {/* Steps */}
      <div className="flex justify-between w-full">
        {STEPS.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center px-1 md:px-3 text-center"
          >
            <div
              className={`flex items-center justify-center rounded-full font-semibold transition-all duration-300 border-2 mb-2
                ${
                  step.id < currentStep
                    ? "bg-[#E5E7EB] text-black border"
                    : step.id === currentStep
                    ? "bg-[#155DFC] text-white border"
                    : "bg-[#E5E7EB] text-black border"
                }
                w-8 h-8 md:w-12 md:h-12 text-xs md:text-sm
              `}
            >
              <span className="scale-75 md:scale-100">{step.icon}</span>
            </div>

            <span
              className={`${
                step.id === currentStep
                  ? "text-[#155DFC] font-semibold"
                  : "text-[#4A5565]"
              } text-[10px] md:text-sm leading-tight`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProgressBar;
