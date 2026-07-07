export type FormulaCategory = "Mathematics" | "Physics" | "Engineering" | "Finance" | "Statistics" | "Computer Science";

export interface FormulaVar {
  symbol: string;
  definition: string;
  unit?: string;
}

export interface Formula {
  id: string;
  name: string;
  category: FormulaCategory;
  subcategory: string;
  latex: string;
  description: string;
  variables: FormulaVar[];
  example: string;
  moduleLink?: string; // module id to redirect to, e.g., 'matrix', 'analytics'
}

export const formulaLibrary: Formula[] = [
  // Mathematics
  {
    id: "math_quad",
    name: "Quadratic Formula",
    category: "Mathematics",
    subcategory: "Algebra",
    latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    description: "Solves a quadratic equation of the form ax² + bx + c = 0.",
    variables: [
      { symbol: "x", definition: "Unknown variable" },
      { symbol: "a, b, c", definition: "Coefficients (where a ≠ 0)" }
    ],
    example: "For x² - 5x + 6 = 0, a=1, b=-5, c=6, yielding x=2, x=3.",
    moduleLink: "scientific"
  },
  {
    id: "math_pythagoras",
    name: "Pythagorean Theorem",
    category: "Mathematics",
    subcategory: "Geometry",
    latex: "a^2 + b^2 = c^2",
    description: "Relates the lengths of the sides of a right triangle.",
    variables: [
      { symbol: "c", definition: "Hypotenuse" },
      { symbol: "a, b", definition: "Legs of the triangle" }
    ],
    example: "A triangle with legs 3 and 4 has a hypotenuse of 5.",
    moduleLink: "scientific"
  },
  {
    id: "math_matrix_det",
    name: "Matrix Determinant (2x2)",
    category: "Mathematics",
    subcategory: "Linear Algebra",
    latex: "|A| = ad - bc",
    description: "The determinant of a 2x2 matrix describes the scaling factor of the linear transformation.",
    variables: [
      { symbol: "a, b, c, d", definition: "Elements of the 2x2 matrix" }
    ],
    example: "For [[1, 2], [3, 4]], |A| = (1)(4) - (2)(3) = -2.",
    moduleLink: "matrix"
  },

  // Physics
  {
    id: "phys_newton2",
    name: "Newton's Second Law",
    category: "Physics",
    subcategory: "Mechanics",
    latex: "F = ma",
    description: "The force acting on an object is equal to its mass times its acceleration.",
    variables: [
      { symbol: "F", definition: "Force", unit: "N" },
      { symbol: "m", definition: "Mass", unit: "kg" },
      { symbol: "a", definition: "Acceleration", unit: "m/s²" }
    ],
    example: "A 10kg mass accelerating at 2 m/s² requires 20N of force.",
    moduleLink: "scientific"
  },
  {
    id: "phys_kinematics",
    name: "Kinematic Equation (Displacement)",
    category: "Physics",
    subcategory: "Kinematics",
    latex: "s = ut + \\frac{1}{2}at^2",
    description: "Calculates the displacement of an object under constant acceleration.",
    variables: [
      { symbol: "s", definition: "Displacement", unit: "m" },
      { symbol: "u", definition: "Initial Velocity", unit: "m/s" },
      { symbol: "t", definition: "Time", unit: "s" },
      { symbol: "a", definition: "Acceleration", unit: "m/s²" }
    ],
    example: "Starting from rest (u=0), accelerating at 9.8 m/s² for 2s gives s = 19.6m.",
    moduleLink: "scientific"
  },
  
  // Finance
  {
    id: "fin_compound",
    name: "Compound Interest",
    category: "Finance",
    subcategory: "Investment",
    latex: "A = P\\left(1 + \\frac{r}{n}\\right)^{nt}",
    description: "Calculates the future value of an investment over time.",
    variables: [
      { symbol: "A", definition: "Future Value" },
      { symbol: "P", definition: "Principal Amount" },
      { symbol: "r", definition: "Annual Interest Rate (decimal)" },
      { symbol: "n", definition: "Compounds per year" },
      { symbol: "t", definition: "Time in years" }
    ],
    example: "$1000 at 5% compounded monthly for 10 years yields ~$1647.",
    moduleLink: "analytics"
  },
  {
    id: "fin_emi",
    name: "Loan EMI",
    category: "Finance",
    subcategory: "Loans",
    latex: "E = \\frac{P \\cdot r \\cdot (1+r)^n}{(1+r)^n - 1}",
    description: "Calculates the Equated Monthly Installment for a loan.",
    variables: [
      { symbol: "E", definition: "EMI (Monthly Payment)" },
      { symbol: "P", definition: "Principal Loan Amount" },
      { symbol: "r", definition: "Monthly Interest Rate" },
      { symbol: "n", definition: "Total number of payments (months)" }
    ],
    example: "A $10,000 loan at 5% annual over 5 years is ~$188/mo.",
    moduleLink: "analytics"
  },

  // Statistics
  {
    id: "stat_variance",
    name: "Sample Variance",
    category: "Statistics",
    subcategory: "Dispersion",
    latex: "s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n - 1}",
    description: "Measures how far a set of numbers is spread out from their average value.",
    variables: [
      { symbol: "s²", definition: "Sample Variance" },
      { symbol: "x_i", definition: "Individual data point" },
      { symbol: "x̄", definition: "Sample Mean" },
      { symbol: "n", definition: "Number of data points" }
    ],
    example: "For [2, 4, 4, 4, 5, 5, 7, 9], the sample variance is 4.",
    moduleLink: "analytics"
  },
  {
    id: "stat_linear_reg",
    name: "Linear Regression (Slope)",
    category: "Statistics",
    subcategory: "Regression",
    latex: "m = \\frac{n(\\sum xy) - (\\sum x)(\\sum y)}{n(\\sum x^2) - (\\sum x)^2}",
    description: "Calculates the slope of the best-fit line through a set of points.",
    variables: [
      { symbol: "m", definition: "Slope" },
      { symbol: "x, y", definition: "Data coordinates" },
      { symbol: "n", definition: "Number of points" }
    ],
    example: "Finds the trend line y = mx + b for scattered data.",
    moduleLink: "analytics"
  },

  // Computer Science
  {
    id: "cs_shannon",
    name: "Shannon Entropy",
    category: "Computer Science",
    subcategory: "Information Theory",
    latex: "H(X) = -\\sum_{i=1}^{n} P(x_i) \\log_2 P(x_i)",
    description: "Measures the expected uncertainty or information content in a message.",
    variables: [
      { symbol: "H(X)", definition: "Entropy (in bits)" },
      { symbol: "P(x_i)", definition: "Probability of character/event x_i" }
    ],
    example: "A fair coin flip has an entropy of 1 bit.",
    moduleLink: "developer"
  },
  {
    id: "cs_twos_comp",
    name: "Two's Complement",
    category: "Computer Science",
    subcategory: "Binary Arithmetic",
    latex: "-N = \\sim N + 1",
    description: "Mathematical operation to find the negative of a binary number.",
    variables: [
      { symbol: "N", definition: "Binary Integer" },
      { symbol: "~", definition: "Bitwise NOT (Invert all bits)" }
    ],
    example: "For 0001 (1), ~0001 = 1110. Add 1 -> 1111 (-1).",
    moduleLink: "developer"
  }
];
