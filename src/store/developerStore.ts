import { create } from "zustand";
import { WordSize, clampUnsigned, toggleBit, formatBase, operate } from "@/lib/developerMath";

export type BaseType = "HEX" | "DEC" | "OCT" | "BIN";

interface DeveloperState {
  value: bigint;
  base: BaseType;
  wordSize: WordSize;
  isSigned: boolean;
  history: { id: string; expression: string; result: string; timestamp: Date }[];
  
  // Actions
  setValue: (val: bigint) => void;
  setBase: (base: BaseType) => void;
  setWordSize: (size: WordSize) => void;
  setSigned: (signed: boolean) => void;
  
  flipBit: (index: number) => void;
  applyOperation: (op: string, operand?: bigint) => void;
  clear: () => void;
}

export const useDeveloperStore = create<DeveloperState>((set) => ({
  value: 0n,
  base: "DEC",
  wordSize: 64,
  isSigned: true,
  history: [],
  
  setValue: (val) => set((state) => ({ 
    value: clampUnsigned(val, state.wordSize) 
  })),
  
  setBase: (base) => set({ base }),
  
  setWordSize: (size) => set((state) => ({ 
    wordSize: size,
    value: clampUnsigned(state.value, size) // Clamp existing value to new size
  })),
  
  setSigned: (signed) => set({ isSigned: signed }),
  
  flipBit: (index) => set((state) => ({
    value: toggleBit(state.value, index, state.wordSize)
  })),
  
  applyOperation: (op, operand = 0n) => set((state) => {
    const res = operate(state.value, operand, op, state.wordSize);
    
    // Add to history
    const expStr = operand ? `${formatBase(state.value, state.base, state.wordSize, state.isSigned)} ${op} ${formatBase(operand, state.base, state.wordSize, state.isSigned)}` : `${op}(${formatBase(state.value, state.base, state.wordSize, state.isSigned)})`;
    const resStr = formatBase(res, state.base, state.wordSize, state.isSigned);
    
    return {
      value: res,
      history: [
        { id: crypto.randomUUID(), expression: expStr, result: resStr, timestamp: new Date() },
        ...state.history.slice(0, 19) // Keep last 20
      ]
    };
  }),
  
  clear: () => set({ value: 0n })
}));
