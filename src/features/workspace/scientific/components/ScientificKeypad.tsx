"use client";

import * as React from "react";
import { useCalcStore } from "@/store/calcStore";
import { CalculatorButton } from "@/features/workspace/standard/components/CalculatorButton";

export function ScientificKeypad() {
  const { append, clear, deleteLast, calculate } = useCalcStore();

  return (
    <div className="w-full flex-1 p-4 md:p-6 flex flex-col gap-2 md:gap-3">
      {/* Dense Scientific Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 md:gap-3 flex-1">
        
        {/* Row 1 */}
        <CalculatorButton variant="action" label="2nd" onClick={() => {}} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="π" onClick={() => append("pi")} className="text-sm rounded-lg font-serif italic" />
        <CalculatorButton variant="action" label="e" onClick={() => append("e")} className="text-sm rounded-lg font-serif italic" />
        <CalculatorButton variant="action" label="C" onClick={clear} className="text-danger hover:bg-danger/10 text-sm rounded-lg col-span-2 sm:col-span-1" />
        <CalculatorButton variant="action" label="DEL" onClick={deleteLast} className="text-danger hover:bg-danger/10 text-sm rounded-lg hidden sm:flex" />
        <CalculatorButton variant="action" label="%" onClick={() => append("%")} className="text-sm rounded-lg hidden sm:flex" />
        <CalculatorButton variant="operator" label="÷" onClick={() => append("/")} className="text-sm rounded-lg hidden sm:flex" />

        {/* Row 2 */}
        <CalculatorButton variant="action" label="x²" onClick={() => append("^2")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="1/x" onClick={() => append("1/")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="|x|" onClick={() => append("abs(")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="exp" onClick={() => append("exp(")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="mod" onClick={() => append(" mod ")} className="text-sm rounded-lg hidden sm:flex" />
        <CalculatorButton label="7" onClick={() => append("7")} className="text-lg rounded-lg" />
        <CalculatorButton label="8" onClick={() => append("8")} className="text-lg rounded-lg" />
        <CalculatorButton label="9" onClick={() => append("9")} className="text-lg rounded-lg hidden sm:flex" />
        <CalculatorButton variant="operator" label="×" onClick={() => append("*")} className="text-sm rounded-lg hidden sm:flex" />

        {/* Row 3 */}
        <CalculatorButton variant="action" label="√x" onClick={() => append("sqrt(")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="(" onClick={() => append("(")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label=")" onClick={() => append(")")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="n!" onClick={() => append("!")} className="text-sm rounded-lg" />
        <CalculatorButton variant="operator" label="÷" onClick={() => append("/")} className="text-sm rounded-lg sm:hidden" />
        <CalculatorButton label="4" onClick={() => append("4")} className="text-lg rounded-lg" />
        <CalculatorButton label="5" onClick={() => append("5")} className="text-lg rounded-lg" />
        <CalculatorButton label="6" onClick={() => append("6")} className="text-lg rounded-lg hidden sm:flex" />
        <CalculatorButton variant="operator" label="−" onClick={() => append("-")} className="text-sm rounded-lg hidden sm:flex" />

        {/* Row 4 */}
        <CalculatorButton variant="action" label="xʸ" onClick={() => append("^")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="sin" onClick={() => append("sin")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="cos" onClick={() => append("cos")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="tan" onClick={() => append("tan")} className="text-sm rounded-lg" />
        <CalculatorButton variant="operator" label="×" onClick={() => append("*")} className="text-sm rounded-lg sm:hidden" />
        <CalculatorButton label="1" onClick={() => append("1")} className="text-lg rounded-lg" />
        <CalculatorButton label="2" onClick={() => append("2")} className="text-lg rounded-lg" />
        <CalculatorButton label="3" onClick={() => append("3")} className="text-lg rounded-lg hidden sm:flex" />
        <CalculatorButton variant="operator" label="+" onClick={() => append("+")} className="text-sm rounded-lg hidden sm:flex" />

        {/* Row 5 */}
        <CalculatorButton variant="action" label="10ˣ" onClick={() => append("10^")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="log" onClick={() => append("log10")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="ln" onClick={() => append("ln")} className="text-sm rounded-lg" />
        <CalculatorButton variant="action" label="ANS" onClick={() => append("ANS")} className="text-sm rounded-lg font-semibold text-primary" />
        <CalculatorButton variant="operator" label="−" onClick={() => append("-")} className="text-sm rounded-lg sm:hidden" />
        <CalculatorButton label="0" onClick={() => append("0")} className="text-lg rounded-lg" />
        <CalculatorButton label="." onClick={() => append(".")} className="text-lg rounded-lg" />
        <CalculatorButton variant="equals" label="=" onClick={calculate} className="text-lg rounded-lg hidden sm:flex" />
        
        {/* Mobile operators row */}
        <div className="col-span-5 grid grid-cols-5 gap-2 sm:hidden mt-2">
           <CalculatorButton variant="action" label="DEL" onClick={deleteLast} className="text-danger text-sm rounded-lg" />
           <CalculatorButton label="9" onClick={() => append("9")} className="text-lg rounded-lg" />
           <CalculatorButton label="6" onClick={() => append("6")} className="text-lg rounded-lg" />
           <CalculatorButton label="3" onClick={() => append("3")} className="text-lg rounded-lg" />
           <CalculatorButton variant="operator" label="+" onClick={() => append("+")} className="text-sm rounded-lg" />
        </div>
        <div className="col-span-5 grid grid-cols-1 sm:hidden mt-1">
           <CalculatorButton variant="equals" label="=" onClick={calculate} className="text-lg rounded-lg h-12" />
        </div>
      </div>
    </div>
  );
}
