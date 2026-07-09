import type { GapType, Language } from "./types.js";

export function displayPct(pct: number, totalPct: number, gapType: GapType): number {
  return gapType === "adapt" && totalPct > 0 ? pct * (100 / totalPct) : pct;
}

export function formatLegendEntry(lang: Language, totalPct: number, gapType: GapType): string {
  return `${lang.lang} ${displayPct(lang.pct, totalPct, gapType).toFixed(1)}%`;
}

function hexToHsl(hex: string): { s: number; l: number } | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) return null;

  const r = parseInt(match[1]!.slice(0, 2), 16) / 255;
  const g = parseInt(match[1]!.slice(2, 4), 16) / 255;
  const b = parseInt(match[1]!.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l   = (max + min) / 2;
  const d   = max - min;
  const s   = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  return { s: s * 100, l: l * 100 };
}

export function resolveColour(colours: readonly string[], index: number): string {
  const base = colours[index];
  if (base) return base;

  const parsed = colours.map(hexToHsl).filter((c): c is { s: number; l: number } => c !== null);
  const avg = (key: "s" | "l") =>
    parsed.length > 0 ? parsed.reduce((sum, c) => sum + c[key], 0) / parsed.length : 65;

  const hue = (index * 137.508) % 360;
  return `hsl(${hue.toFixed(1)}, ${avg("s").toFixed(1)}%, ${avg("l").toFixed(1)}%)`;
}
