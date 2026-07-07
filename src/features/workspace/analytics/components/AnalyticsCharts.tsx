"use client";

import * as React from "react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { compute1VarStats, computeLinearRegression } from "@/lib/statisticsMath";
import { computeLoanAmortization, computeCompoundInterest } from "@/lib/financeMath";
import { 
  Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, ComposedChart
} from "recharts";

export function AnalyticsCharts() {
  const { mode, dataset, financeData } = useAnalyticsStore();
  
  // Compute Results dynamically based on mode
  if (mode === "statistics_1var") {
    const validData = dataset.filter(d => typeof d.x === "number").map(d => Number(d.x));
    const stats = compute1VarStats(validData);
    
    // Prepare Histogram data (simplified)
    const chartData = validData.map((val, i) => ({ index: i, value: val }));

    return (
      <div className="w-full h-full flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar">
        <h3 className="font-display text-xl text-primary font-medium">1-Var Analysis</h3>
        
        {stats ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard label="Mean (μ)" value={stats.mean.toFixed(2)} />
              <StatCard label="Standard Dev (σ)" value={stats.popStdDev.toFixed(2)} />
              <StatCard label="Median" value={stats.median.toString()} />
              <StatCard label="Range" value={stats.range.toString()} />
            </div>
            
            <div className="flex-1 min-h-[300px] w-full mt-6 bg-void/50 rounded-xl border border-border-default p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="index" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }

  if (mode === "statistics_2var") {
    const validData = dataset.filter(d => typeof d.x === "number" && typeof d.y === "number");
    const xData = validData.map(d => Number(d.x));
    const yData = validData.map(d => Number(d.y));
    const reg = computeLinearRegression(xData, yData);

    // To draw regression line, we need end points
    const xMin = Math.min(...xData);
    const xMax = Math.max(...xData);
    
    const chartData = validData.map(d => ({
      x: d.x,
      y: d.y,
      line: reg ? reg.slope * Number(d.x) + reg.intercept : null
    }));

    // Add min/max points strictly for the line to span the graph
    if (reg && chartData.length > 0) {
       chartData.push({ x: xMin - 10, y: undefined as unknown as number, line: reg.slope * (xMin - 10) + reg.intercept });
       chartData.push({ x: xMax + 10, y: undefined as unknown as number, line: reg.slope * (xMax + 10) + reg.intercept });
    }

    // Sort by X for the line chart to render correctly
    chartData.sort((a, b) => Number(a.x) - Number(b.x));

    return (
      <div className="w-full h-full flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar">
        <h3 className="font-display text-xl text-primary font-medium">Linear Regression</h3>
        
        {reg ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard label="Equation" value={reg.equation} className="sm:col-span-2 text-blue-400" />
              <StatCard label="Correlation (r)" value={reg.r.toFixed(4)} />
              <StatCard label="R² (Variance)" value={reg.r2.toFixed(4)} />
            </div>

            <div className="flex-1 min-h-[300px] w-full mt-6 bg-void/50 rounded-xl border border-border-default p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="x" type="number" domain={['auto', 'auto']} stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333' }} />
                  <Scatter dataKey="y" fill="#3b82f6" />
                  <Line dataKey="line" stroke="#10b981" strokeWidth={2} dot={false} activeDot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <SmartInsight r={reg.r} r2={reg.r2} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }

  if (mode === "finance_loan") {
    const { principal, rate, years } = financeData;
    const emi = computeLoanAmortization(principal, rate, years);
    const totalPaid = emi * years * 12;
    const totalInterest = totalPaid - principal;

    // Amortization chart
    const monthlyRate = (rate / 100) / 12;
    let balance = principal;
    const chartData = [];
    
    for(let i = 1; i <= years; i++) {
        let interestPaidYear = 0;
        for(let m = 0; m < 12; m++) {
            const interest = balance * monthlyRate;
            const prin = emi - interest;
            interestPaidYear += interest;
            balance -= prin;
        }
        chartData.push({
            year: i,
            balance: Math.max(0, balance),
            interestPaid: interestPaidYear
        });
    }

    return (
      <div className="w-full h-full flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar">
        <h3 className="font-display text-xl text-primary font-medium">Loan Amortization</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard label="Monthly EMI" value={`$${emi.toFixed(2)}`} className="text-danger" />
          <StatCard label="Total Interest" value={`$${totalInterest.toFixed(2)}`} />
          <StatCard label="Total Payment" value={`$${totalPaid.toFixed(2)}`} className="sm:col-span-2" />
        </div>

        <div className="flex-1 min-h-[300px] w-full mt-6 bg-void/50 rounded-xl border border-border-default p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
              <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
              <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" />
              <RechartsTooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333' }} />
              <Bar yAxisId="right" dataKey="interestPaid" fill="#ef4444" opacity={0.5} name="Yearly Interest" />
              <Line yAxisId="left" type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={false} name="Remaining Balance" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (mode === "finance_compound") {
    const { principal, rate, years, compoundsPerYear } = financeData;
    const finalValue = computeCompoundInterest(principal, rate, compoundsPerYear, years);
    const profit = finalValue - principal;

    const chartData = [];
    for(let i = 0; i <= years; i++) {
        chartData.push({
            year: i,
            value: computeCompoundInterest(principal, rate, compoundsPerYear, i)
        });
    }

    return (
      <div className="w-full h-full flex flex-col p-6 space-y-6 overflow-y-auto no-scrollbar">
        <h3 className="font-display text-xl text-primary font-medium">Compound Interest</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard label="Future Value" value={`$${finalValue.toFixed(2)}`} className="sm:col-span-2 text-green-400" />
          <StatCard label="Initial PV" value={`$${principal.toFixed(2)}`} />
          <StatCard label="Total Interest" value={`$${profit.toFixed(2)}`} />
        </div>

        <div className="flex-1 min-h-[300px] w-full mt-6 bg-void/50 rounded-xl border border-border-default p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <RechartsTooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333' }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return null;
}

function StatCard({ label, value, className }: { label: string, value: string, className?: string }) {
  return (
    <div className={`p-4 rounded-xl bg-void/40 border border-border-default flex flex-col ${className}`}>
      <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">{label}</span>
      <span className="text-xl font-mono mt-1 text-text-primary">{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
      <p className="text-text-muted italic text-sm">Enter valid data points to view analysis.</p>
    </div>
  );
}

function SmartInsight({ r, r2 }: { r: number, r2: number }) {
  let observation = "";
  if (Math.abs(r) > 0.8) observation = r > 0 ? "Strong positive correlation." : "Strong negative correlation.";
  else if (Math.abs(r) > 0.5) observation = r > 0 ? "Moderate positive correlation." : "Moderate negative correlation.";
  else observation = "Weak or no significant correlation.";

  return (
    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Smart Insight</h4>
      <p className="text-sm text-text-secondary">
        {observation} The model explains {(r2 * 100).toFixed(1)}% of the variance in the dataset.
      </p>
    </div>
  );
}
