import React from "react";
import { cn } from "@/lib/utils";

/**
 * 기본 스켈레톤 UI 컴포넌트
 */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-muted animate-pulse rounded-md", className)}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";

export { Skeleton };
