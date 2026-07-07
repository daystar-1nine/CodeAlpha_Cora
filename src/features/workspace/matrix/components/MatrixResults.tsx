"use client";

import * as React from "react";
import { useMatrixStore } from "@/store/matrixStore";
import { MatrixGrid } from "./MatrixGrid";
import { VectorGrid } from "./VectorGrid";
import { Copy, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function MatrixResults() {
  const { result, error } = useMatrixStore();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMatrix = Array.isArray(result) && Array.isArray(result[0]);
  const isVector = Array.isArray(result) && !Array.isArray(result[0]);
  const isScalar = typeof result === "number";

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-l border-border-default">
      <div className="h-14 flex items-center justify-between px-6 border-b border-border-default shrink-0">
        <h3 className="font-display font-medium text-text-primary">
          Results
        </h3>
        {result !== null && (
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-xs"
            title="Copy to Clipboard"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            {copied && <span className="text-primary">Copied</span>}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col items-center justify-start">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-danger" />
            </div>
            <h4 className="text-danger font-medium mb-1">Computation Error</h4>
            <p className="text-text-muted text-sm">{error}</p>
          </div>
        ) : result === null ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
            <p className="text-text-muted italic text-sm">
              Configure your matrices and press Compute.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-text-secondary font-serif italic text-lg mb-2">Output</h4>
            
            <div className={cn(
              "p-6 rounded-2xl bg-void/50 border shadow-lg w-full flex justify-center",
              isMatrix ? "border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]" : "border-border-default"
            )}>
              {isMatrix && <MatrixGrid matrix={result as number[][]} readOnly />}
              {isVector && <VectorGrid vector={result as number[]} readOnly />}
              {isScalar && (
                <div className="text-4xl font-mono text-primary font-light tracking-wider py-4">
                  {(result as number).toPrecision(6).replace(/\.0+$/, "")}
                </div>
              )}
            </div>
            
            {isMatrix && (
              <p className="text-xs text-text-muted mt-2">
                {(result as number[][]).length} × {(result as number[][])[0].length} Matrix
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
