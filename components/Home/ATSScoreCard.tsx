"use client";

import { useEffect, useState } from "react";

interface ATSScoreCardProps {
  score: number;
  status: string;
  subtitle: string;
}

export function ATSScoreCard({ score, status, subtitle }: ATSScoreCardProps) {
  const r = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * r;

  // animatedOffset starts at full circumference (0% filled) and animates
  // to the computed offset when `score` changes so the progress transitions.
  const [animatedOffset, setAnimatedOffset] = useState<number>(circumference);

  useEffect(() => {
    const target = circumference - (score / 100) * circumference;
    // small timeout helps ensure initial render shows empty circle before animating
    const id = setTimeout(() => setAnimatedOffset(target), 20);
    return () => clearTimeout(id);
  }, [score, circumference]);

  return (
    <div className="">
      <div className="bg-white p-4 hero-Shadow lg:p-5 rounded-lg max-w-[265px] shadow-lg border">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Tailored ATS Score
          </h2>

          <button className="flex gap-2 items-start mb-2">
            <span className="bg-primaryColor text-white px-2 py-0.5 pb-1 text-xs rounded-sm">
              {status}
            </span>
          </button>

          <p className="text-sm text-descriptionColor">{subtitle}</p>
        </div>

        {/* Circular Progress Section */}
        <div className=" flex justify-center py-2">
          <div className="relative w-[99px] h-[99px] ">
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-slate-200 dark:text-slate-700"
              />
              {/* Progress Circle - rotated so 0% starts at top */}
              <circle
                cx="50%"
                cy="50%"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={animatedOffset}
                strokeLinecap="round"
                className="text-indigo-500 dark:text-indigo-400"
                style={{
                  transition: "stroke-dashoffset 800ms ease",
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>

            {/* Center Score */}
            <div className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-slate-900 dark:text-white">
                  {score}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#CBD5E1]" />
              <span className="text-xs sm:text-sm text-descriptionColor">
                Original CV
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primaryColor" />
              <span className="text-xs sm:text-sm text-descriptionColor">
                Tailored CV
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
