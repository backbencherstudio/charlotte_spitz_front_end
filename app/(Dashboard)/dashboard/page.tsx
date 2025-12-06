import React from "react";
import DashboardCard, {
  DashboardCardData,
} from "@/components/reusable/DashboardCard";
import { FileText, LayoutTemplate, Users, DollarSign } from "lucide-react";
import RecentActivities, {
  ActivityData,
} from "@/components/reusable/RecentActivities";
import MostUsedTemplates, {
  TemplateData,
} from "@/components/reusable/MostUsedTemplates";
import { DashboardChart } from "@/components/reusable/DashboardChart";

// JSON data for dashboard cards
const dashboardCardsData: DashboardCardData[] = [
  {
    id: "1",
    title: "Total Submissions",
    value: "8,589",
    icon: FileText,
    iconBgColor: "bg-purple-500",
    updateDate: "July 20, 2025",
  },
  {
    id: "2",
    title: "Active Templates",
    value: "03",
    icon: LayoutTemplate,
    iconBgColor: "bg-purple-500",
    updateDate: "July 20, 2025",
  },
  {
    id: "3",
    title: "Active Subscribers",
    value: "10,589",
    icon: Users,
    iconBgColor: "bg-purple-500",
    updateDate: "July 20, 2025",
  },
  {
    id: "4",
    title: "Monthly Revenue",
    value: "$10,589",
    icon: DollarSign,
    iconBgColor: "bg-purple-500",
    updateDate: "July 20, 2025",
  },
];

// JSON data for recent activities
const recentActivitiesData: ActivityData[] = [
  {
    id: "1",
    title: "Approved submission",
    detail: "John Doe",
    timestamp: "12 Min Ago",
  },
  {
    id: "2",
    title: "New subscription",
    detail: "Premium Plan",
    timestamp: "12 Min Ago",
  },
  {
    id: "3",
    title: "Payment received",
    detail: "$99.00",
    timestamp: "12 Min Ago",
  },
  {
    id: "4",
    title: "Template activated",
    detail: "Modern Executive",
    timestamp: "12 Min Ago",
  },
];

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

export default function page() {
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
        {dashboardCardsData.map((card) => (
          <DashboardCard key={card.id} data={card} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-center">
        <div className="lg:col-span-8">
          <DashboardChart />
        </div>
        <div className="lg:col-span-4 h-full">
          <RecentActivities activities={recentActivitiesData} />
        </div>
      </div>
      <div className="mt-6">
        <MostUsedTemplates templates={mostUsedTemplatesData} />
      </div>
    </div>
  );
}
