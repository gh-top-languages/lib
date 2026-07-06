import { describe, it, expect, vi                     } from "vitest";
import { THEMES                                       } from "../../src/constants/themes.js";
import type { ChartType, ChartResult, Language, Theme } from "../../src/charts/types.js";
import { generateChartData                            } from "../../src/charts/generate.js";
import { generateDonutChart                           } from "../../src/charts/donut.js";

type MockChartResult = ChartResult & { mockData: boolean; data: Language[]; theme: Theme; };

vi.mock("../../src/charts/donut.js", () => ({
  generateDonutChart: vi.fn((data, theme, _gapType, _stroke) => ({
    segments: "", legend: "", contentWidth: 0, contentHeight: 0,
    mockData: true, data, theme
  } as MockChartResult))
}));

describe("generateChartData", () => {
  const data      = [{ lang: "JavaScript", pct: 60 }];
  const theme     = THEMES.default;
  const chartType = "donut";
  const gapType   = "gap";
  const stroke    = false;

  it("should call donut generator when chartType is donut", () => {
    const result = generateChartData(data, theme, chartType, gapType, stroke) as MockChartResult;
    expect(generateDonutChart).toHaveBeenCalledWith(data, theme, gapType, stroke);
    expect(result.data).toBe(data);
    expect(result.theme).toBe(theme);
  });

  it("defaults to donut generator when chartType is undefined", () => {
    generateChartData(data, theme, undefined as unknown as ChartType, gapType, stroke);
    expect(generateDonutChart).toHaveBeenCalledWith(data, theme, gapType, stroke);
  });

  it("defaults to donut generator for unrecognized chartType", () => {
    generateChartData(data, theme, "bigbadwolf" as ChartType, gapType, stroke);
    expect(generateDonutChart).toHaveBeenCalledWith(data, theme, gapType, stroke);
  });
});
