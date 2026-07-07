"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useCalcStore } from "@/store/calcStore";
import { formatDisplayExpression } from "@/lib/mathEngine";

function AutoScalingText({ text, maxFontSize = 64, minFontSize = 24 }: { text: string; maxFontSize?: number; minFontSize?: number }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textRef.current.scrollWidth;
      
      if (textWidth > containerWidth) {
        setScale(containerWidth / textWidth);
      } else {
        setScale(1);
      }
    }
  }, [text]);

  const currentFontSize = Math.max(minFontSize, maxFontSize * scale);

  return (
    <div ref={containerRef} className="w-full flex justify-end items-center overflow-hidden">
      <motion.span
        ref={textRef}
        className="font-mono tracking-tight origin-right whitespace-nowrap"
        style={{ fontSize: `${currentFontSize}px` }}
        layout
      >
        {text || "0"}
      </motion.span>
    </div>
  );
}

export function CalculatorDisplay() {
  const { expression, result, memory } = useCalcStore();
  
  const displayExpr = formatDisplayExpression(expression);
  const displayResult = result && result !== expression ? `= ${result}` : "";

  return (
    <div className="w-full flex flex-col justify-end p-6 md:p-8 min-h-[160px] md:min-h-[220px] relative">
      {/* Memory Indicator */}
      <div className="absolute top-4 left-6 flex gap-2">
        {memory && (
          <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded-md">
            M
          </span>
        )}
      </div>

      <div className="flex flex-col items-end w-full space-y-2">
        {/* Previous/Pending Expression */}
        <div className="h-8 flex items-end justify-end w-full opacity-60 text-text-secondary text-lg md:text-xl font-mono overflow-hidden">
          <span className="truncate w-full text-right">{displayExpr}</span>
        </div>
        
        {/* Live Result or Main Input */}
        <div className="w-full text-text-primary font-bold">
          <AutoScalingText text={displayResult || displayExpr} />
        </div>
      </div>
    </div>
  );
}
