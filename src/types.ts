export type Point = {
  x: number;
  y: number;
};

export type Language = {
  lang: string;
  pct:  number;
};

export type Geometry = {
  CENTER_Y:     number;
  INNER_RADIUS: number;
  OUTER_RADIUS: number;
};

export type ChartType = "donut" | "pie";

export type ChartResult = {
  segments:      string;
  legend:        string;
  contentWidth:  number;
  contentHeight: number;
};

export type Theme = {
  readonly colours: readonly string[];
  readonly text:    string;
  readonly bg:      string;
};

export interface ParsedParams {
  chartType:     ChartType;
  chartTitle:    string;
  width:         number;
  height:        number;
  count:         number;
  selectedTheme: Theme;
  stroke:        boolean;
  useTestData:   boolean;
  errorTest:     string;
}
