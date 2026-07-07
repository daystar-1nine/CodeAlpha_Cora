"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useDeveloperStore } from "@/store/developerStore";
import { parseBase } from "@/lib/developerMath";

export function DeveloperKeypad() {
  const { base, setValue, applyOperation, clear } = useDeveloperStore();
  const [inputBuffer, setInputBuffer] = React.useState("");

  // Clear buffer when base changes to avoid parsing errors
  React.useEffect(() => {
    setInputBuffer("");
  }, [base]);

  // Sync buffer to store on change
  React.useEffect(() => {
    if (inputBuffer === "") return;
    const val = parseBase(inputBuffer, base);
    if (val !== null) setValue(val);
  }, [inputBuffer, base, setValue]);

  const handleChar = (char: string) => {
    setInputBuffer(prev => prev + char);
  };

  const handleBackspace = () => {
    setInputBuffer(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputBuffer("");
    clear();
  };

  const isHex = base === "HEX";
  const isDec = base === "DEC";
  const isOct = base === "OCT" || isDec || isHex; // 0-7 valid in all except BIN
  const isBin = true; // 0-1 valid in all

  const keys = [
    { label: "D", valid: isHex }, { label: "E", valid: isHex }, { label: "F", valid: isHex }, { label: "C", action: handleClear, valid: true }, { label: "⌫", action: handleBackspace, valid: true },
    { label: "A", valid: isHex }, { label: "B", valid: isHex }, { label: "C", valid: isHex }, { label: "AND", action: () => applyOperation("AND"), valid: true }, { label: "OR", action: () => applyOperation("OR"), valid: true },
    { label: "7", valid: isOct }, { label: "8", valid: isDec || isHex }, { label: "9", valid: isDec || isHex }, { label: "NOT", action: () => applyOperation("NOT"), valid: true }, { label: "XOR", action: () => applyOperation("XOR"), valid: true },
    { label: "4", valid: isOct }, { label: "5", valid: isOct }, { label: "6", valid: isOct }, { label: "LSH", action: () => applyOperation("LSH", 1n), valid: true }, { label: "RSH", action: () => applyOperation("RSH", 1n), valid: true },
    { label: "1", valid: isBin }, { label: "2", valid: isOct }, { label: "3", valid: isOct }, { label: "(", valid: false }, { label: ")", valid: false },
    { label: "0", valid: isBin }, { label: "00", valid: isBin, action: () => {handleChar("0"); handleChar("0");} }, { label: ".", valid: false }, { label: "=", valid: false, colSpan: 2 }
  ];

  return (
    <div className="w-full bg-void/50 border border-border-default rounded-xl p-4 flex flex-col gap-4">
      {/* Input Display (Buffer) */}
      <div className="h-16 flex items-center justify-end px-4 bg-surface/30 rounded-lg border border-border-default font-mono text-3xl text-text-primary tracking-wider overflow-hidden shadow-inner">
        {inputBuffer || "0"}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {keys.map((k, i) => {
          const isOp = ["C", "⌫", "AND", "OR", "NOT", "XOR", "LSH", "RSH", "(", ")", "="].includes(k.label);
          const isDisabled = !k.valid;

          return (
            <button
              key={`${k.label}-${i}`}
              onClick={k.action || (() => handleChar(k.label))}
              disabled={isDisabled}
              className={cn(
                "h-14 rounded-lg font-mono text-lg font-medium transition-all duration-200 flex items-center justify-center",
                isDisabled 
                  ? "opacity-20 cursor-not-allowed bg-surface/20 text-text-muted" 
                  : isOp 
                    ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                    : "bg-surface/80 text-text-primary hover:bg-white/10 border border-border-default hover:border-border-strong shadow-sm hover:shadow-md",
                k.colSpan === 2 && "col-span-2"
              )}
            >
              {k.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
