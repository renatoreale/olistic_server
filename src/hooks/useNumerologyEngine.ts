import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  calculateFromConfig,
  type NumerologyAlgorithmConfig,
  type CalcParams,
} from "@/lib/numerologyEngine";
import {
  calculateLifePath,
  calculateExpression,
  calculateSoul,
  calculatePersonality,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculateDayVibration,
  calculateQuintessenza,
} from "@/lib/numerology";

export type { NumerologyAlgorithmConfig };

// Fallback hardcoded per ogni chiave, usati se l'algoritmo DB non è trovato o fallisce
const FALLBACKS: Record<string, (p: CalcParams) => number | null> = {
  lifePath:     (p) => p.birthDay && p.birthMonth && p.birthYear ? calculateLifePath(p.birthDay, p.birthMonth, p.birthYear) : null,
  expression:   (p) => p.fullName ? calculateExpression(p.fullName) : null,
  soul:         (p) => p.fullName ? calculateSoul(p.fullName) : null,
  personality:  (p) => p.fullName ? calculatePersonality(p.fullName) : null,
  personalYear: (p) => p.birthDay && p.birthMonth && p.currentYear != null ? calculatePersonalYear(p.birthDay, p.birthMonth, p.currentYear!) : null,
  personalMonth:(p) => p.derivedValues?.personalYear != null && p.currentMonth != null ? calculatePersonalMonth(p.derivedValues.personalYear, p.currentMonth!) : null,
  dayVibration: (p) => p.currentDay && p.currentMonth && p.currentYear != null ? calculateDayVibration(p.currentDay, p.currentMonth, p.currentYear!) : null,
  quintessenza: (p) => p.derivedValues?.expression != null && p.derivedValues?.lifePath != null ? calculateQuintessenza(p.derivedValues.expression, p.derivedValues.lifePath) : null,
};

export function useNumerologyEngine() {
  const [algorithms, setAlgorithms] = useState<NumerologyAlgorithmConfig[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase
      .from("numerology_algorithms" as any)
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }: { data: any[] | null; error: any }) => {
        if (error) console.error("[NumerologyEngine] fetch failed:", error);
        if (data && data.length > 0) setAlgorithms(data as NumerologyAlgorithmConfig[]);
      })
      .catch((e: unknown) => console.error("[NumerologyEngine] unexpected error:", e))
      .finally(() => setReady(true));
  }, []);

  /** Calcola un singolo algoritmo per chiave — usa DB se disponibile, altrimenti fallback hardcoded */
  const computeByKey = useCallback((key: string, params: CalcParams): number | null => {
    const config = algorithms.find(a => a.key === key && a.is_active);
    if (config) {
      const result = calculateFromConfig(config, params);
      if (result !== null) return result;
    }
    return FALLBACKS[key]?.(params) ?? null;
  }, [algorithms]);

  /** Calcola tutti i numeri principali in ordine corretto (rispetta le dipendenze dei derivati) */
  const computeAll = useCallback((
    fullName: string,
    birthDay: number,
    birthMonth: number,
    birthYear: number,
    currentYear  = new Date().getFullYear(),
    currentMonth = new Date().getMonth() + 1,
    currentDay   = new Date().getDate(),
  ) => {
    const base: CalcParams = { fullName, birthDay, birthMonth, birthYear, currentYear, currentMonth, currentDay };

    const lifePath    = computeByKey("lifePath",    base);
    const expression  = computeByKey("expression",  base);
    const soul        = computeByKey("soul",        base);
    const personality = computeByKey("personality", base);
    const personalYear= computeByKey("personalYear",base);

    // Build derivedValues map per formule derivate
    const derivedValues: Record<string, number> = {};
    if (lifePath    != null) derivedValues.lifePath    = lifePath;
    if (expression  != null) derivedValues.expression  = expression;
    if (soul        != null) derivedValues.soul        = soul;
    if (personality != null) derivedValues.personality = personality;
    if (personalYear!= null) derivedValues.personalYear= personalYear;

    const quintessenza  = computeByKey("quintessenza",  { ...base, derivedValues });
    const personalMonth = computeByKey("personalMonth", { ...base, derivedValues });
    const dayVibration  = computeByKey("dayVibration",  base);

    return { lifePath, expression, soul, personality, personalYear, personalMonth, quintessenza, dayVibration };
  }, [computeByKey]);

  return { algorithms, ready, computeByKey, computeAll };
}
