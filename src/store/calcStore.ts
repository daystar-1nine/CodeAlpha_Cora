import { create } from "zustand";
import { evaluateExpression, setAngleMode, AngleMode } from "@/lib/mathEngine";

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  angleMode?: AngleMode;
}

interface CalcState {
  expression: string;
  result: string;
  memory: string | null;
  history: HistoryItem[];
  angleMode: AngleMode;
  ans: string; // Previous Answer
  isEvaluated: boolean;
  
  // Actions
  append: (val: string) => void;
  clear: () => void;
  deleteLast: () => void;
  calculate: () => void;
  setAngleMode: (mode: AngleMode) => void;
  
  // Memory Actions
  memoryClear: () => void;
  memoryRecall: () => void;
  memoryStore: () => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
  
  // History Actions
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  loadFromHistory: (expr: string) => void;
}

export const useCalcStore = create<CalcState>((set, get) => ({
  expression: "",
  result: "",
  memory: null,
  history: [],
  angleMode: "RAD",
  ans: "0",
  isEvaluated: false,
  
  setAngleMode: (mode) => {
    setAngleMode(mode);
    set({ angleMode: mode });
    // Re-evaluate live preview if possible
    const state = get();
    if (state.expression) {
      set({ result: evaluateExpression(state.expression) ?? state.result });
    }
  },

  append: (val) => {
    set((state) => {
      // Smart input: e.g. "sin" -> "sin("
      const smartVal = ["sin", "cos", "tan", "log", "ln", "sqrt", "asin", "acos", "atan", "sinh", "cosh", "tanh", "exp"].includes(val) 
        ? `${val}(` 
        : val;
        
      const isOperator = ["+", "-", "*", "/", "^"].includes(val);
      const isNewCalculation = state.isEvaluated;
      
      let newExpr = state.expression;
      
      if (isNewCalculation) {
        newExpr = isOperator ? state.expression + smartVal : smartVal;
      } else {
        newExpr += smartVal;
      }
      
      const preview = evaluateExpression(newExpr);
      
      return { 
        expression: newExpr,
        result: preview ?? state.result,
        isEvaluated: false
      };
    });
  },
  
  clear: () => set({ expression: "", result: "", isEvaluated: false }),
  
  deleteLast: () => {
    set((state) => {
      if (state.expression === state.result) return { expression: "", result: "" }; 
      
      const newExpr = state.expression.slice(0, -1);
      const preview = evaluateExpression(newExpr);
      return {
        expression: newExpr,
        result: preview ?? ""
      };
    });
  },
  
  calculate: () => {
    const { expression, history, angleMode } = get();
    if (!expression) return;
    
    // Replace ANS if used
    const parsedExpr = expression.replace(/ANS/g, get().ans);
    const finalResult = evaluateExpression(parsedExpr);
    
    if (finalResult !== null && finalResult !== expression) {
      const historyItem: HistoryItem = {
        id: crypto.randomUUID(),
        expression,
        result: finalResult,
        timestamp: Date.now(),
        angleMode
      };
      
      set({ 
        expression: finalResult, 
        result: finalResult,
        ans: finalResult, // Store ANS
        history: [historyItem, ...history],
        isEvaluated: true
      });
    }
  },
  
  memoryClear: () => set({ memory: null }),
  memoryRecall: () => {
    const mem = get().memory;
    if (mem) get().append(mem);
  },
  memoryStore: () => {
    const res = get().result || get().expression;
    if (res) set({ memory: res });
  },
  memoryAdd: () => {
    const current = get().memory || "0";
    const add = get().result || get().expression || "0";
    const res = evaluateExpression(`${current}+${add}`);
    if (res) set({ memory: res });
  },
  memorySubtract: () => {
    const current = get().memory || "0";
    const sub = get().result || get().expression || "0";
    const res = evaluateExpression(`${current}-${sub}`);
    if (res) set({ memory: res });
  },
  
  clearHistory: () => set({ history: [] }),
  removeFromHistory: (id) => set((state) => ({ history: state.history.filter(h => h.id !== id) })),
  loadFromHistory: (expr) => set({ expression: expr, result: evaluateExpression(expr) || "" })
}));
