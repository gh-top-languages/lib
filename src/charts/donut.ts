import { DONUT_GEOMETRY                    } from "../constants/geometry.js";
import type { ChartResult, Language, Theme } from "./types.js";
import { resolveLayout, computeLayout      } from "./layout.js";
import { createDonutSegments               } from "./geometry.js";
import { createLegend                      } from "./legend.js";

export function generateDonutChart(
  normalizedLanguages: Language[],
  selectedTheme:       Theme,
  stroke:              boolean
): ChartResult {
  const { isShifted, useStroke } = resolveLayout(normalizedLanguages.length, stroke);
  const {
    chartX,
    legendStartX,
    columnWidth,
    contentWidth,
    contentHeight
  } = computeLayout(normalizedLanguages, isShifted, DONUT_GEOMETRY);

  const segments = createDonutSegments(
    normalizedLanguages,
    chartX,
    DONUT_GEOMETRY,
    [...selectedTheme.colours],
    useStroke
  );
  const legend = createLegend(
    normalizedLanguages,
    isShifted,
    selectedTheme,
    legendStartX,
    useStroke,
    columnWidth
  );

  return { segments, legend, contentWidth, contentHeight };
}
