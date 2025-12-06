import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardCardData {
  id: string;
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor?: string;
  updateDate: string;
}

interface DashboardCardProps {
  data: DashboardCardData;
  className?: string;
}

export default function DashboardCard({ data, className }: DashboardCardProps) {
  const IconComponent = data.icon;

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent className="py-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className={cn("p-3 rounded-lg bg-[#5952FF]")}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {data.title}
              </h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">
              {data.value}
            </p>
            <p className="text-sm text-muted-foreground">
              Update: {data.updateDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
