import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreItem {
  label: string;
  score: number;
  change: number;
  description?: string;
}

const scoreItems: ScoreItem[] = [
  {
    label: "Keyword Match",
    score: 85,
    change: 5,
  },
  {
    label: "Skills Alignment",
    score: 92,
    change: 7,
    description:
      "The alignment between your listed skills and those required in the job description.",
  },
  {
    label: "Experience Relevance",
    score: 78,
    change: 8,
    description:
      "How relevant your past experience is to the job requirements.",
  },
  {
    label: "Overall Presentation",
    score: 95,
    change: 5,
  },
];

export function ATSDashboard() {
  return (
    <Card className="w-full">
      <CardContent className="space-y-6 pt-6">
        {scoreItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <div className="text-xs font-medium">+{item.change}%</div>
              </div>
              <span className="text-lg font-semibold text-foreground">
                {item.score}%
              </span>
            </div>

            {/* Progress bar */}
            <Progress value={item.score} className="h-3" />

            {/* Optional description */}
            {item.description && (
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
