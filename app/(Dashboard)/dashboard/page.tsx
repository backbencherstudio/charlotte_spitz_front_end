import React from "react";
import DashboardCard, {
  DashboardCardData,
} from "@/components/reusable/DashboardCard";
import { FileText, LayoutTemplate, Users, DollarSign } from "lucide-react";

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

export default function page() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCardsData.map((card) => (
          <DashboardCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
}
