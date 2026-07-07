"use client";

import * as React from "react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { Plus, Trash2, Database } from "lucide-react";

export function DataGrid() {
  const { mode, dataset, updateDataPoint, addDataPoint, removeDataPoint, clearDataset } = useAnalyticsStore();
  
  const is2Var = mode === "statistics_2var";
  
  return (
    <div className="w-full h-full flex flex-col items-center p-8 overflow-y-auto">
      <div className="w-full max-w-2xl bg-void/50 border border-border-default rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        
        {/* Toolbar */}
        <div className="h-12 border-b border-border-default bg-surface/50 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 text-text-primary text-sm font-medium">
            <Database className="w-4 h-4 text-primary" />
            Dataset Editor
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearDataset}
              className="text-xs text-text-muted hover:text-danger transition-colors px-2 py-1 rounded"
            >
              Clear All
            </button>
            <button 
              onClick={addDataPoint}
              className="flex items-center gap-1 text-xs bg-primary/20 text-primary hover:bg-primary/30 transition-colors px-3 py-1.5 rounded-md"
            >
              <Plus className="w-3 h-3" /> Add Row
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex border-b border-border-strong bg-void/80 text-sm font-serif italic text-text-secondary">
          <div className="w-12 border-r border-border-default flex items-center justify-center py-2 opacity-50">#</div>
          <div className="flex-1 border-r border-border-default flex items-center justify-center py-2 font-bold text-primary">X Values</div>
          {is2Var && (
            <div className="flex-1 border-r border-border-default flex items-center justify-center py-2 font-bold text-blue-400">Y Values</div>
          )}
          <div className="w-12 flex items-center justify-center py-2"></div>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {dataset.map((pt, index) => (
            <div key={pt.id} className="flex border-b border-border-default/50 hover:bg-white/5 transition-colors group">
              <div className="w-12 border-r border-border-default/50 flex items-center justify-center text-xs text-text-muted">
                {index + 1}
              </div>
              <div className="flex-1 border-r border-border-default/50 relative">
                <input
                  type="number"
                  value={pt.x}
                  onChange={(e) => updateDataPoint(pt.id, "x", e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full h-10 bg-transparent text-center font-mono text-text-primary outline-none focus:bg-primary/10 transition-colors"
                  placeholder="0.0"
                />
              </div>
              {is2Var && (
                <div className="flex-1 border-r border-border-default/50 relative">
                  <input
                    type="number"
                    value={pt.y}
                    onChange={(e) => updateDataPoint(pt.id, "y", e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full h-10 bg-transparent text-center font-mono text-text-primary outline-none focus:bg-blue-500/10 transition-colors"
                    placeholder="0.0"
                  />
                </div>
              )}
              <div className="w-12 flex items-center justify-center">
                <button
                  onClick={() => removeDataPoint(pt.id)}
                  className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {/* Empty Space for scrolling */}
          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
