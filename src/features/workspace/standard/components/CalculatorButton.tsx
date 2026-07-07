"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "operator" | "action" | "equals";
  label: string;
}

export function CalculatorButton({ variant = "default", label, className, ...props }: CalculatorButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.92, filter: "brightness(0.9)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative flex items-center justify-center text-2xl font-medium rounded-2xl select-none outline-none shadow-sm transition-colors overflow-hidden",
        "before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/10 before:pointer-events-none",
        variant === "default" && "bg-surface/60 text-text-primary hover:bg-surface/80",
        variant === "operator" && "bg-primary/20 text-primary hover:bg-primary/30",
        variant === "action" && "bg-void/40 text-text-secondary hover:bg-void/60",
        variant === "equals" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 font-display">{label}</span>
      {/* Inner top highlight for glass feel */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl" />
    </motion.button>
  );
}
