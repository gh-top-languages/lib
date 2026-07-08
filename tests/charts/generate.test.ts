import { describe, it, expect, vi, afterEach } from "vitest";
import type { ChartType, Theme               } from "../../src/charts/types.js";
import { generateChartData        } from "../../src/charts/generate.js";
import { createDonutSegments      } from "../../src/charts/geometry.js";
import { createLegend             } from "../../src/charts/legend.js";

vi.mock("../../src/charts/geometry.js", () => ({
  createDonutSegments: vi.fn(() => `<path d="mockSegment"/>`)
}));

vi.mock("../../src/charts/legend.js", () => ({
  createLegend: vi.fn(() => "<rect/><text>mockLegend</text>")
}));

const mockCreateDonutSegments = vi.mocked(createDonutSegments);
const mockCreateLegend = vi.mocked(createLegend);

const theme: Theme = { colours: ["#f00", "#0f0"], text: "#333", bg: "#fff", gap: "#000" };

describe("generateChartData", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  ["donut" as ChartType, "pie" as ChartType].forEach((type) => {
    describe(`${type} context`, () => {
      it("returns segments, legend, and content dimensions", () => {
        const langs  = [{ lang: "JS", pct: 100 }];
        const result = generateChartData(langs, theme, type, "gap", false);
        expect(result).toHaveProperty("segments");
        expect(result).toHaveProperty("legend");
        expect(result).toHaveProperty("contentWidth");
        expect(result).toHaveProperty("contentHeight");
        expect(mockCreateDonutSegments).toHaveBeenCalled();
        expect(mockCreateLegend).toHaveBeenCalled();
      });

      it("computes chartX and legendStartX as numbers", () => {
        const langs = [{ lang: "Python", pct: 100 }];
        generateChartData(langs, theme, type, "gap", false);
        const segmentCall = mockCreateDonutSegments.mock.calls.at(-1);
        const legendCall = mockCreateLegend.mock.calls.at(-1) ?? [];
        expect(typeof segmentCall![1]).toBe("number");
        expect(typeof legendCall[2]).toBe("number");
        expect(typeof legendCall[4]).toBe("number");
      });

      it("passes theme to both segments and legend", () => {
        const langs = [{ lang: "HTML", pct: 100 }];
        generateChartData(langs, theme, type, "gap", false);
        const segmentsCall = mockCreateDonutSegments.mock.calls.at(-1)!;
        const legendCall = mockCreateLegend.mock.calls.at(-1) ?? [];
        expect(segmentsCall[3]).toEqual(theme.colours);
        expect(legendCall[1]).toBe(theme);
      });
    });
  });

  describe("donut", () => {
    it("falls back to donut geometry for unrecognized chartType", () => {
      const langs = [{ lang: "JS", pct: 100 }];
      generateChartData(langs, theme, "bigbadwolf" as ChartType, "gap", false);
      const call = mockCreateDonutSegments.mock.calls.at(-1)!;
      expect(call[2].INNER_RADIUS).not.toBe(0);
    });

    it("passes non-zero INNER_RADIUS for donut", () => {
      const langs = [{ lang: "HTML", pct: 100 }];
      generateChartData(langs, theme, "donut", "gap", false);
      const call = mockCreateDonutSegments.mock.calls.at(-1)!;
      const geometry = call[2];
      expect(geometry.INNER_RADIUS).not.toBe(0);
    });
  });

  describe("pie", () => {
    it("passes INNER_RADIUS: 0 for filled pie", () => {
      const langs = [{ lang: "Python", pct: 100 }];
      generateChartData(langs, theme, "pie", "gap", false);
      const call = mockCreateDonutSegments.mock.calls.at(-1)!;
      const geometry = call[2];
      expect(geometry.INNER_RADIUS).toBe(0);
    });
  });
});
