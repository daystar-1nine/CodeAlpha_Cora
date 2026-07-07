"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMatrixStore, MatrixOperation, VectorOperation } from "@/store/matrixStore";
import { LayoutGrid, MoveRight, Layers, Type } from "lucide-react";

export function MatrixSidebar() {
  const store = useMatrixStore();

  const matrixOps: { id: MatrixOperation; label: string }[] = [
    { id: "add", label: "A + B" },
    { id: "sub", label: "A - B" },
    { id: "mul", label: "A × B" },
    { id: "scalar_mul", label: "k × A" },
    { id: "det", label: "Determinant |A|" },
    { id: "inv", label: "Inverse A⁻¹" },
    { id: "transpose", label: "Transpose Aᵀ" },
    { id: "trace", label: "Trace(A)" },
    { id: "rank", label: "Rank(A)" },
  ];

  const vectorOps: { id: VectorOperation; label: string }[] = [
    { id: "dot", label: "U · V (Dot)" },
    { id: "cross", label: "U × V (Cross)" },
    { id: "mag", label: "|U| (Magnitude)" },
    { id: "norm", label: "Normalize U" },
    { id: "angle", label: "Angle(U, V)" },
    { id: "proj", label: "Proj U on V" },
  ];

  const handleResizeMatrix = (size: number) => {
    store.resizeMatrix("A", size, size);
    store.resizeMatrix("B", size, size);
  };

  const handleResizeVector = (size: number) => {
    store.resizeVector("U", size);
    store.resizeVector("V", size);
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-r border-border-default">
      <div className="flex p-4 gap-2 border-b border-border-default shrink-0">
        <button
          onClick={() => store.setMode("matrix")}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            store.mode === "matrix" ? "bg-primary/20 text-primary border border-primary/30" : "text-text-secondary hover:bg-white/5"
          )}
        >
          <LayoutGrid className="w-4 h-4" /> Matrix
        </button>
        <button
          onClick={() => store.setMode("vector")}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            store.mode === "vector" ? "bg-primary/20 text-primary border border-primary/30" : "text-text-secondary hover:bg-white/5"
          )}
        >
          <MoveRight className="w-4 h-4" /> Vector
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        {/* Operations List */}
        <div>
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2">Operations</h4>
          <div className="space-y-1">
            {(store.mode === "matrix" ? matrixOps : vectorOps).map((op) => (
              <button
                key={op.id}
                onClick={() => store.setOperation(op.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between",
                  store.activeOperation === op.id 
                    ? "bg-void border border-border-strong text-primary shadow-sm" 
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                )}
              >
                <span className="font-serif italic">{op.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <Layers className="w-3 h-3" /> Dimensions
          </h4>
          <div className="grid grid-cols-3 gap-2 px-1">
            {store.mode === "matrix" 
              ? [2, 3, 4, 5, 6].map(n => (
                  <button
                    key={n}
                    onClick={() => handleResizeMatrix(n)}
                    className={cn(
                      "py-1.5 rounded border text-xs transition-colors",
                      store.matrixA.length === n 
                        ? "border-primary text-primary bg-primary/10" 
                        : "border-border-default text-text-muted hover:border-border-strong"
                    )}
                  >
                    {n}×{n}
                  </button>
                ))
              : [2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => handleResizeVector(n)}
                    className={cn(
                      "py-1.5 rounded border text-xs transition-colors",
                      store.vectorU.length === n 
                        ? "border-primary text-primary bg-primary/10" 
                        : "border-border-default text-text-muted hover:border-border-strong"
                    )}
                  >
                    {n}D
                  </button>
                ))
            }
          </div>
        </div>

        {/* Templates */}
        {store.mode === "matrix" && (
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
              <Type className="w-3 h-3" /> Templates
            </h4>
            <div className="grid grid-cols-2 gap-2 px-1">
              <button 
                onClick={() => {
                  const n = store.matrixA.length;
                  const identity = Array(n).fill(0).map((_, r) => Array(n).fill(0).map((_, c) => r === c ? 1 : 0));
                  store.setMatrixA(identity);
                }}
                className="py-2 text-xs border border-border-default rounded-lg text-text-secondary hover:bg-white/5 transition-all"
              >
                Identity
              </button>
              <button 
                onClick={() => {
                  const n = store.matrixA.length;
                  const zero = Array(n).fill(0).map(() => Array(n).fill(0));
                  store.setMatrixA(zero);
                }}
                className="py-2 text-xs border border-border-default rounded-lg text-text-secondary hover:bg-white/5 transition-all"
              >
                Zero
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
