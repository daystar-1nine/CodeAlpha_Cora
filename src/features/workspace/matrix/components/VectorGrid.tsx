"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Same as MatrixGrid but for 1D vectors
interface VectorGridProps {
  vector: number[];
  readOnly?: boolean;
  onChange?: (i: number, val: number) => void;
  label?: string;
  className?: string;
}

export function VectorGrid({ vector, readOnly = false, onChange, label, className }: VectorGridProps) {
  const size = vector.length;
  
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>(
    Array(size).fill(null)
  );

  React.useEffect(() => {
    inputRefs.current = Array(size).fill(null).map((_, i) => inputRefs.current[i] || null);
  }, [size]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (readOnly) return;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        inputRefs.current[Math.max(0, i - 1)]?.focus();
        break;
      case "ArrowDown":
      case "ArrowRight":
      case "Enter":
        e.preventDefault();
        inputRefs.current[Math.min(size - 1, i + 1)]?.focus();
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (readOnly || !onChange) return;
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) onChange(i, val);
    else if (e.target.value === "" || e.target.value === "-") onChange(i, 0);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {label && <div className="text-text-secondary font-serif italic text-lg">{label}</div>}
      
      <div className="relative flex items-center justify-center p-2">
        <div className="absolute left-0 top-0 bottom-0 w-3 border-l-2 border-t-2 border-b-2 border-text-primary rounded-l-md opacity-60" />
        
        <div className="grid gap-2 relative z-10 px-4 grid-cols-1">
          {vector.map((val, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="decimal"
              value={val.toString()}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              readOnly={readOnly}
              className={cn(
                "w-16 h-12 text-center bg-void/50 border border-border-default rounded-md",
                "font-mono text-text-primary outline-none transition-all",
                "focus:border-primary focus:bg-primary/5 focus:ring-1 focus:ring-primary/50",
                readOnly && "bg-transparent border-none cursor-default focus:ring-0"
              )}
            />
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-3 border-r-2 border-t-2 border-b-2 border-text-primary rounded-r-md opacity-60" />
      </div>
    </div>
  );
}
