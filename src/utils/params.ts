import { VALID_TYPES                    } from "../constants/types.js";
import { DEFAULT_CONFIG                 } from "../constants/config.js";
import { THEMES                         } from "../constants/themes.js";
import type { ChartType, GapType, Theme } from "../charts/types.js";

export interface ParsedParams {
  chartType:     ChartType;
  chartTitle:    string;
  width:         number;
  height:        number;
  count:         number;
  selectedTheme: Theme;
  gapType:       GapType;
  stroke:        boolean;
}

export type QueryParams = Record<string, string | undefined>;

const parseIntSafe = (
  val:      string | undefined,
  fallback: number
): number => {
  const parsed = Number.parseInt(val ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

const parseHex = (val: string | undefined, fallback: string): string => {
  if (!val) return fallback;
  const hex = `#${val.replace(/^#/, '')}`;
  return /^#[0-9a-f]{3,8}$/i.test(hex) ? hex : fallback;
};

const resolveColour = (
  query: QueryParams,
  theme: Theme,
  key:   "bg" | "text" | "gap"
): string => {
  const val = query[key];
  if (!val) return theme[key];
  const themeMatch = THEMES[val as keyof typeof THEMES];
  return themeMatch ? themeMatch[key] : parseHex(val, theme[key]);
};

export function parseQueryParams(query: QueryParams): ParsedParams {
  const baseTheme = THEMES[query["theme"] as keyof typeof THEMES] ?? THEMES.default;
  const count     = parseIntSafe(query["count"], DEFAULT_CONFIG.COUNT);

  const colours: string[] = [...baseTheme.colours];
  for (let i = 1; i <= DEFAULT_CONFIG.MAX_COUNT; i++) {
    const colourVal = query[`c${i}`];
    if (colourVal) {
      const themeMatch = THEMES[colourVal as keyof typeof THEMES];
      colours[i - 1] = themeMatch
        ? themeMatch.colours[i - 1] ?? baseTheme.text
        : parseHex(colourVal, colours[i - 1] ?? baseTheme.text);
    }
  }

  const typeParam = query["type"] as ChartType | undefined;
  const chartType: ChartType = VALID_TYPES.some(t => t === typeParam) ? typeParam! : "donut";

  return {
    chartType,
    chartTitle:  query["hide_title"] === "true" ? '' : query["title"] ?? DEFAULT_CONFIG.TITLE,
    width:       Math.max(parseIntSafe(query["width"],  DEFAULT_CONFIG.WIDTH),  DEFAULT_CONFIG.MIN_WIDTH ),
    height:      Math.max(parseIntSafe(query["height"], DEFAULT_CONFIG.HEIGHT), DEFAULT_CONFIG.MIN_HEIGHT),
    count:       Math.min(Math.max(count, 1), DEFAULT_CONFIG.MAX_COUNT),
    selectedTheme: {
      bg:      resolveColour(query, baseTheme, "bg"),
      text:    resolveColour(query, baseTheme, "text"),
      gap:     resolveColour(query, baseTheme, "gap"),
      colours,
    },
    gapType:     (["gap", "grow", "adapt"] as const).includes(query["gap_type"] as GapType) ? query["gap_type"] as GapType : "gap",
    stroke:      query["stroke"] === "true",
  }
}
