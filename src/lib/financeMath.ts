export interface TVMParams {
  pv: number; // Present Value
  fv: number; // Future Value
  rate: number; // Annual Interest Rate (%)
  periods: number; // Number of compounding periods (e.g. years)
  pmt: number; // Periodic Payment
}

export function computeCompoundInterest(principal: number, ratePercent: number, timesCompounded: number, years: number) {
  const r = ratePercent / 100;
  const amount = principal * Math.pow(1 + r / timesCompounded, timesCompounded * years);
  return amount;
}

export function computeLoanAmortization(principal: number, annualRatePercent: number, years: number) {
  if (annualRatePercent === 0) {
    return principal / (years * 12);
  }
  
  const r = (annualRatePercent / 100) / 12; // Monthly rate
  const n = years * 12; // Total months
  
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
}

export function computeROI(initialInvestment: number, finalValue: number) {
  if (initialInvestment === 0) return 0;
  return ((finalValue - initialInvestment) / initialInvestment) * 100;
}

// Solves for FV using standard TVM formula
export function solveTVMFutureValue(pv: number, ratePercent: number, periods: number, pmt: number) {
  const r = ratePercent / 100;
  if (r === 0) return pv + (pmt * periods);
  
  const fv = pv * Math.pow(1 + r, periods) + pmt * ((Math.pow(1 + r, periods) - 1) / r);
  return fv;
}
