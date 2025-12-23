"use client";

import DashboardCard from "@/components/reusable/DashboardCard";
import { FileText, LayoutTemplate, DollarSign, User } from "lucide-react";
import RecentActivities from "@/components/reusable/RecentActivities";
import MostUsedTemplates, {
  TemplateData,
} from "@/components/reusable/MostUsedTemplates";
import { DashboardChart } from "@/components/reusable/DashboardChart";
import { useGetAllOverviewQuery } from "@/src/redux/features/dashboard";

// JSON data for most used templates
const mostUsedTemplatesData: TemplateData[] = [
  {
    id: "1",
    name: "Modern Pro",
    percentage: 50,
    color: "bg-blue-600",
  },
  {
    id: "2",
    name: "Classic",
    percentage: 45,
    color: "bg-pink-500",
  },
  {
    id: "3",
    name: "Executive",
    percentage: 35,
    color: "bg-green-500",
  },
];

export default function DashboardPage() {
  const { data: dashboardData } = useGetAllOverviewQuery({});
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold mb-2">Good Morning, Smith 👋 </h1>
        <p className="text-sm text-gray-500">
          Welcome to Syntera Admin — Manage submissions, approvals, tokens, and
          platform activity.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title={"Total Packages"}
          icon={FileText}
          number={dashboardData?.data?.totalPackages}
        />
        <DashboardCard
          title={"Total User"}
          icon={User}
          number={dashboardData?.data?.totalUsers}
        />
        <DashboardCard
          title={"Total Submissions"}
          icon={LayoutTemplate}
          number={dashboardData?.data?.totalSubmissions}
        />
        <DashboardCard
          title={"Total Revenue"}
          icon={DollarSign}
          number={dashboardData?.data?.totalRevenue}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-center">
        <div className="lg:col-span-8">
          <DashboardChart chartdata={dashboardData?.data?.monthlyRevenue} />
        </div>
        <div className="lg:col-span-4 h-full">
          <RecentActivities
            activities={dashboardData?.data?.recentActivities}
          />
        </div>
      </div>
      <div className="mt-6">
        <MostUsedTemplates templates={mostUsedTemplatesData} />
      </div>
    </div>
  );
}
