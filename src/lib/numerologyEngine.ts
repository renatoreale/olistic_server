import { letterToNumber, vowels, normalizeText } from "./numerology";

export const CHALDEAN_MAPPING: Record<string, number> = {
  A:1, B:2, C:3, D:4, E:5, F:8, G:3, H:5, I:1,
  J:1, K:2, L:3, M:4, N:5, O:7, P:8, Q:1, R:2,
  S:3, T:4, U:6, V:6, W:6, X:5, Y:1, Z:7,
};

export interface NumerologyAlgorithmConfig {
  id: string;
  category: string;
  key: string;
  name: string;
  description: string;
  input_type: "name" | "birthdate" | "derived";
  letter_filter: "all" | "vowels" | "consonants";
  mapping_type: "pythagorean" | "chaldean" | "custom";
  custom_mapping: Record<string, number>;
  birthdate_formula: "sum_all_digits" | "personal_year" | "personal_month" | "day_vibration";
  derived_formula: string;
  allow_master_numbers: boolean;
  master_numbers: number[];
  is_active: boolean;
  is_system: boolean;
  sort_order: number;
}

export function reduceWithConfig(num: number, allowMasters: boolean, masterNums: number[]): number {
  while (num > 9 && !(allowMasters && masterNums.includes(num))) {
    num = num.toString().split("").reduce((s, d) => s + parseInt(d), 0);
  }
  return num;
}

export interface CalcParams {
  fullName?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  currentYear?: number;
  currentMonth?: number;
  currentDay?: number;
  derivedValues?: Record<string, number>;
}

export function calculateFromConfig(
  config: NumerologyAlgorithmConfig,
  params: CalcParams,
): number | null {
  const reduce = (n: number) => reduceWithConfig(n, config.allow_master_numbers, config.master_numbers);

  if (config.input_type === "name") {
    const { fullName } = params;
    if (!fullName) return null;

    const mapping: Record<string, number> =
      config.mapping_type === "custom"
        ? (config.custom_mapping || {})
        : config.mapping_type === "chaldean"
          ? CHALDEAN_MAPPING
          : letterToNumber;

    const normalized = normalizeText(fullName);
    const letters = normalized.split("").filter((l) => {
      if (config.letter_filter === "vowels") return vowels.includes(l);
      if (config.letter_filter === "consonants") return !vowels.includes(l);
      return true;
    });

    const sum = letters.reduce((acc, l) => acc + (mapping[l] ?? 0), 0);
    return reduce(sum);

  } else if (config.input_type === "birthdate") {
    const { birthDay, birthMonth, birthYear } = params;
    if (!birthDay || !birthMonth || !birthYear) return null;

    const now = new Date();
    const cy = params.currentYear ?? now.getFullYear();
    const cm = params.currentMonth ?? (now.getMonth() + 1);
    const cd = params.currentDay ?? now.getDate();

    // Default to sum_all_digits if formula not set (e.g. input_type changed without setting formula)
    switch (config.birthdate_formula ?? "sum_all_digits") {
      case "sum_all_digits": {
        const rd = reduce(birthDay);
        const rm = reduce(birthMonth);
        const ry = reduce(birthYear);
        return reduce(rd + rm + ry);
      }
      case "personal_year": {
        const yearReduced = reduce(cy);
        return reduce(birthDay + birthMonth + yearReduced);
      }
      case "personal_month": {
        const yearReduced = reduce(cy);
        const personalYear = reduce(birthDay + birthMonth + yearReduced);
        return reduce(personalYear + cm);
      }
      case "day_vibration": {
        return reduce(cd + cm + reduce(cy));
      }
      default:
        return null;
    }

  } else if (config.input_type === "derived") {
    const { derivedValues } = params;
    if (!config.derived_formula || !derivedValues) return null;

    // Parses simple arithmetic: "soul + lifePath", "expression - soul"
    const tokens = config.derived_formula.trim().split(/\s*([+\-])\s*/);
    let result = 0;
    let operator = "+";
    for (const token of tokens) {
      if (token === "+" || token === "-") { operator = token; continue; }
      const literal = parseFloat(token);
      const val = isNaN(literal) ? (derivedValues[token] ?? 0) : literal;
      result = operator === "+" ? result + val : result - val;
    }
    return result > 0 ? reduce(Math.round(result)) : null;
  }

  return null;
}
