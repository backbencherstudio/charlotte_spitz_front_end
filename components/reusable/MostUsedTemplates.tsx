import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TemplateData {
  id: string;
  name: string;
  percentage: number;
  color: string; // e.g., "bg-blue-500", "bg-pink-500", "bg-green-500"
}

interface MostUsedTemplatesProps {
  title?: string;
  templates: TemplateData[];
  className?: string;
}

export default function MostUsedTemplates({
  title = "Most Used Templates",
  templates,
  className,
}: MostUsedTemplatesProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {templates.map((template) => (
          <div key={template.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={cn("w-3 h-3 rounded-full", template.color)} />
              <span className="text-sm font-medium text-foreground">
                {template.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    template.color
                  )}
                  style={{ width: `${template.percentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground min-w-12 text-right">
                {template.percentage}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
