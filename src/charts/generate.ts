import { DONUT_GEOMETRY, PIE_GEOMETRY } from "../constants/geometry.js";
import type { ChartResult, Language, Theme, ChartType, GapType, Geometry } from "./types.js";
import { computeLayout                } from "./layout.js";
import { createDonutSegments          } from "./geometry.js";
import { createLegend                 } from "./legend.js";

const GEOMETRY: Record<ChartType, Geometry> = { donut: DONUT_GEOMETRY, pie: PIE_GEOMETRY };

export function generateChartData(
  data: Language[],
  theme: Theme,
  chartType: ChartType,
  gapType: GapType,
  stroke: boolean
): ChartResult {
  const geometry = GEOMETRY[chartType] ?? GEOMETRY.donut;

  const {
    chartX,
    legendStartX,
    columnWidth,
    contentWidth,
    contentHeight
  } = computeLayout(data, geometry, gapType);

  const segments = createDonutSegments(
    data,
    chartX,
    geometry,
    [...theme.colours],
    stroke,
    gapType,
    theme.gap
  );
  const legend = createLegend(
    data,
    theme,
    legendStartX,
    stroke,
    columnWidth,
    gapType
  );

  return { segments, legend, contentWidth, contentHeight };
}
