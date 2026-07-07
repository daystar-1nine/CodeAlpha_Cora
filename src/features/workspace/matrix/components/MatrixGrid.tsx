"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MatrixData } from "@/store/matrixStore";

interface MatrixGridProps {
  matrix: MatrixData;
  readOnly?: boolean;
  onChange?: (r: number, c: number, val: number) => void;
  label?: string;
  className?: string;
}

export function MatrixGrid({ matrix, readOnly = false, onChange, label, className }: MatrixGridProps) {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  
  // Refs for arrow key navigation
  const inputRefs = React.useRef<(HTMLInputElement | null)[][]>(
    Array(rows).fill(null).map(() => Array(cols).fill(null))
  );

  // Sync refs array size if matrix resizes
  React.useEffect(() => {
    inputRefs.current = Array(rows).fill(null).map((_, r) => 
      Array(cols).fill(null).map((_, c) => inputRefs.current[r]?.[c] || null)
    );
  }, [rows, cols]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, r: number, c: number) => {
    if (readOnly) return;
    
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        inputRefs.current[Math.max(0, r - 1)][c]?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        inputRefs.current[Math.min(rows - 1, r + 1)][c]?.focus();
        break;
      case "ArrowLeft":
        if ((e.target as HTMLInputElement).selectionStart === 0) {
          e.preventDefault();
          inputRefs.current[r][Math.max(0, c - 1)]?.focus();
        }
        break;
      case "ArrowRight":
        const target = e.target as HTMLInputElement;
        if (target.selectionEnd === target.value.length) {
          e.preventDefault();
          inputRefs.current[r][Math.min(cols - 1, c + 1)]?.focus();
        }
        break;
      case "Enter":
        e.preventDefault();
        if (r < rows - 1) {
          inputRefs.current[r + 1][c]?.focus();
        } else if (c < cols - 1) {
          inputRefs.current[0][c + 1]?.focus();
        }
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, r: number, c: number) => {
    if (readOnly || !onChange) return;
    
    // Allow empty or minus sign temporarily, parse on blur or keep raw string in a real app.
    // For simplicity, we cast aggressively. In a production app, we'd store string locally until blur.
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(r, c, val);
    } else if (e.target.value === "" || e.target.value === "-") {
      // Just pass 0 for empty to keep matrix numeric, could be improved with local string state
      onChange(r, c, 0); 
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label && <div className="text-text-secondary font-serif italic text-lg">{label}</div>}
      
      <div className="relative flex items-center justify-center p-2">
        {/* Left Bracket */}
        <div className="absolute left-0 top-0 bottom-0 w-3 border-l-2 border-t-2 border-b-2 border-text-primary rounded-l-md opacity-60" />
        
        {/* Grid */}
        <div 
          className="grid gap-2 relative z-10 px-4" 
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {matrix.map((row, r) => (
            row.map((val, c) => (
              <input
                key={`${r}-${c}`}
                ref={el => {
                  if (inputRefs.current[r]) inputRefs.current[r][c] = el;
                }}
                type="text"
                inputMode="decimal"
                value={val.toString()}
                onChange={(e) => handleChange(e, r, c)}
                onKeyDown={(e) => handleKeyDown(e, r, c)}
                readOnly={readOnly}
                className={cn(
                  "w-16 h-12 text-center bg-void/50 border border-border-default rounded-md",
                  "font-mono text-text-primary outline-none transition-all",
                  "focus:border-primary focus:bg-primary/5 focus:ring-1 focus:ring-primary/50",
                  readOnly && "bg-transparent border-none cursor-default focus:ring-0"
                )}
              />
            ))
          ))}
        </div>

        {/* Right Bracket */}
        <div className="absolute right-0 top-0 bottom-0 w-3 border-r-2 border-t-2 border-b-2 border-text-primary rounded-r-md opacity-60" />
      </div>
    </div>
  );
}
