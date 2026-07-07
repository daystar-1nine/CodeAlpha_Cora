"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useDeveloperStore } from "@/store/developerStore";

export function BitGrid() {
  const { value, wordSize, flipBit } = useDeveloperStore();

  // Create an array of bit indices from (wordSize - 1) down to 0
  const bits = Array.from({ length: wordSize }, (_, i) => wordSize - 1 - i);

  // Group into blocks of 32 bits for rows
  const rowChunks = [];
  for (let i = 0; i < bits.length; i += 32) {
    rowChunks.push(bits.slice(i, i + 32));
  }

  return (
    <div className="w-full bg-void/50 border border-border-default rounded-xl p-4 md:p-6 font-mono overflow-x-auto no-scrollbar">
      <div className="flex flex-col gap-6 min-w-max">
        {rowChunks.map((chunk, rowIndex) => (
          <div key={rowIndex} className="flex flex-col gap-2">
            <div className="flex justify-between px-1 text-[10px] text-text-muted font-bold tracking-widest">
              <span>{chunk[0]}</span>
              <span>{chunk[chunk.length - 1]}</span>
            </div>
            
            <div className="flex flex-wrap gap-x-2 gap-y-2 justify-between">
              {/* Group into Nibbles (4 bits) */}
              {Array.from({ length: Math.ceil(chunk.length / 4) }).map((_, nibbleIndex) => {
                const nibbleBits = chunk.slice(nibbleIndex * 4, (nibbleIndex + 1) * 4);
                return (
                  <div key={nibbleIndex} className="flex gap-1">
                    {nibbleBits.map(bitIndex => {
                      const isSet = (value & (1n << BigInt(bitIndex))) !== 0n;
                      return (
                        <button
                          key={bitIndex}
                          onClick={() => flipBit(bitIndex)}
                          className={cn(
                            "w-6 h-8 rounded text-sm font-medium transition-all duration-200 hover:scale-110",
                            isSet 
                              ? "bg-primary text-void shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] border border-primary/50" 
                              : "bg-surface/50 text-text-muted border border-border-default hover:border-text-secondary"
                          )}
                          title={`Bit ${bitIndex}`}
                        >
                          {isSet ? "1" : "0"}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
