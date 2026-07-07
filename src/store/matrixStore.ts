import { create } from "zustand";

export type MatrixData = number[][];
export type MatrixOperation = 
  | "add" | "sub" | "mul" | "scalar_mul" 
  | "det" | "inv" | "transpose" | "trace" | "rank";

export type VectorOperation = 
  | "dot" | "cross" | "mag" | "norm" | "angle" | "proj";

interface MatrixState {
  mode: "matrix" | "vector";
  activeOperation: MatrixOperation | VectorOperation;
  
  // Matrix State
  matrixA: MatrixData;
  matrixB: MatrixData;
  scalar: number;
  
  // Vector State
  vectorU: number[];
  vectorV: number[];
  
  // Result State
  result: MatrixData | number | number[] | null;
  error: string | null;

  // Actions
  setMode: (mode: "matrix" | "vector") => void;
  setOperation: (op: MatrixOperation | VectorOperation) => void;
  setMatrixA: (data: MatrixData) => void;
  setMatrixB: (data: MatrixData) => void;
  setScalar: (val: number) => void;
  resizeMatrix: (target: "A" | "B", rows: number, cols: number) => void;
  
  setVectorU: (data: number[]) => void;
  setVectorV: (data: number[]) => void;
  resizeVector: (target: "U" | "V", size: number) => void;
  
  setResult: (res: MatrixData | number | number[] | null, err?: string | null) => void;
}

const generateEmptyMatrix = (rows: number, cols: number): MatrixData => 
  Array(rows).fill(0).map(() => Array(cols).fill(0));

const generateEmptyVector = (size: number): number[] => 
  Array(size).fill(0);

export const useMatrixStore = create<MatrixState>((set) => ({
  mode: "matrix",
  activeOperation: "add",
  
  matrixA: generateEmptyMatrix(3, 3),
  matrixB: generateEmptyMatrix(3, 3),
  scalar: 2,
  
  vectorU: generateEmptyVector(3),
  vectorV: generateEmptyVector(3),
  
  result: null,
  error: null,
  
  setMode: (mode) => set({ mode, result: null, error: null }),
  setOperation: (op) => set({ activeOperation: op, result: null, error: null }),
  
  setMatrixA: (data) => set({ matrixA: data, result: null, error: null }),
  setMatrixB: (data) => set({ matrixB: data, result: null, error: null }),
  setScalar: (val) => set({ scalar: val, result: null, error: null }),
  
  resizeMatrix: (target, rows, cols) => set((state) => {
    const newMatrix = generateEmptyMatrix(rows, cols);
    const oldMatrix = target === "A" ? state.matrixA : state.matrixB;
    
    // Preserve data when resizing
    for (let r = 0; r < Math.min(rows, oldMatrix.length); r++) {
      for (let c = 0; c < Math.min(cols, oldMatrix[0].length); c++) {
        newMatrix[r][c] = oldMatrix[r][c];
      }
    }
    
    return target === "A" ? { matrixA: newMatrix } : { matrixB: newMatrix };
  }),
  
  setVectorU: (data) => set({ vectorU: data, result: null, error: null }),
  setVectorV: (data) => set({ vectorV: data, result: null, error: null }),
  
  resizeVector: (target, size) => set((state) => {
    const newVector = generateEmptyVector(size);
    const oldVector = target === "U" ? state.vectorU : state.vectorV;
    
    for (let i = 0; i < Math.min(size, oldVector.length); i++) {
      newVector[i] = oldVector[i];
    }
    
    return target === "U" ? { vectorU: newVector } : { vectorV: newVector };
  }),
  
  setResult: (res, err = null) => set({ result: res, error: err }),
}));
