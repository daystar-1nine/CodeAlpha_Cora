import { create, all } from "mathjs";

const math = create(all, {});

export interface RegressionResult {
  slope: number;
  intercept: number;
  r: number;
  r2: number;
  equation: string;
}

export function compute1VarStats(data: number[]) {
  if (data.length === 0) return null;
  
  const sorted = [...data].sort((a, b) => a - b);
  const n = data.length;
  
  const sum = math.sum(data);
  const sumSq = data.reduce((acc, val) => acc + val * val, 0);
  const mean = sum / n;
  
  const median = math.median(data);
  const mode = math.mode(data);
  
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  
  const popVariance = math.variance(data, "uncorrected") as number;
  const popStdDev = math.std(data, "uncorrected") as number;
  
  const sampleVariance = n > 1 ? math.variance(data, "unbiased") as number : 0;
  const sampleStdDev = n > 1 ? math.std(data, "unbiased") as number : 0;

  // Quartiles
  const q1 = math.quantileSeq(sorted, 0.25) as number;
  const q3 = math.quantileSeq(sorted, 0.75) as number;
  const iqr = q3 - q1;

  return {
    n,
    sum,
    sumSq,
    mean,
    median,
    mode,
    min,
    max,
    range,
    popVariance,
    popStdDev,
    sampleVariance,
    sampleStdDev,
    q1,
    q3,
    iqr
  };
}

export function computeLinearRegression(x: number[], y: number[]): RegressionResult | null {
  if (x.length === 0 || x.length !== y.length) return null;
  const n = x.length;
  
  const sumX = math.sum(x);
  const sumY = math.sum(y);
  
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
  const sumY2 = y.reduce((acc, val) => acc + val * val, 0);
  
  const denominator = (n * sumX2 - sumX * sumX);
  if (denominator === 0) return null; // Vertical line

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  
  // Correlation coefficient (r)
  const rNum = (n * sumXY - sumX * sumY);
  const rDenom = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const r = rDenom === 0 ? 0 : rNum / rDenom;
  
  const r2 = r * r;

  return {
    slope,
    intercept,
    r,
    r2,
    equation: `y = ${slope.toPrecision(4)}x + ${intercept.toPrecision(4)}`
  };
}
