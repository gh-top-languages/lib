import { describe, it, expect, vi } from "vitest";
import type { Theme               } from "../../src/charts/types.js";
import { generateDonutChart       } from "../../src/charts/donut.js";
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

describe("generateDonutChart", () => {
  const theme: Theme = { colours: ["#f00", "#0f0"], text: "#333", bg: "#fff", gap: "#000" };

  it("returns segments, legend, and content dimensions", () => {
    const langs  = [{ lang: "JS", pct: 100 }];
    const result = generateDonutChart(langs, theme, "gap", false);
    expect(result).toHaveProperty("segments");
    expect(result).toHaveProperty("legend");
    expect(result).toHaveProperty("contentWidth");
    expect(result).toHaveProperty("contentHeight");
    expect(mockCreateDonutSegments).toHaveBeenCalled();
    expect(mockCreateLegend).toHaveBeenCalled();
  });

  it("computes chartX and legendStartX as numbers", () => {
    const langs = [{ lang: "Python", pct: 100 }];
    generateDonutChart(langs, theme, "gap", false);
    const segmentCall = mockCreateDonutSegments.mock.calls.at(-1);
    const legendCall = mockCreateLegend.mock.calls.at(-1) ?? [];
    expect(typeof segmentCall![1]).toBe("number");
    expect(typeof legendCall[2]).toBe("number");
    expect(typeof legendCall[4]).toBe("number");
  });

  it("passes theme to both segments and legend", () => {
    const langs = [{ lang: "HTML", pct: 100 }];
    generateDonutChart(langs, theme, "gap", false);
    const segmentsCall = mockCreateDonutSegments.mock.calls.at(-1)!;
    const legendCall = mockCreateLegend.mock.calls.at(-1) ?? [];
    expect(segmentsCall[3]).toEqual(theme.colours);
    expect(legendCall[1]).toBe(theme);
  });
});
