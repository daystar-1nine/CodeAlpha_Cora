"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ScientificDisplay } from "@/features/workspace/scientific/components/ScientificDisplay";
import { ScientificKeypad } from "@/features/workspace/scientific/components/ScientificKeypad";
import { ConstantsPanel } from "@/features/workspace/scientific/components/ConstantsPanel";
import { HistoryPanel } from "@/features/workspace/standard/components/HistoryPanel";
import { useCalcStore } from "@/store/calcStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function ScientificCalculatorPage() {
  const { append, calculate, deleteLast, clear } = useCalcStore();
  const { setActiveModule } = useWorkspaceStore();

  React.useEffect(() => {
    setActiveModule("scientific");
  }, [setActiveModule]);

  // Global Keyboard Integration (shared logic with standard but active here)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;

      const key = e.key;
      // Allow letters for scientific typing like "sin", "cos"
      if (/[a-zA-Z0-9\+\-\*\/\(\)\.\%\^]/.test(key) && key.length === 1) {
        // Prevent default if it's a math character to avoid scrolling, 
        // but for a-z we might just append. 
        if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            append(key);
        }
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        e.preventDefault();
        deleteLast();
      } else if (key === "Escape") {
        e.preventDefault();
        clear();
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
      {/* Main Scientific Area */}
      <div className="flex-1 flex flex-col h-full bg-transparent mx-auto">
        <ScientificDisplay />
        <div className="w-full h-[1px] bg-border-default/50" />
        <ScientificKeypad />
      </div>

      {/* Sidebars - Hidden on mobile, fixed width on desktop */}
      <div className="hidden xl:flex w-[600px] h-full shrink-0 border-l border-border-default">
        <div className="w-1/2 h-full">
            <HistoryPanel />
        </div>
        <div className="w-1/2 h-full border-l border-border-default">
            <ConstantsPanel />
        </div>
      </div>
    </motion.div>
  );
}
