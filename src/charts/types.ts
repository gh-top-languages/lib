export type Point = {
  x: number;
  y: number;
};

export type Geometry = {
  CENTER_Y:     number;
  INNER_RADIUS: number;
  OUTER_RADIUS: number;
};

export type Language = {
  lang: string;
  pct:  number;
};

export type ChartType = "donut" | "pie";

export type ChartResult = {
  segments:      string;
  legend:        string;
  contentWidth:  number;
  contentHeight: number;
};

export type Theme = {
  readonly text: string;
  readonly bg:   string;
  readonly gap:  string;
  readonly colours: readonly string[];
};

export type GapType = "gap" | "grow" | "adapt";
