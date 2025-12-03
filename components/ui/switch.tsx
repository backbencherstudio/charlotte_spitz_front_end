"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "onChange"
  > {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Switch({
  className,
  checked,
  onCheckedChange,
  id,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(
    checked ?? false
  );
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={currentChecked}
        onChange={handleChange}
        {...props}
      />
      <div
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors",
          currentChecked ? "bg-primary" : "bg-gray-200",
          "focus-within:outline-none focus-within:ring-4 focus-within:ring-primary/20",
          className
        )}
      >
        <div
          className={cn(
            "absolute top-[2px] left-[2px] h-5 w-5 bg-white border rounded-full transition-all",
            currentChecked ? "translate-x-full border-white" : "border-gray-300"
          )}
        />
      </div>
    </label>
  );
}

export { Switch };
