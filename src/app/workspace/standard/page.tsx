"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CalculatorDisplay } from "@/features/workspace/standard/components/CalculatorDisplay";
import { CalculatorKeypad } from "@/features/workspace/standard/components/CalculatorKeypad";
import { HistoryPanel } from "@/features/workspace/standard/components/HistoryPanel";
import { useCalcStore } from "@/store/calcStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function StandardCalculatorPage() {
  const { append, calculate, deleteLast, clear } = useCalcStore();
  const { setActiveModule } = useWorkspaceStore();

  React.useEffect(() => {
    setActiveModule("standard");
  }, [setActiveModule]);

  // Global Keyboard Integration
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if inside an input (like command palette)
      if (document.activeElement?.tagName === "INPUT") return;

      const key = e.key;
      if (/[0-9\+\-\*\/\(\)\.\%]/.test(key)) {
        e.preventDefault();
        append(key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        e.preventDefault();
        deleteLast();
      } else if (key === "Escape") {
        e.preventDefault();
        clear();
      } else if (e.ctrlKey || e.metaKey) {
        // Handle Copy/Paste ?
        if (key === "c") {
           // Copy logic is best handled natively, but we could hook into it.
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [append, calculate, deleteLast, clear]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex overflow-hidden"
    >
      {/* Main Calculator Area */}
      <div className="flex-1 flex flex-col h-full bg-transparent max-w-4xl mx-auto">
        <CalculatorDisplay />
        <div className="w-full h-[1px] bg-border-default/50" />
        <CalculatorKeypad />
      </div>

      {/* History Sidebar - Hidden on mobile, fixed width on desktop */}
      <div className="hidden lg:block w-80 h-full shrink-0">
        <HistoryPanel />
      </div>
    </motion.div>
  );
}
