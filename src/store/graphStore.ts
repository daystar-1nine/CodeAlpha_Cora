import { create } from "zustand";

export interface Equation {
  id: string;
  expression: string;
  color: string;
  isVisible: boolean;
  isError?: boolean;
  errorMsg?: string;
}

interface Viewport {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

interface GraphState {
  equations: Equation[];
  viewport: Viewport;
  
  // Actions
  addEquation: (expr?: string) => void;
  updateEquation: (id: string, expression: string) => void;
  removeEquation: (id: string) => void;
  toggleVisibility: (id: string) => void;
  setEquationError: (id: string, isError: boolean, errorMsg?: string) => void;
  
  // Viewport Actions
  setViewport: (viewport: Viewport) => void;
  pan: (dx: number, dy: number) => void;
  zoom: (factor: number, centerX?: number, centerY?: number) => void;
  resetViewport: () => void;
}

const DEFAULT_VIEWPORT: Viewport = {
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10
};

const COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // yellow
  "#8b5cf6", // purple
  "#ec4899", // pink
];

export const useGraphStore = create<GraphState>((set) => ({
  equations: [
    { id: "eq_1", expression: "sin(x)", color: COLORS[0], isVisible: true },
    { id: "eq_2", expression: "x^2", color: COLORS[1], isVisible: true }
  ],
  viewport: DEFAULT_VIEWPORT,
  
  addEquation: (expr = "") => set((state) => ({
    equations: [
      ...state.equations,
      {
        id: crypto.randomUUID(),
        expression: expr,
        color: COLORS[state.equations.length % COLORS.length],
        isVisible: true
      }
    ]
  })),
  
  updateEquation: (id, expression) => set((state) => ({
    equations: state.equations.map(eq => eq.id === id ? { ...eq, expression, isError: false } : eq)
  })),
  
  removeEquation: (id) => set((state) => ({
    equations: state.equations.filter(eq => eq.id !== id)
  })),
  
  toggleVisibility: (id) => set((state) => ({
    equations: state.equations.map(eq => eq.id === id ? { ...eq, isVisible: !eq.isVisible } : eq)
  })),

  setEquationError: (id, isError, errorMsg) => set((state) => ({
    equations: state.equations.map(eq => eq.id === id ? { ...eq, isError, errorMsg } : eq)
  })),
  
  setViewport: (viewport) => set({ viewport }),
  
  pan: (dx, dy) => set((state) => {
    const { xMin, xMax, yMin, yMax } = state.viewport;
    const width = xMax - xMin;
    const height = yMax - yMin;
    
    // dx and dy are percentages of the viewport width/height
    const panX = width * dx;
    const panY = height * dy;
    
    return {
      viewport: {
        xMin: xMin + panX,
        xMax: xMax + panX,
        yMin: yMin + panY,
        yMax: yMax + panY
      }
    };
  }),
  
  zoom: (factor, centerX, centerY) => set((state) => {
    const { xMin, xMax, yMin, yMax } = state.viewport;
    
    // If no center provided, zoom towards origin (0,0) or center of viewport
    const cx = centerX ?? (xMin + xMax) / 2;
    const cy = centerY ?? (yMin + yMax) / 2;
    
    return {
      viewport: {
        xMin: cx + (xMin - cx) * factor,
        xMax: cx + (xMax - cx) * factor,
        yMin: cy + (yMin - cy) * factor,
        yMax: cy + (yMax - cy) * factor
      }
    };
  }),
  
  resetViewport: () => set({ viewport: DEFAULT_VIEWPORT })
}));
