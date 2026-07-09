import type { GapType, Language } from "./types.js";

export function displayPct(pct: number, totalPct: number, gapType: GapType): number {
  return gapType === "adapt" && totalPct > 0 ? pct * (100 / totalPct) : pct;
}

export function formatLegendEntry(lang: Language, totalPct: number, gapType: GapType): string {
  return `${lang.lang} ${displayPct(lang.pct, totalPct, gapType).toFixed(1)}%`;
}
