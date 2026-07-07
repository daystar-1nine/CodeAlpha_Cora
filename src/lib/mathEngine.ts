import { create, all } from "mathjs";

// Create a mathjs instance with precise configuration
const math = create(all, {
  epsilon: 1e-12,
  matrix: "Matrix",
  number: "BigNumber", // Prevents 0.1 + 0.2 = 0.30000000000000004
  precision: 14,
});

export type AngleMode = "DEG" | "RAD" | "GRAD";

let currentAngleMode: AngleMode = "RAD";

export function setAngleMode(mode: AngleMode) {
  currentAngleMode = mode;
}

// Override trig functions to respect AngleMode
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replacements: any = {};
const trigFunctions = ["sin", "cos", "tan", "sec", "csc", "cot"];

trigFunctions.forEach((name) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = (math as any)[name];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replacements[name] = function (x: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof x === "number" || (x && (x as any).isBigNumber)) {
      const val = Number(x);
      if (currentAngleMode === "DEG") {
        return fn(val * (Math.PI / 180));
      } else if (currentAngleMode === "GRAD") {
        return fn(val * (Math.PI / 200));
      }
    }
    return fn(x);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replacements[name].transform = function (x: any) {
    return replacements[name](x);
  };
});

// Import overrides
math.import(replacements, { override: true });

/**
 * Safely evaluates a math expression string.
 * Used for live preview while typing.
 */
export function evaluateExpression(expr: string): string | null {
  if (!expr || expr.trim() === "") return null;
  
  try {
    // Sanitize common typing patterns before evaluation
    const sanitized = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/pi/gi, "pi")
      .replace(/π/g, "pi")
      .replace(/e/g, "e")
      .replace(/φ/g, "phi");
    
    // Prevent evaluating trailing operators or open parentheses
    if (/[\+\-\*\/\(\.]$/.test(sanitized)) {
      return null;
    }

    const result = math.evaluate(sanitized);
    
    // Format the result to avoid scientific notation for normal numbers and remove trailing zeros
    return math.format(result, { notation: "auto", precision: 14 });
  } catch {
    // If it fails to parse (e.g., "5+"), return null silently
    return null;
  }
}

/**
 * Formats an expression for beautiful display
 */
export function formatDisplayExpression(expr: string): string {
  return expr
    .replace(/\*/g, " × ")
    .replace(/\//g, " ÷ ")
    .replace(/\-/g, " − ")
    .replace(/\+/g, " + ");
}
