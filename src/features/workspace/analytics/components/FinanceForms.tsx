"use client";

import * as React from "react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { DollarSign, Percent, Calendar, RefreshCw } from "lucide-react";

export function FinanceForms() {
  const { mode, financeData, updateFinance } = useAnalyticsStore();

  const isLoan = mode === "finance_loan";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-y-auto">
      <div className="w-full max-w-md bg-void/50 border border-border-default rounded-2xl overflow-hidden shadow-2xl p-8 space-y-6">
        
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl text-text-primary">
            {isLoan ? "Loan Amortization" : "Compound Interest"}
          </h2>
          <p className="text-text-muted text-sm mt-1">
            {isLoan ? "Calculate your monthly EMI and total interest." : "Model your investment growth over time."}
          </p>
        </div>

        {/* Principal */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            {isLoan ? "Loan Amount (Principal)" : "Initial Investment (PV)"}
          </label>
          <div className="relative flex items-center">
            <DollarSign className="w-5 h-5 text-text-muted absolute left-3" />
            <input
              type="number"
              value={financeData.principal}
              onChange={(e) => updateFinance("principal", Number(e.target.value) || 0)}
              className="w-full h-12 bg-surface/50 border border-border-default rounded-lg pl-10 pr-4 font-mono text-lg text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Rate */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Annual Interest Rate
          </label>
          <div className="relative flex items-center">
            <Percent className="w-5 h-5 text-text-muted absolute left-3" />
            <input
              type="number"
              value={financeData.rate}
              onChange={(e) => updateFinance("rate", Number(e.target.value) || 0)}
              className="w-full h-12 bg-surface/50 border border-border-default rounded-lg pl-10 pr-4 font-mono text-lg text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Years */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            {isLoan ? "Loan Term (Years)" : "Time Period (Years)"}
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-5 h-5 text-text-muted absolute left-3" />
            <input
              type="number"
              value={financeData.years}
              onChange={(e) => updateFinance("years", Number(e.target.value) || 0)}
              className="w-full h-12 bg-surface/50 border border-border-default rounded-lg pl-10 pr-4 font-mono text-lg text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Compounding Frequency (only for compound interest) */}
        {!isLoan && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Compounding Frequency
            </label>
            <div className="relative flex items-center">
              <RefreshCw className="w-5 h-5 text-text-muted absolute left-3" />
              <select
                value={financeData.compoundsPerYear}
                onChange={(e) => updateFinance("compoundsPerYear", Number(e.target.value))}
                className="w-full h-12 bg-surface/50 border border-border-default rounded-lg pl-10 pr-4 text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value={1}>Annually (1/yr)</option>
                <option value={2}>Semi-Annually (2/yr)</option>
                <option value={4}>Quarterly (4/yr)</option>
                <option value={12}>Monthly (12/yr)</option>
                <option value={365}>Daily (365/yr)</option>
              </select>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
