"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useDeveloperStore, BaseType } from "@/store/developerStore";
import { WordSize } from "@/lib/developerMath";
import { Cpu, Settings2, ShieldCheck, ShieldAlert, Binary } from "lucide-react";

export function DeveloperSidebar() {
  const { base, setBase, wordSize, setWordSize, isSigned, setSigned } = useDeveloperStore();

  const bases: { id: BaseType; label: string }[] = [
    { id: "HEX", label: "Hexadecimal (16)" },
    { id: "DEC", label: "Decimal (10)" },
    { id: "OCT", label: "Octal (8)" },
    { id: "BIN", label: "Binary (2)" },
  ];

  const wordSizes: { id: WordSize; label: string }[] = [
    { id: 64, label: "QWORD (64-bit)" },
    { id: 32, label: "DWORD (32-bit)" },
    { id: 16, label: "WORD (16-bit)" },
    { id: 8, label: "BYTE (8-bit)" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-r border-border-default">
      <div className="p-4 border-b border-border-default shrink-0">
        <h3 className="font-display font-medium text-text-primary flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" />
          Developer
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8">
        
        {/* Base Selection */}
        <div>
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <Binary className="w-3 h-3" /> Base
          </h4>
          <div className="space-y-1">
            {bases.map((b) => (
              <button
                key={b.id}
                onClick={() => setBase(b.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3",
                  base === b.id 
                    ? "bg-primary/10 border border-primary/20 text-primary shadow-sm" 
                    : "border border-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary"
                )}
              >
                <span className="font-mono font-bold w-8">{b.id}</span>
                <span className="text-xs">{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Word Size */}
        <div>
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <Settings2 className="w-3 h-3" /> Word Size
          </h4>
          <div className="space-y-1">
            {wordSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setWordSize(size.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between",
                  wordSize === size.id 
                    ? "bg-void border border-border-strong text-primary shadow-sm" 
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary border border-transparent"
                )}
              >
                <span className="font-medium">{size.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Signed / Unsigned */}
        <div>
           <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2">Data Type</h4>
           <div className="flex bg-void/50 rounded-lg p-1 border border-border-default">
             <button
                onClick={() => setSigned(false)}
                className={cn(
                  "flex-1 py-2 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition-all",
                  !isSigned ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                )}
             >
               <ShieldCheck className="w-3 h-3" /> Unsigned
             </button>
             <button
                onClick={() => setSigned(true)}
                className={cn(
                  "flex-1 py-2 text-xs font-medium rounded-md flex items-center justify-center gap-1 transition-all",
                  isSigned ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                )}
             >
               <ShieldAlert className="w-3 h-3" /> Signed
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
