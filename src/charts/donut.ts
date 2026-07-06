import { DONUT_GEOMETRY                             } from "../constants/geometry.js";
import type { ChartResult, GapType, Language, Theme } from "./types.js";
import { resolveLayout, computeLayout } from "./layout.js";
import { createDonutSegments          } from "./geometry.js";
import { createLegend                 } from "./legend.js";

export function generateDonutChart(
  normalizedLanguages: Language[],
  selectedTheme:       Theme,
  gapType:             GapType,
  stroke:              boolean,
): ChartResult {
  const { isShifted, useStroke } = resolveLayout(normalizedLanguages.length, stroke);
  const {
    chartX,
    legendStartX,
    columnWidth,
    contentWidth,
    contentHeight
  } = computeLayout(normalizedLanguages, isShifted, DONUT_GEOMETRY, gapType);

  const segments = createDonutSegments(
    normalizedLanguages,
    chartX,
    DONUT_GEOMETRY,
    [...selectedTheme.colours],
    useStroke,
    gapType,
    selectedTheme.gap
  );
  const legend = createLegend(
    normalizedLanguages,
    isShifted,
    selectedTheme,
    legendStartX,
    useStroke,
    columnWidth,
    gapType
  );

  return { segments, legend, contentWidth, contentHeight };
}
