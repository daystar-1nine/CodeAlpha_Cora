"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useCalcStore } from "@/store/calcStore";
import { BookOpen } from "lucide-react";

const CONSTANTS = [
  { symbol: "π", value: "3.141592653589793", name: "Pi", id: "pi" },
  { symbol: "e", value: "2.718281828459045", name: "Euler's Number", id: "e" },
  { symbol: "φ", value: "1.618033988749895", name: "Golden Ratio", id: "phi" },
  { symbol: "c", value: "299792458", name: "Speed of Light (m/s)", id: "299792458" },
  { symbol: "G", value: "6.6743e-11", name: "Gravitational Constant", id: "6.6743e-11" },
  { symbol: "h", value: "6.62607015e-34", name: "Planck Constant", id: "6.62607015e-34" },
  { symbol: "Nₐ", value: "6.02214076e23", name: "Avogadro Constant", id: "6.02214076e23" },
  { symbol: "k", value: "1.380649e-23", name: "Boltzmann Constant", id: "1.380649e-23" },
  { symbol: "e⁻", value: "1.602176634e-19", name: "Elementary Charge", id: "1.602176634e-19" },
];

export function ConstantsPanel() {
  const { append } = useCalcStore();

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-l border-border-default">
      <div className="h-14 flex items-center px-6 border-b border-border-default shrink-0">
        <h3 className="flex items-center gap-2 font-display font-medium text-text-primary">
          <BookOpen className="w-4 h-4 opacity-70" />
          Constants
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
        {CONSTANTS.map((constant) => (
          <motion.button
            key={constant.name}
            onClick={() => append(constant.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group p-3 rounded-xl bg-void/40 border border-border-default hover:border-primary/50 hover:bg-primary/5 transition-all text-left flex items-center justify-between"
          >
            <div>
              <div className="font-serif italic text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                {constant.symbol}
              </div>
              <div className="text-[10px] text-text-muted mt-0.5">
                {constant.name}
              </div>
            </div>
            <div className="font-mono text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              Insert
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
