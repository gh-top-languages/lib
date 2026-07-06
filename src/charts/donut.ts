import { DONUT_GEOMETRY                             } from "../constants/geometry.js";
import type { ChartResult, GapType, Language, Theme } from "./types.js";
import { computeLayout } from "./layout.js";
import { createDonutSegments          } from "./geometry.js";
import { createLegend                 } from "./legend.js";

export function generateDonutChart(
  normalizedLanguages: Language[],
  selectedTheme:       Theme,
  gapType:             GapType,
  stroke:              boolean,
): ChartResult {
  const {
    chartX,
    legendStartX,
    columnWidth,
    contentWidth,
    contentHeight
  } = computeLayout(normalizedLanguages, DONUT_GEOMETRY, gapType);

  const segments = createDonutSegments(
    normalizedLanguages,
    chartX,
    DONUT_GEOMETRY,
    [...selectedTheme.colours],
    stroke,
    gapType,
    selectedTheme.gap
  );
  const legend = createLegend(
    normalizedLanguages,
    selectedTheme,
    legendStartX,
    stroke,
    columnWidth,
    gapType
  );

  return { segments, legend, contentWidth, contentHeight };
}
