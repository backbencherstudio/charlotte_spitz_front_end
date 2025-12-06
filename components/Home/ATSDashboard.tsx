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
    <Card className="w-full hero-Shadow p-4 lg:p-5 rounded-lg max-w-[265px] shadow-lg border ">
      <CardContent className="space-y-2 p-0 ">
        {scoreItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[13px] text-foreground">
                  {item.label}{" "}
                  <span className="text-grayColor"> +{item.change}%</span>
                </h3>
              </div>
              <span className="text-base font-medium text-descriptionColor">
                {item.score}%
              </span>
            </div>

            {/* Progress bar */}
            <Progress value={item.score} className="h-3" />

            {/* Optional description */}
            {item.description && (
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
