"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EquationSidebar } from "@/features/workspace/graphing/components/EquationSidebar";
import { GraphCanvas } from "@/features/workspace/graphing/components/GraphCanvas";
import { useWorkspaceStore } from "@/store/workspaceStore";

import { FunctionSquare } from "lucide-react";

export default function GraphingCalculatorPage() {
  const { setActiveModule } = useWorkspaceStore();
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);

  React.useEffect(() => {
    setActiveModule("graphing");
  }, [setActiveModule]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-row overflow-hidden relative"
    >
      {/* Main Canvas Area (Background on mobile, side-by-side on desktop) */}
      <div className="flex-1 h-full w-full absolute inset-0 md:relative z-0">
        <GraphCanvas />
      </div>

      {/* Sidebar for equations (Bottom sheet on mobile, sidebar on desktop) */}
      <AnimatePresence>
        {(showMobileSidebar || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 md:relative md:bottom-auto w-full md:w-80 xl:w-96 max-h-[50vh] md:max-h-none h-full shrink-0 z-20 border-t md:border-t-0 md:border-l border-border-default bg-surface/90 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none rounded-t-3xl md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.3)] md:shadow-none flex flex-col"
          >
            {/* Mobile Drag Handle */}
            <div className="w-full h-8 flex items-center justify-center md:hidden shrink-0 cursor-pointer" onClick={() => setShowMobileSidebar(false)}>
              <div className="w-12 h-1.5 bg-border-strong rounded-full" />
            </div>
            <div className="flex-1 overflow-hidden">
              <EquationSidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile FAB to open Equations */}
      <div className="md:hidden absolute bottom-6 left-6 z-10">
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <FunctionSquare className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
