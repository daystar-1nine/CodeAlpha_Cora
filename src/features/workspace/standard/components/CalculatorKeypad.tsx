"use client";

import * as React from "react";
import { useCalcStore } from "@/store/calcStore";
import { CalculatorButton } from "./CalculatorButton";

export function CalculatorKeypad() {
  const { append, clear, calculate, memoryClear, memoryRecall, memoryStore, memoryAdd, memorySubtract } = useCalcStore();

  return (
    <div className="w-full flex-1 p-6 md:p-8 flex flex-col gap-4">
      {/* Memory Row */}
      <div className="grid grid-cols-5 gap-2 md:gap-4 h-12">
        <CalculatorButton variant="action" label="MC" onClick={memoryClear} className="text-sm rounded-xl" />
        <CalculatorButton variant="action" label="MR" onClick={memoryRecall} className="text-sm rounded-xl" />
        <CalculatorButton variant="action" label="M+" onClick={memoryAdd} className="text-sm rounded-xl" />
        <CalculatorButton variant="action" label="M-" onClick={memorySubtract} className="text-sm rounded-xl" />
        <CalculatorButton variant="action" label="MS" onClick={memoryStore} className="text-sm rounded-xl" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-4 flex-1">
        {/* Row 1 */}
        <CalculatorButton variant="action" label="C" onClick={clear} className="text-danger hover:text-danger hover:bg-danger/10" />
        <CalculatorButton variant="action" label="()" onClick={() => append("(")} />
        <CalculatorButton variant="action" label="%" onClick={() => append("%")} />
        <CalculatorButton variant="operator" label="÷" onClick={() => append("/")} />

        {/* Row 2 */}
        <CalculatorButton label="7" onClick={() => append("7")} />
        <CalculatorButton label="8" onClick={() => append("8")} />
        <CalculatorButton label="9" onClick={() => append("9")} />
        <CalculatorButton variant="operator" label="×" onClick={() => append("*")} />

        {/* Row 3 */}
        <CalculatorButton label="4" onClick={() => append("4")} />
        <CalculatorButton label="5" onClick={() => append("5")} />
        <CalculatorButton label="6" onClick={() => append("6")} />
        <CalculatorButton variant="operator" label="−" onClick={() => append("-")} />

        {/* Row 4 */}
        <CalculatorButton label="1" onClick={() => append("1")} />
        <CalculatorButton label="2" onClick={() => append("2")} />
        <CalculatorButton label="3" onClick={() => append("3")} />
        <CalculatorButton variant="operator" label="+" onClick={() => append("+")} />

        {/* Row 5 */}
        <CalculatorButton label="0" onClick={() => append("0")} className="col-span-2" />
        <CalculatorButton label="." onClick={() => append(".")} />
        <CalculatorButton variant="equals" label="=" onClick={calculate} />
      </div>
    </div>
  );
}
