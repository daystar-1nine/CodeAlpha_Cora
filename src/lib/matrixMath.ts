import { create, all } from "mathjs";

// We use primitive numbers for matrix calculations for performance.
const math = create(all, {
  epsilon: 1e-12,
  matrix: "Matrix",
  number: "number",
  precision: 14,
});

export function evaluateMatrixOperation(
  op: string, 
  matrixA: number[][], 
  matrixB?: number[][], 
  scalar?: number
): number[][] | number {
  const A = math.matrix(matrixA);
  const B = matrixB ? math.matrix(matrixB) : null;
  
  switch (op) {
    case "add":
      if (!B) throw new Error("Matrix B required");
      return math.add(A, B).toArray() as number[][];
    case "sub":
      if (!B) throw new Error("Matrix B required");
      return math.subtract(A, B).toArray() as number[][];
    case "mul":
      if (!B) throw new Error("Matrix B required");
      return math.multiply(A, B).toArray() as number[][];
    case "scalar_mul":
      if (scalar === undefined) throw new Error("Scalar required");
      return math.multiply(A, scalar).toArray() as number[][];
    case "det":
      // Det only on square matrices
      if (matrixA.length !== matrixA[0].length) throw new Error("Must be a square matrix");
      return math.det(A);
    case "inv":
      if (matrixA.length !== matrixA[0].length) throw new Error("Must be a square matrix");
      return math.inv(A).toArray() as number[][];
    case "transpose":
      return math.transpose(A).toArray() as number[][];
    case "trace":
      if (matrixA.length !== matrixA[0].length) throw new Error("Must be a square matrix");
      return math.trace(A);
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}

export function evaluateVectorOperation(
  op: string,
  vectorU: number[],
  vectorV?: number[]
): number[] | number {
  switch (op) {
    case "dot":
      if (!vectorV) throw new Error("Vector V required");
      if (vectorU.length !== vectorV.length) throw new Error("Vectors must be same length");
      return math.dot(vectorU, vectorV);
    case "cross":
      if (!vectorV) throw new Error("Vector V required");
      if (vectorU.length !== 3 || vectorV.length !== 3) throw new Error("Cross product requires 3D vectors");
      return math.cross(vectorU, vectorV) as number[];
    case "mag":
      return math.norm(vectorU) as number;
    case "norm":
      const mag = math.norm(vectorU) as number;
      if (mag === 0) throw new Error("Cannot normalize zero vector");
      return math.divide(vectorU, mag) as number[];
    case "angle":
      if (!vectorV) throw new Error("Vector V required");
      if (vectorU.length !== vectorV.length) throw new Error("Vectors must be same length");
      const dot = math.dot(vectorU, vectorV);
      const magU = math.norm(vectorU) as number;
      const magV = math.norm(vectorV) as number;
      if (magU === 0 || magV === 0) throw new Error("Cannot find angle with zero vector");
      // Returns angle in degrees
      return Math.acos(dot / (magU * magV)) * (180 / Math.PI);
    case "proj":
      if (!vectorV) throw new Error("Vector V required");
      // Proj U onto V = (U.V / |V|^2) * V
      const dotUV = math.dot(vectorU, vectorV);
      const magV2 = Math.pow(math.norm(vectorV) as number, 2);
      if (magV2 === 0) throw new Error("Cannot project onto zero vector");
      return math.multiply(vectorV, dotUV / magV2) as number[];
    default:
      throw new Error(`Unsupported operation: ${op}`);
  }
}
