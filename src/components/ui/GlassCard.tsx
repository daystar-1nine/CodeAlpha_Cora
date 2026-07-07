"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  intensity?: "light" | "heavy";
  border?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = "light", border = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          intensity === "light" ? "glass-panel" : "glass-panel-heavy",
          border ? "border border-border-default" : "border-none",
          "rounded-2xl overflow-hidden shadow-lg",
          className
        )}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
