"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
>(({ className, value, ...props }, ref) => {
  const indicatorRef = React.useRef<React.ElementRef<typeof ProgressPrimitive.Indicator>>(null);

  React.useEffect(() => {
    indicatorRef.current?.style.setProperty("--progress-translate", `-${100 - (value || 0)}%`);
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        ref={indicatorRef}
        data-value={value ?? 0}
        className="progress-indicator-dynamic h-full w-full flex-1 bg-primary transition-all"
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
