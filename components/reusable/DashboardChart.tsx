"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ================= TYPES ================= */

type MonthlyRevenue = {
  year: number;
  month: number; // 1-12
  total: number;
};

type DashboardChartProps = {
  chartdata: MonthlyRevenue[];
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
};

/* ================= CONFIG ================= */

const chartConfig = {
  visitors: {
    label: "Revenue",
    color: "#5952FF",
  },
} satisfies ChartConfig;

/* ================= COMPONENT ================= */

export function DashboardChart({
  chartdata,
  timeRange,
  onTimeRangeChange,
}: DashboardChartProps) {
  /* ---------- FORMAT API DATA ---------- */
  const formattedData = React.useMemo(() => {
    if (!chartdata?.length) return [];

    return chartdata.map((item) => ({
      date: `${item.year}-${String(item.month).padStart(2, "0")}-01`,
      visitors: item.total,
    }));
  }, [chartdata]);

  /* ---------- USE API RESPONSE AS-IS ---------- */
  const filteredData = React.useMemo(() => formattedData, [formattedData]);

  /* ================= RENDER ================= */

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
        </div>

        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>

          <SelectContent className="rounded-xl">
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              type="natural"
              dataKey="visitors"
              fill="url(#fillVisitors)"
              stroke="var(--color-visitors)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
