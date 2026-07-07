"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AnalyticsSidebar } from "@/features/workspace/analytics/components/AnalyticsSidebar";
import { DataGrid } from "@/features/workspace/analytics/components/DataGrid";
import { FinanceForms } from "@/features/workspace/analytics/components/FinanceForms";
import { AnalyticsCharts } from "@/features/workspace/analytics/components/AnalyticsCharts";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useAnalyticsStore } from "@/store/analyticsStore";

export default function AnalyticsCalculatorPage() {
  const { setActiveModule } = useWorkspaceStore();
  const { mode } = useAnalyticsStore();

  React.useEffect(() => {
    setActiveModule("analytics");
  }, [setActiveModule]);

  const isFinance = mode.startsWith("finance_");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col xl:flex-row overflow-hidden"
    >
      {/* Left Sidebar: Modes */}
      <div className="w-full xl:w-72 h-[30vh] xl:h-full shrink-0 z-20 border-b xl:border-b-0 xl:border-r border-border-default">
        <AnalyticsSidebar />
      </div>

      {/* Center: Data Entry (Grid or Form) */}
      <div className="flex-1 h-[40vh] xl:h-full relative z-10 bg-transparent">
        {isFinance ? <FinanceForms /> : <DataGrid />}
      </div>

      {/* Right Sidebar: Visualization & Results */}
      <div className="w-full xl:w-[450px] h-[30vh] xl:h-full shrink-0 z-20 border-t xl:border-t-0 xl:border-l border-border-default bg-surface/30 backdrop-blur-md">
        <AnalyticsCharts />
      </div>
    </motion.div>
  );
}
