import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ActivityData {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  title?: string;
  activities: ActivityData[];
  className?: string;
}

export default function RecentActivities({
  title = "Recent Activities",
  activities,
  className,
}: RecentActivitiesProps) {
  return (
    <Card className={cn("shadow-sm ", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">
                {activity.title}
              </h4>
              <p className="text-sm text-muted-foreground">{activity.detail}</p>
            </div>
            <p className="text-sm text-muted-foreground ml-4">
              {activity.timestamp}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
