import { describe, it, expect, vi } from "vitest";
import { createDonutSegments      } from "../../src/charts/geometry.js";
import { generatePieChart         } from "../../src/charts/pie.js";
import { createLegend             } from "../../src/charts/legend.js";

vi.mock("../../src/charts/geometry.js", () => ({
  createDonutSegments: vi.fn(() => `<path d="mockSegment"/>`)
}));

vi.mock("../../src/charts/legend.js", () => ({
  createLegend: vi.fn(() => `<rect/><text>mockLegend</text>`)
}));

const mockCreateDonutSegments = vi.mocked(createDonutSegments);
const mockCreateLegend = vi.mocked(createLegend);

describe("generatePieChart", () => {
  const theme = { colours: ["#f00", "#0f0"], text: "#333", bg: "#fff", gap: "#000" };

  it("returns segments, legend, and content dimensions", () => {
    const langs = [{ lang: "JS", pct: 100 }];
    const result = generatePieChart(langs, theme, "gap", false);
    expect(result).toHaveProperty("segments");
    expect(result).toHaveProperty("legend");
    expect(result).toHaveProperty("contentWidth");
    expect(result).toHaveProperty("contentHeight");
    expect(mockCreateDonutSegments).toHaveBeenCalled();
    expect(mockCreateLegend).toHaveBeenCalled();
  });

  it("passes INNER_RADIUS: 0 for filled pie", () => {
    const langs = [{ lang: "Python", pct: 100 }];
    generatePieChart(langs, theme, "gap", false);
    const call = mockCreateDonutSegments.mock.calls.at(-1)!;
    const geometry = call[2];
    expect(geometry.INNER_RADIUS).toBe(0);
  });

  it("computes chartX and legendStartX as numbers", () => {
    const langs = [{ lang: "Rust", pct: 100 }];
    generatePieChart(langs, theme, "gap", false);
    const segmentCall = mockCreateDonutSegments.mock.calls.at(-1)!;
    const legendCall = mockCreateLegend.mock.calls.at(-1)!;
    expect(typeof segmentCall[1]).toBe("number");
    expect(typeof legendCall[2]).toBe("number");
  });
});
