import { describe, it, expect } from "vitest";
import { LEGEND_STYLES        } from "../../src/constants/styles.js";
import type { Theme           } from "../../src/charts/types.js";
import { createLegend         } from "../../src/charts/legend.js";

const theme: Theme = { colours: ["#f00", "#0f0", "#00f"], text: "#333", bg: "#fff", gap: "#000" };

describe("createLegend", () => {
  it("single-column layout positions correctly", () => {
    const langs = [
      { lang: "JavaScript", pct: 60 },
      { lang: "Python", pct: 40 }
    ];
    const result = createLegend(langs, false, theme, 300, false, 110, "gap");
    expect(result).toContain(`x="300"`);
    expect(result).toContain(`y="${LEGEND_STYLES.START_Y}"`);
    expect(result).toContain(`y="${LEGEND_STYLES.START_Y + LEGEND_STYLES.ROW_HEIGHT}"`);
  });

  it("two-column layout when isShifted", () => {
    const langs = Array.from({ length: 8 }, (_, i) => ({
      lang: `Lang${i}`,
      pct: 12.5
    }));
    const result = createLegend(langs, true, theme, 300, false, 110, "gap");
    expect(result).toContain(`x="300"`);
    expect(result).toContain(`x="${300 + 110}"`);
  });

  it("formats percentages to one decimal", () => {
    const langs = [{ lang: "Rust", pct: 33.333 }];
    const result = createLegend(langs, false, theme, 300, false, 110, "gap");

    expect(result).toContain("33.3%");
    expect(result).not.toContain("33.333");
  });

  it("adds stroke attributes when stroke is enabled", () => {
    const langs = [{ lang: "C#", pct: 100 }];
    const result = createLegend(langs, false, theme, 300, true, 110, "gap");

    expect(result).toContain(`stroke="#000"`);
    expect(result).toContain(`stroke-width="0.5"`);
  });

  it("generates rect and text for each language", () => {
    const langs = [
      { lang: "C#", pct: 50 },
      { lang: "C++", pct: 50 }
    ];
    const result = createLegend(langs, false, theme, 300, false, 110, "gap");
    expect(result.match(/<rect/g)!.length).toBe(2);
    expect(result.match(/<text/g)!.length).toBe(2);
    expect(result).toContain("C# 50.0%");
    expect(result).toContain("C++ 50.0%");
  });

  it("applies theme colours correctly", () => {
    const langs = [{ lang: "Java", pct: 100 }];
    const result = createLegend(langs, false, theme, 300, false, 110, "gap");
    expect(result).toContain(`fill="#f00"`);
    expect(result).toContain(`fill="${theme.text}"`);
  });

  it("gapType 'gap': shows raw percentages even when total < 100", () => {
    const langs = [{ lang: "JS", pct: 30 }, { lang: "TS", pct: 30 }];
    const result = createLegend(langs, false, theme, 300, false, 110, "gap");
    expect(result).toContain("JS 30.0%");
    expect(result).toContain("TS 30.0%");
  });

  it("gapType 'grow': renormalizes percentages to sum to 100", () => {
    const langs = [{ lang: "JS", pct: 30 }, { lang: "TS", pct: 30 }];
    const result = createLegend(langs, false, theme, 300, false, 110, "grow");
    expect(result).toContain("JS 50.0%");
    expect(result).toContain("TS 50.0%");
  });

  it("gapType 'adapt': also renormalizes percentages to sum to 100", () => {
    const langs = [{ lang: "JS", pct: 10 }, { lang: "TS", pct: 30 }];
    const result = createLegend(langs, false, theme, 300, false, 110, "adapt");
    expect(result).toContain("JS 25.0%");
    expect(result).toContain("TS 75.0%");
  });
});
