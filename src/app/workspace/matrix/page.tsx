"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MatrixSidebar } from "@/features/workspace/matrix/components/MatrixSidebar";
import { MatrixEditor } from "@/features/workspace/matrix/components/MatrixEditor";
import { MatrixResults } from "@/features/workspace/matrix/components/MatrixResults";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function MatrixCalculatorPage() {
  const { setActiveModule } = useWorkspaceStore();

  React.useEffect(() => {
    setActiveModule("matrix"); // Assuming matrix is a valid module ID in workspaceStore
  }, [setActiveModule]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col xl:flex-row overflow-hidden"
    >
      {/* Left Sidebar: Tools & Operations */}
      <div className="w-full xl:w-72 h-[35vh] xl:h-full shrink-0 z-20 border-b xl:border-b-0 xl:border-r border-border-default">
        <MatrixSidebar />
      </div>

      {/* Center: Editor Workspace */}
      <div className="flex-1 h-[45vh] xl:h-full relative z-10 bg-transparent">
        <MatrixEditor />
      </div>

      {/* Right Sidebar: Results */}
      <div className="w-full xl:w-96 h-[20vh] xl:h-full shrink-0 z-20 border-t xl:border-t-0 xl:border-l border-border-default">
        <MatrixResults />
      </div>
    </motion.div>
  );
}
