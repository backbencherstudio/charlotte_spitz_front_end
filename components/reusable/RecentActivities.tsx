import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type RecentActivity = {
  id: string;
  action: string;
  actionType: string;
  description: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type DashboardResponse = {
  title?: string;
  activities: RecentActivity[];
};

export default function RecentActivities({
  title = "Recent Activities",
  activities,
}: DashboardResponse) {
  return (
    <Card className={cn("shadow-sm py-5 h-full")}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities?.map((activity) => (
          <div
            key={activity.id}
            className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">
                {activity?.action}
              </h4>
              <p className="text-sm text-muted-foreground">
                {activity?.user?.name}
              </p>
            </div>
            <p className="text-sm text-muted-foreground ml-4">
              {activity?.createdAt &&
                new Date(activity.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
