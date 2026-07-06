import type { ChartType, Theme } from "../types.js";
import { sanitize       } from "./sanitize.js";
import { VALID_TYPES    } from "../constants/types.js";
import { DEFAULT_CONFIG } from "../constants/config.js";
import { THEMES         } from "../constants/themes.js";

export interface ParsedParams {
  chartType:     ChartType;
  chartTitle:    string;
  width:         number;
  height:        number;
  count:         number;
  selectedTheme: Theme;
  stroke:        boolean;
  useTestData:   boolean;
  errorTest:     string;
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
  val:      string | undefined,
  themeKey: "bg" | "text",
  fallback: string
): string => {
  if (!val) return fallback;
  const themeMatch = THEMES[val as keyof typeof THEMES];
  return themeMatch ? themeMatch[themeKey] : parseHex(val, fallback);
};

export function parseQueryParams(query: QueryParams): ParsedParams {
  const baseTheme = THEMES[query["theme"] as keyof typeof THEMES] ?? THEMES.default;
  const count     = parseIntSafe(query["count"], DEFAULT_CONFIG.COUNT);

  const colours: string[] = [...baseTheme.colours];
  for (let i = 1; i <= DEFAULT_CONFIG.MAX_COUNT; i++) {
    const colourVal = query[`c${i}`];
    if (colourVal) colours[i - 1] = parseHex(colourVal, colours[i - 1] ?? baseTheme.text);
  }

  const typeParam = query["type"] as ChartType | undefined;
  const chartType: ChartType = VALID_TYPES.some(t => t === typeParam) ? typeParam! : "donut";

  return {
    chartType,
    chartTitle:  query["hide_title"] === "true" ? '' : sanitize(query["title"] ?? DEFAULT_CONFIG.TITLE),
    width:       Math.max(parseIntSafe(query["width"],  DEFAULT_CONFIG.WIDTH),  DEFAULT_CONFIG.MIN_WIDTH ),
    height:      Math.max(parseIntSafe(query["height"], DEFAULT_CONFIG.HEIGHT), DEFAULT_CONFIG.MIN_HEIGHT),
    count:       Math.min(Math.max(count, 1), DEFAULT_CONFIG.MAX_COUNT),
    selectedTheme: {
      bg:      resolveColour(query["bg"], "bg", baseTheme.bg),
      text:    resolveColour(query["text"], "text", baseTheme.text),
      colours,
    },
    stroke:      query["stroke"] === "true",
    useTestData: query["test"] === "true",
    errorTest:   sanitize(query["error"] ?? '')
  }
}
