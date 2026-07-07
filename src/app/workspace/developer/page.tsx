"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { DeveloperSidebar } from "@/features/workspace/developer/components/DeveloperSidebar";
import { BitGrid } from "@/features/workspace/developer/components/BitGrid";
import { DeveloperKeypad } from "@/features/workspace/developer/components/DeveloperKeypad";
import { ConversionPanel } from "@/features/workspace/developer/components/ConversionPanel";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function DeveloperCalculatorPage() {
  const { setActiveModule } = useWorkspaceStore();

  React.useEffect(() => {
    setActiveModule("developer");
  }, [setActiveModule]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col xl:flex-row overflow-hidden"
    >
      {/* Left Sidebar: Settings */}
      <div className="w-full xl:w-72 h-auto xl:h-full shrink-0 z-20 border-b xl:border-b-0 xl:border-r border-border-default">
        <DeveloperSidebar />
      </div>

      {/* Center: Workspace (BitGrid & Keypad) */}
      <div className="flex-1 relative z-10 bg-transparent flex flex-col p-4 xl:p-6 gap-6 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
           <BitGrid />
           <DeveloperKeypad />
        </div>
      </div>

      {/* Right Sidebar: Conversions */}
      <div className="w-full xl:w-[350px] h-auto xl:h-full shrink-0 z-20 border-t xl:border-t-0 xl:border-l border-border-default bg-surface/30 backdrop-blur-md">
        <ConversionPanel />
      </div>
    </motion.div>
  );
}
