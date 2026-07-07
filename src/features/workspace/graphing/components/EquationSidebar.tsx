"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGraphStore } from "@/store/graphStore";
import { isValidGraphExpression } from "@/lib/graphMath";
import { Plus, Trash2, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EquationSidebar() {
  const { equations, addEquation, updateEquation, removeEquation, toggleVisibility, setEquationError } = useGraphStore();

  const handleInputChange = (id: string, value: string) => {
    updateEquation(id, value);
    if (value.trim() !== "") {
      const isValid = isValidGraphExpression(value);
      setEquationError(id, !isValid, !isValid ? "Invalid expression" : undefined);
    } else {
      setEquationError(id, false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface/40 backdrop-blur-md border-r border-border-default z-10 shadow-2xl">
      <div className="h-14 flex items-center justify-between px-6 border-b border-border-default shrink-0">
        <h3 className="font-display font-medium text-text-primary">
          Equations
        </h3>
        <button 
          onClick={() => addEquation()}
          className="p-1.5 rounded-md hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
          title="Add Equation"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {equations.map((eq) => (
            <motion.div
              key={eq.id}
              layout
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              className={cn(
                "group flex flex-col p-3 rounded-xl border bg-void/60 transition-all",
                eq.isError ? "border-danger/50" : "border-border-default hover:border-border-strong"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Visibility & Color indicator */}
                <button
                  onClick={() => toggleVisibility(eq.id)}
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {eq.isVisible ? (
                    <div className="w-4 h-4 rounded-full border-[3px]" style={{ borderColor: eq.color }} />
                  ) : (
                    <EyeOff className="w-4 h-4 text-text-muted" />
                  )}
                </button>

                {/* Expression Input */}
                <div className="flex-1 flex items-center gap-2 relative">
                  <span className="font-serif italic text-text-secondary text-sm shrink-0">f(x) =</span>
                  <input
                    type="text"
                    value={eq.expression}
                    onChange={(e) => handleInputChange(eq.id, e.target.value)}
                    placeholder="e.g. sin(x)"
                    className={cn(
                      "w-full bg-transparent border-none outline-none font-mono text-text-primary placeholder:text-text-muted/50",
                      eq.isError && "text-danger"
                    )}
                    spellCheck={false}
                  />
                  {eq.isError && (
                    <AlertCircle className="w-4 h-4 text-danger absolute right-0" />
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeEquation(eq.id)}
                  className="shrink-0 p-1.5 rounded text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Equation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Error Message */}
              {eq.isError && (
                <div className="mt-2 text-[10px] text-danger pl-11">
                  {eq.errorMsg}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
