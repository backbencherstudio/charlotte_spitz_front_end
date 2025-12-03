"use client";

interface ATSScoreCardProps {
  score: number;
  status: string;
  subtitle: string;
}

export function ATSScoreCard({ score, status, subtitle }: ATSScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="">
      <div className="bg-white rounded-2xl shadow-lg border">
        {/* Header Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Tailored ATS Score
          </h2>

          <div className="flex gap-2 items-start mb-2">
            <span className="bg-[#5952FF] text-white px-6 p-2 rounded-md">
              {status}
            </span>
          </div>

          <p className="text-lg text-[#777980]">{subtitle}</p>
        </div>

        {/* Circular Progress Section */}
        <div className="p-6 sm:p-8 flex justify-center">
          <div className="relative">
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-200 dark:text-slate-700"
              />
              {/* Progress Circle */}
              <circle
                cx="50%"
                cy="50%"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-indigo-500 dark:text-indigo-400 transition-all duration-1000"
              />
            </svg>

            {/* Center Score */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-slate-900 dark:text-white">
                  {score}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend Section */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#CBD5E1]" />
              <span className="text-xs sm:text-sm text-[#777980]">
                Original CV
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#5952FF]" />
              <span className="text-xs sm:text-sm text-[#777980]">
                Tailored CV
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
