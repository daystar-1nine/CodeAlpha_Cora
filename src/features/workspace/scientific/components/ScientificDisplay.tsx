"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalcStore } from "@/store/calcStore";
import { formatDisplayExpression, AngleMode } from "@/lib/mathEngine";

export function ScientificDisplay() {
  const { expression, result, memory, ans, angleMode, setAngleMode } = useCalcStore();
  
  const displayExpr = formatDisplayExpression(expression);
  const displayResult = result && result !== expression ? `= ${result}` : "";

  return (
    <div className="w-full flex flex-col justify-end p-6 md:p-8 min-h-[200px] relative">
      {/* Top Status Indicators */}
      <div className="absolute top-4 left-6 flex items-center gap-4">
        {/* Angle Mode Toggle */}
        <div className="flex bg-void/50 rounded-lg border border-border-default p-1 backdrop-blur-md">
          {(["DEG", "RAD", "GRAD"] as AngleMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setAngleMode(mode)}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                angleMode === mode 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        
        {/* Memory & ANS Indicators */}
        <AnimatePresence>
          {memory && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded-md border border-primary/20"
            >
              M: {memory}
            </motion.span>
          )}
          {ans !== "0" && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-bold bg-surface px-2 py-1 rounded-md border border-border-default text-text-secondary"
            >
              ANS: {ans}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Display Output */}
      <div className="flex flex-col items-end w-full space-y-2 mt-8">
        <div className="h-10 flex items-end justify-end w-full opacity-60 text-text-secondary text-xl font-mono overflow-x-auto no-scrollbar whitespace-nowrap">
          <span>{displayExpr}</span>
        </div>
        
        <div className="w-full text-text-primary font-bold overflow-x-auto no-scrollbar text-right">
          <span className="font-mono tracking-tight text-4xl md:text-5xl whitespace-nowrap">
            {displayResult || displayExpr || "0"}
          </span>
        </div>
      </div>
    </div>
  );
}
