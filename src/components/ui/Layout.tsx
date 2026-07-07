import * as React from "react";
import { cn } from "@/lib/utils";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-16 md:py-24 lg:py-32", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-px w-full bg-border-subtle my-8", className)}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";
