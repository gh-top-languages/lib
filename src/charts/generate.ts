import type { ChartResult, Language, Theme, ChartType, GapType } from "./types.js";
import { generateDonutChart } from "./donut.js";
import { generatePieChart   } from "./pie.js";

const CHART_GENERATORS: Record<ChartType, (
  data:    Language[],
  theme:   Theme,
  gapType: GapType,
  stroke:  boolean
) => ChartResult> = {
  donut: generateDonutChart,
  pie:   generatePieChart,
}

export function generateChartData(
  data:      Language[],
  theme:     Theme,
  chartType: ChartType,
  gapType:   GapType,
  stroke:    boolean
): ChartResult {
  const generator = CHART_GENERATORS[chartType] || CHART_GENERATORS.donut;
  return generator(data, theme, gapType, stroke);
}
