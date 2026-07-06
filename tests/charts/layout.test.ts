import { describe, it, expect } from "vitest";
import {
  LEGEND_STYLES,
  CHART_MARGIN_RIGHT,
  ARIAL_CHAR_WIDTHS,
  DEFAULT_CHAR_WIDTH
} from "../../src/constants/styles.js";
import { DONUT_GEOMETRY                            } from "../../src/constants/geometry.js";
import { measureLegend, computeLayout, CONTENT_PAD } from "../../src/charts/layout.js";

const measureText = (text: string) => [...text]
  .reduce((sum, ch) => sum + (ARIAL_CHAR_WIDTHS[ch] ?? DEFAULT_CHAR_WIDTH), 0) * LEGEND_STYLES.FONT_SIZE / 1000;

const entryWidth = (label: string) =>
  LEGEND_STYLES.SQUARE_SIZE + LEGEND_STYLES.TEXT_GAP + measureText(label);

describe("measureLegend", () => {
  it("single column: legendWidth is the widest entry, no column gap", () => {
    const langs = [{ lang: "Go", pct: 50 }, { lang: "JavaScript", pct: 50 }];
    const { columnWidth, legendWidth } = measureLegend(langs, false, "gap");
    const expected = entryWidth("JavaScript 50.0%");
    expect(columnWidth).toBeCloseTo(expected);
    expect(legendWidth).toBeCloseTo(expected);
  });

  it("shifted: each column sized to its own widest entry, not the global widest", () => {
    const langs = [
      { lang: "TypeScript", pct: 17 }, { lang: "JavaScript", pct: 14 },
      { lang: "Rust", pct: 5 }, { lang: "Go", pct: 4 }
    ];
    const { columnWidth, legendWidth } = measureLegend(langs, true, "gap");
    const col0 = entryWidth("TypeScript 17.0%");
    const col1 = entryWidth("Rust 5.0%");
    expect(columnWidth).toBeCloseTo(col0 + LEGEND_STYLES.COLUMN_GAP);
    expect(legendWidth).toBeCloseTo(col0 + LEGEND_STYLES.COLUMN_GAP + col1);
  });
});

describe("computeLayout", () => {
  it("chartX and legendStartX derive from CONTENT_PAD and radius, not the requested width", () => {
    const langs = [{ lang: "Rust", pct: 100 }];
    const { chartX, legendStartX } = computeLayout(langs, DONUT_GEOMETRY, "gap");
    expect(chartX).toBe(CONTENT_PAD + DONUT_GEOMETRY.OUTER_RADIUS);
    expect(legendStartX).toBe(chartX + DONUT_GEOMETRY.OUTER_RADIUS + CHART_MARGIN_RIGHT);
  });

  it("contentWidth hugs the legend's right edge plus CONTENT_PAD", () => {
    const langs = [{ lang: "Rust", pct: 100 }];
    const { legendStartX, legendWidth } = {
      ...computeLayout(langs, DONUT_GEOMETRY, "gap"),
      ...measureLegend(langs, false, "gap")
    };
    const layout = computeLayout(langs, DONUT_GEOMETRY, "gap");
    expect(layout.contentWidth).toBeCloseTo(legendStartX + legendWidth + CONTENT_PAD);
  });

  it("contentHeight grows with extra legend rows once the legend outgrows the donut", () => {
    const few  = computeLayout([{ lang: "A", pct: 100 }], DONUT_GEOMETRY, "gap");
    const many = computeLayout(
      Array.from({ length: 16 }, (_, i) => ({ lang: `L${i}`, pct: 10 })),
      DONUT_GEOMETRY, "gap"
    );
    expect(many.contentHeight).toBeGreaterThan(few.contentHeight);
  });

  it("gapType 'grow': measures width using the raw percentage, not renormalized", () => {
    const langs = [{ lang: "Go", pct: 30 }, { lang: "JavaScript", pct: 30 }];
    const { legendWidth } = measureLegend(langs, false, "grow");
    const expected = entryWidth("JavaScript 30.0%");
    expect(legendWidth).toBeCloseTo(expected);
  });

  it("measureText: falls back to DEFAULT_CHAR_WIDTH for unmapped characters", () => {
    const langs = [{ lang: "日本語", pct: 100 }];
    const { legendWidth } = measureLegend(langs, false, "gap");
    expect(legendWidth).toBeGreaterThan(0);
  });
});
