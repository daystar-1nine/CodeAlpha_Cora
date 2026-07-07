import { create, all } from "mathjs";

const math = create(all, {
  epsilon: 1e-12,
  matrix: "Matrix",
  number: "number", // We use primitive numbers for Graphing performance instead of BigNumber
  precision: 14,
});

export interface CompiledFunction {
  evaluate: (x: number) => number;
}

/**
 * Compiles a mathematical expression into a highly optimized evaluation function.
 * Throws if the expression is invalid.
 */
export function compileGraphFunction(expr: string): CompiledFunction {
  // Sanitize simple inputs
  const sanitized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/y\s*=\s*/, ""); // Strip 'y = ' if user types it

  // Compile the expression once
  const node = math.parse(sanitized);
  const code = node.compile();

  return {
    evaluate: (x: number) => {
      try {
        const result = code.evaluate({ x });
        if (typeof result === "number") return result;
        if (result && typeof result.valueOf === "function") return result.valueOf();
        return NaN;
      } catch {
        return NaN;
      }
    }
  };
}

/**
 * Checks if a string is a valid plottable math expression
 */
export function isValidGraphExpression(expr: string): boolean {
  if (!expr || expr.trim() === "") return false;
  try {
    compileGraphFunction(expr);
    return true;
  } catch {
    return false;
  }
}
