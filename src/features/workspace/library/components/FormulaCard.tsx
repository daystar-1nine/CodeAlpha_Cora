"use client";

import * as React from "react";
import { Formula } from "@/data/formulas";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Copy, CheckCircle2, ArrowRightCircle } from "lucide-react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export function FormulaCard({ formula }: { formula: Formula }) {
  const { setActiveModule } = useWorkspaceStore();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula.latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenModule = () => {
    if (formula.moduleLink) {
      setActiveModule(formula.moduleLink);
    }
  };

  return (
    <div className="bg-void/40 border border-border-default rounded-2xl p-6 flex flex-col shadow-lg hover:border-primary/30 transition-all duration-300 group">
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">{formula.category}</span>
          <h3 className="text-xl font-display text-text-primary mt-1">{formula.name}</h3>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-white/10 text-text-muted hover:text-primary transition-colors" title="Copy LaTeX">
            {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-6">{formula.description}</p>

      {/* LaTeX Render */}
      <div className="flex-1 flex items-center justify-center py-8 bg-surface/20 rounded-xl border border-border-default/50 mb-6 overflow-x-auto">
        <div className="text-2xl text-text-primary scale-110">
          <Latex>{`$$${formula.latex}$$`}</Latex>
        </div>
      </div>

      {/* Variables */}
      <div className="space-y-2 mb-6">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Variables</h4>
        <div className="grid grid-cols-1 gap-2">
          {formula.variables.map((v, i) => (
            <div key={i} className="flex items-baseline text-sm">
              <span className="font-mono text-primary w-12 shrink-0">{v.symbol}</span>
              <span className="text-text-secondary">{v.definition}</span>
              {v.unit && <span className="ml-auto text-text-muted text-xs bg-white/5 px-2 py-0.5 rounded-md">{v.unit}</span>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Example */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-sm text-primary/90 italic mb-4">
        {formula.example}
      </div>

      {/* Action */}
      {formula.moduleLink && (
        <button 
          onClick={handleOpenModule}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-surface/50 border border-border-default hover:bg-primary hover:text-void hover:border-primary transition-colors text-sm font-medium"
        >
          Open in {formula.moduleLink.charAt(0).toUpperCase() + formula.moduleLink.slice(1)} Workspace
          <ArrowRightCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
