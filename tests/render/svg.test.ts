import { describe, it, expect } from "vitest";
import type { ChartResult     } from "../../src/charts/types.js";
import { renderSvg            } from "../../src/render/svg.js";

describe("renderSvg", () => {
  const chart: ChartResult = {
    segments: `<circle cx="200" r="100" fill="red"/>`,
    legend:   `<text x="50" y="50">Legend</text>`,
    contentWidth: 300,
    contentHeight: 250
  };

  it("renders complete SVG with all elements", () => {
    const result = renderSvg(600, 400, "#ffffff", chart, "Test Title", "#000000");

    expect(result).toContain(`<svg width="600" height="400"`);
    expect(result).toContain(`fill="#ffffff"`);
    expect(result).toContain(`viewBox="0 0 300 250"`);
    expect(result).toContain(chart.segments);
    expect(result).toContain(chart.legend);
    expect(result).toContain("Test Title");
  });

  it("omits title element when title is not provided", () => {
    const result = renderSvg(600, 400, "#ffffff", chart, null, "#000000");

    expect(result).not.toContain(`text-anchor="middle"`);
    expect(result).toContain(chart.segments);
    expect(result).toContain(chart.legend);
  });
});
