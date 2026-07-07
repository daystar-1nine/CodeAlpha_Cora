"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalcStore } from "@/store/calcStore";
import { History as HistoryIcon, Trash2, Copy, Play } from "lucide-react";
import { formatDisplayExpression } from "@/lib/mathEngine";

export function HistoryPanel() {
  const { history, clearHistory, removeFromHistory, loadFromHistory } = useCalcStore();

  const handleCopy = (res: string) => {
    navigator.clipboard.writeText(res);
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-l border-border-default">
      <div className="h-14 flex items-center justify-between px-6 border-b border-border-default shrink-0">
        <h3 className="flex items-center gap-2 font-display font-medium text-text-primary">
          <HistoryIcon className="w-4 h-4 opacity-70" />
          History
        </h3>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="text-text-muted hover:text-danger transition-colors p-2 rounded-md hover:bg-white/5"
            title="Clear History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {history.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-text-muted space-y-4 opacity-50"
            >
              <HistoryIcon className="w-12 h-12" />
              <p className="text-sm">No calculations yet.</p>
            </motion.div>
          ) : (
            history.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group p-4 rounded-xl bg-void/40 border border-border-default hover:border-border-strong transition-all"
              >
                <div className="text-right text-sm text-text-secondary font-mono mb-1 truncate">
                  {formatDisplayExpression(item.expression)} =
                </div>
                <div className="text-right text-2xl font-bold text-text-primary font-mono mb-4">
                  {item.result}
                </div>
                
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleCopy(item.result)}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-text-secondary transition-colors"
                    title="Copy Result"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => loadFromHistory(item.expression)}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-text-secondary transition-colors"
                    title="Reuse Expression"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeFromHistory(item.id)}
                    className="p-1.5 rounded bg-white/5 hover:bg-danger/20 hover:text-danger text-text-secondary transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
