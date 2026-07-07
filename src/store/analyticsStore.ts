import { create } from "zustand";

export type AnalyticsMode = "statistics_1var" | "statistics_2var" | "finance_loan" | "finance_compound";

export interface DataPoint {
  id: string;
  x: number | "";
  y: number | "";
}

export interface FinanceParams {
  principal: number;
  rate: number;
  years: number;
  compoundsPerYear: number;
}

interface AnalyticsState {
  mode: AnalyticsMode;
  dataset: DataPoint[];
  financeData: FinanceParams;
  
  // Actions
  setMode: (mode: AnalyticsMode) => void;
  updateDataPoint: (id: string, field: "x" | "y", value: number | "") => void;
  addDataPoint: () => void;
  removeDataPoint: (id: string) => void;
  clearDataset: () => void;
  setDataset: (data: DataPoint[]) => void;
  
  updateFinance: (field: keyof FinanceParams, value: number) => void;
}

const generateId = () => crypto.randomUUID();

const initialDataset: DataPoint[] = [
  { id: generateId(), x: 10, y: 15 },
  { id: generateId(), x: 20, y: 25 },
  { id: generateId(), x: 30, y: 40 },
  { id: generateId(), x: 40, y: 50 },
  { id: generateId(), x: 50, y: 65 },
];

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  mode: "statistics_2var",
  dataset: initialDataset,
  financeData: {
    principal: 10000,
    rate: 5,
    years: 10,
    compoundsPerYear: 12
  },
  
  setMode: (mode) => set({ mode }),
  
  updateDataPoint: (id, field, value) => set((state) => ({
    dataset: state.dataset.map(pt => pt.id === id ? { ...pt, [field]: value } : pt)
  })),
  
  addDataPoint: () => set((state) => ({
    dataset: [...state.dataset, { id: generateId(), x: "", y: "" }]
  })),
  
  removeDataPoint: (id) => set((state) => ({
    dataset: state.dataset.filter(pt => pt.id !== id)
  })),
  
  clearDataset: () => set({ dataset: [{ id: generateId(), x: "", y: "" }] }),
  
  setDataset: (data) => set({ dataset: data }),
  
  updateFinance: (field, value) => set((state) => ({
    financeData: { ...state.financeData, [field]: value }
  }))
}));
