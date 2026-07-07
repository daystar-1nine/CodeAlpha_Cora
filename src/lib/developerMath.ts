export type WordSize = 8 | 16 | 32 | 64;

// Create a mask of 'N' bits. E.g., for 8 bits: 0xFF
export function getMask(size: WordSize): bigint {
  return (1n << BigInt(size)) - 1n;
}

// Clamps a BigInt to the given word size (unsigned)
export function clampUnsigned(value: bigint, size: WordSize): bigint {
  return value & getMask(size);
}

// Converts an unsigned BigInt (which was clamped) to a signed BigInt
export function toSigned(value: bigint, size: WordSize): bigint {
  const mask = getMask(size);
  const clamped = value & mask;
  
  const signBit = 1n << BigInt(size - 1);
  if ((clamped & signBit) !== 0n) {
    // Negative number: subtract 2^size
    return clamped - (1n << BigInt(size));
  }
  return clamped;
}

// Converts a string to BigInt based on base
export function parseBase(str: string, base: "HEX" | "DEC" | "OCT" | "BIN"): bigint | null {
  if (!str) return 0n;
  try {
    const cleanStr = str.replace(/[^0-9A-Fa-f-]/g, ""); // strip invalid chars
    
    // JS BigInt doesn't natively parse base 2, 8, 16 directly via constructor with radix parameter if it has negative.
    // Instead we prefix it.
    let prefix = "";
    if (base === "HEX") prefix = "0x";
    if (base === "OCT") prefix = "0o";
    if (base === "BIN") prefix = "0b";
    
    const isNeg = cleanStr.startsWith("-");
    const numPart = isNeg ? cleanStr.slice(1) : cleanStr;
    if (!numPart) return 0n;

    let result = 0n;
    if (base === "DEC") {
      result = BigInt(isNeg ? `-${numPart}` : numPart);
    } else {
      result = BigInt(`${prefix}${numPart}`);
      if (isNeg) result = -result;
    }
    return result;
  } catch {
    return null; // Invalid parse
  }
}

// Format BigInt to string in given base
export function formatBase(value: bigint, base: "HEX" | "DEC" | "OCT" | "BIN", size: WordSize, isSigned: boolean): string {
  // If we are looking at HEX, OCT, BIN, we usually want the raw bits (unsigned representation of memory).
  // If DEC, we respect the isSigned flag.
  let v = clampUnsigned(value, size);
  
  if (base === "DEC") {
    if (isSigned) {
      v = toSigned(v, size);
    }
    return v.toString(10);
  }
  
  if (base === "HEX") return v.toString(16).toUpperCase();
  if (base === "OCT") return v.toString(8);
  if (base === "BIN") return v.toString(2).padStart(size, "0");
  
  return v.toString(10);
}

// Flip a specific bit
export function toggleBit(value: bigint, bitIndex: number, size: WordSize): bigint {
  if (bitIndex < 0 || bitIndex >= size) return value;
  const bit = 1n << BigInt(bitIndex);
  return clampUnsigned(value ^ bit, size);
}

// Bitwise Operations
export function operate(a: bigint, b: bigint, op: string, size: WordSize): bigint {
  const uA = clampUnsigned(a, size);
  const uB = clampUnsigned(b, size);
  
  let res = 0n;
  switch (op) {
    case "AND": res = uA & uB; break;
    case "OR": res = uA | uB; break;
    case "XOR": res = uA ^ uB; break;
    case "NOT": res = ~uA; break;
    case "NAND": res = ~(uA & uB); break;
    case "NOR": res = ~(uA | uB); break;
    case "LSH": res = uA << uB; break;
    case "RSH": res = uA >> uB; break; // Logical right shift equivalent since BigInt doesn't have >>> natively
    default: res = uA;
  }
  
  return clampUnsigned(res, size);
}

// Decode ASCII from 64-bit chunk (up to 8 chars)
export function getAscii(value: bigint, size: WordSize): string {
  const uVal = clampUnsigned(value, size);
  let hex = uVal.toString(16);
  if (hex.length % 2 !== 0) hex = "0" + hex;
  
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    // Printable ASCII range + extended
    if (code >= 32 && code <= 126) {
      str += String.fromCharCode(code);
    } else {
      str += "."; // non-printable placeholder
    }
  }
  return str || ".";
}
