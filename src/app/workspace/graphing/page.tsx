"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EquationSidebar } from "@/features/workspace/graphing/components/EquationSidebar";
import { GraphCanvas } from "@/features/workspace/graphing/components/GraphCanvas";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function GraphingCalculatorPage() {
  const { setActiveModule } = useWorkspaceStore();

  React.useEffect(() => {
    setActiveModule("graphing");
  }, [setActiveModule]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col md:flex-row overflow-hidden"
    >
      {/* Sidebar for equations */}
      <div className="w-full h-[40vh] md:h-full md:w-80 xl:w-96 shrink-0 z-10 border-b md:border-b-0 md:border-r border-border-default">
        <EquationSidebar />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 h-[60vh] md:h-full relative">
        <GraphCanvas />
      </div>
    </motion.div>
  );
}
