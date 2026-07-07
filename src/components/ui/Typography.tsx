import * as React from "react";
import { cn } from "@/lib/utils";

export const Heading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ className, level = 2, children, ...props }, ref) => {
    const Component = `h${level}` as const;
    const variants = {
      1: "text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight",
      2: "text-3xl sm:text-4xl font-display font-semibold tracking-tight",
      3: "text-2xl sm:text-3xl font-sans font-semibold tracking-tight",
      4: "text-xl sm:text-2xl font-sans font-medium tracking-tight",
      5: "text-lg sm:text-xl font-sans font-medium",
      6: "text-base font-sans font-medium uppercase tracking-wider text-text-muted",
    };

    return (
      <Component
        ref={ref}
        className={cn(variants[level], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

export const Paragraph = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { variant?: "default" | "muted" | "lead" }>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "text-base text-text-primary leading-relaxed",
      muted: "text-sm text-text-muted leading-relaxed",
      lead: "text-xl text-text-secondary leading-relaxed",
    };

    return (
      <p
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Paragraph.displayName = "Paragraph";
