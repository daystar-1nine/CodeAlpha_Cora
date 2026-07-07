"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAnalyticsStore, AnalyticsMode } from "@/store/analyticsStore";
import { LineChart, BarChart2, DollarSign, Wallet, FileSpreadsheet } from "lucide-react";

export function AnalyticsSidebar() {
  const store = useAnalyticsStore();

  const modes: { id: AnalyticsMode; label: string; icon: React.ReactNode }[] = [
    { id: "statistics_1var", label: "1-Var Statistics", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "statistics_2var", label: "Linear Regression", icon: <LineChart className="w-4 h-4" /> },
    { id: "finance_compound", label: "Compound Interest", icon: <Wallet className="w-4 h-4" /> },
    { id: "finance_loan", label: "Loan Amortization", icon: <DollarSign className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-r border-border-default">
      <div className="p-4 border-b border-border-default shrink-0">
        <h3 className="font-display font-medium text-text-primary flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-primary" />
          Analytics Workspace
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        <div>
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2">Analysis Modes</h4>
          <div className="space-y-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => store.setMode(mode.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3",
                  store.mode === mode.id 
                    ? "bg-primary/10 border border-primary/20 text-primary shadow-sm" 
                    : "border border-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary"
                )}
              >
                {mode.icon}
                <span className="font-medium">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
