"use client";

import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

function Progress({
  className,
  value = 0,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { value?: number }) {
  const [progress, setProgress] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(true);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAnimating) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newValue = Math.min(prev + 1, value);
          if (newValue === value) {
            clearInterval(interval);
          }
          return newValue;
        });
      }, 30);
    }

    return () => clearInterval(interval);
  }, [value, isAnimating]);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-[#D2D2D5] h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-[#B3AFFF] rounded-r-2xl h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
