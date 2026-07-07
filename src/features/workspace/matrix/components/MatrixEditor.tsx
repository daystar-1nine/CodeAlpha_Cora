"use client";

import * as React from "react";
import { MatrixGrid } from "./MatrixGrid";
import { VectorGrid } from "./VectorGrid";
import { useMatrixStore } from "@/store/matrixStore";
import { evaluateMatrixOperation, evaluateVectorOperation } from "@/lib/matrixMath";
import { Play } from "lucide-react";

export function MatrixEditor() {
  const store = useMatrixStore();

  const handleMatrixAChange = (r: number, c: number, val: number) => {
    const newA = [...store.matrixA];
    newA[r] = [...newA[r]];
    newA[r][c] = val;
    store.setMatrixA(newA);
  };

  const handleMatrixBChange = (r: number, c: number, val: number) => {
    const newB = [...store.matrixB];
    newB[r] = [...newB[r]];
    newB[r][c] = val;
    store.setMatrixB(newB);
  };
  
  const handleVectorUChange = (i: number, val: number) => {
    const newU = [...store.vectorU];
    newU[i] = val;
    store.setVectorU(newU);
  };

  const handleVectorVChange = (i: number, val: number) => {
    const newV = [...store.vectorV];
    newV[i] = val;
    store.setVectorV(newV);
  };

  const handleCalculate = () => {
    try {
      if (store.mode === "matrix") {
        const res = evaluateMatrixOperation(store.activeOperation, store.matrixA, store.matrixB, store.scalar);
        store.setResult(res);
      } else {
        const res = evaluateVectorOperation(store.activeOperation, store.vectorU, store.vectorV);
        store.setResult(res);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Calculation Error";
      store.setResult(null, errorMsg);
    }
  };

  // Determines which inputs to show based on operation
  const needsB = ["add", "sub", "mul"].includes(store.activeOperation);
  const needsScalar = store.activeOperation === "scalar_mul";
  
  const needsV = ["dot", "cross", "angle", "proj"].includes(store.activeOperation);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 overflow-y-auto">
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl min-h-[400px] bg-void/30 border border-border-default rounded-3xl p-8 shadow-2xl relative">
        
        {store.mode === "matrix" ? (
          <div className="flex flex-col md:flex-row items-center gap-8">
            {needsScalar ? (
               <div className="flex flex-col items-center gap-2">
                 <div className="text-text-secondary font-serif italic text-lg">k</div>
                 <input 
                   type="number" 
                   value={store.scalar} 
                   onChange={(e) => store.setScalar(parseFloat(e.target.value) || 0)}
                   className="w-16 h-12 text-center bg-void/50 border border-border-default rounded-md font-mono text-text-primary outline-none focus:border-primary"
                 />
               </div>
            ) : null}
            
            {needsScalar && <div className="text-primary font-serif italic text-2xl">×</div>}

            <MatrixGrid matrix={store.matrixA} onChange={handleMatrixAChange} label="Matrix A" />
            
            {needsB && (
              <>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-border-default text-primary font-serif italic text-2xl shadow-inner">
                  {store.activeOperation === "add" ? "+" : store.activeOperation === "sub" ? "−" : "×"}
                </div>
                <MatrixGrid matrix={store.matrixB} onChange={handleMatrixBChange} label="Matrix B" />
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-8">
            <VectorGrid vector={store.vectorU} onChange={handleVectorUChange} label="Vector U" />
            
            {needsV && (
              <>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-border-default text-primary font-serif italic text-2xl shadow-inner">
                  {store.activeOperation === "dot" ? "·" : store.activeOperation === "cross" ? "×" : ","}
                </div>
                <VectorGrid vector={store.vectorV} onChange={handleVectorVChange} label="Vector V" />
              </>
            )}
          </div>
        )}

        <button 
          onClick={handleCalculate}
          className="mt-8 group flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
        >
          <Play className="w-4 h-4" />
          <span className="font-semibold tracking-wide">COMPUTE</span>
        </button>

      </div>
    </div>
  );
}
