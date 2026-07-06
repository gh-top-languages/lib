import {
  LEGEND_SHIFT_THRESHOLD,
  LEGEND_STYLES,
  CHART_MARGIN_RIGHT,
  ARIAL_CHAR_WIDTHS,
  DEFAULT_CHAR_WIDTH
} from "../constants/styles.js";
import type { Geometry, Language } from "./types.js";

export function resolveLayout(count: number, stroke: boolean) {
  return {
    isShifted: count > LEGEND_SHIFT_THRESHOLD,
    useStroke: count > 1 ? stroke : false
  };
}

const measureText = (text: string, fontSize: number): number => [...text]
  .reduce((sum, ch) => sum + (ARIAL_CHAR_WIDTHS[ch] ?? DEFAULT_CHAR_WIDTH), 0) * fontSize / 1000;

const estimateEntryWidth = (label: string): number =>
  LEGEND_STYLES.SQUARE_SIZE + LEGEND_STYLES.TEXT_GAP + measureText(label, LEGEND_STYLES.FONT_SIZE);

export function measureLegend(languages: Language[], isShifted: boolean) {
  const entryWidth = (lang: Language) => estimateEntryWidth(`${lang.lang} ${lang.pct.toFixed(1)}%`);

  if (!isShifted) {
    const width = languages.reduce((max, l) => Math.max(max, entryWidth(l)), 0);
    return { columnWidth: width, legendWidth: width };
  }

  const half = Math.ceil(languages.length / 2);
  const col0Width = languages.slice(0, half).reduce((max, l) => Math.max(max, entryWidth(l)), 0);
  const col1Width = languages.slice(half).reduce((max, l) => Math.max(max, entryWidth(l)), 0);

  const columnWidth = col0Width + LEGEND_STYLES.COLUMN_GAP;
  const legendWidth = columnWidth + col1Width;

  return { columnWidth, legendWidth };
}

export const CONTENT_PAD = 20;

export function computeLayout(languages: Language[], isShifted: boolean, geometry: Geometry) {
  const { columnWidth, legendWidth } = measureLegend(languages, isShifted);

  const chartX       = CONTENT_PAD + geometry.OUTER_RADIUS;
  const legendStartX = chartX + geometry.OUTER_RADIUS + CHART_MARGIN_RIGHT;
  const contentWidth = legendStartX + legendWidth + CONTENT_PAD;

  const rows          = isShifted ? Math.ceil(languages.length / 2) : languages.length;
  const legendBottom  = LEGEND_STYLES.START_Y + (rows - 1) * LEGEND_STYLES.ROW_HEIGHT + LEGEND_STYLES.SQUARE_SIZE;
  const chartBottom   = geometry.CENTER_Y + geometry.OUTER_RADIUS;
  const contentHeight = Math.max(chartBottom, legendBottom) + CONTENT_PAD;

  return { chartX, legendStartX, columnWidth, contentWidth, contentHeight };
}
