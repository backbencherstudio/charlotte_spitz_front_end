/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ApexCharts must load dynamically in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ATSScoreCardProps {
  score: number;
  status: string;
  subtitle: string;
}

export function ATSScoreCard({ score, status, subtitle }: ATSScoreCardProps) {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    const newChartOptions = {
      series: [score],

      chart: {
        type: "radialBar",
        height: 100,
        width: 100,
      },

      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%",
          },
          track: {
            background: "#E2E8F0",
          },
          dataLabels: {
            show: true,
            value: {
              fontSize: "16px",
              fontWeight: "700",
              color: "#0F172A",
              formatter: () => `${score}%`,
              verticalAlign: "middle",
              align: "center",
              offsetY: 0,
            },
          },
        },
      },

      colors: ["#5952FF"],

      stroke: {
        lineCap: "round",
      },

      labels: [""],
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChartOptions(newChartOptions);
  }, [score]);

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

        {/* Apex Circular Chart */}
        <div className="flex justify-center py-2">
          {chartOptions && (
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="radialBar"
              height={150}
              width={150}
            />
          )}
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
