import * as React from "react";
import { cn } from "@/lib/utils";

export const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "success" | "warning" | "danger" }>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-muted text-text-primary",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      danger: "bg-danger/10 text-danger",
    };
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse rounded-md bg-muted/50", className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";
