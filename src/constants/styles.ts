export const TITLE_STYLES = {
  TEXT_Y:    30,
  FONT_SIZE: 24
} as const;

export const LEGEND_STYLES = {
  START_Y:          80,
  ROW_HEIGHT:       25,
  SQUARE_SIZE:      12,
  SQUARE_RADIUS:    2,
  FONT_SIZE:        11,
  TEXT_GAP:         5,
  COLUMN_GAP:       15,
} as const;

export const ERROR_STYLES = {
  TEXT_Y:    100,
  FONT_SIZE: 18,
  COLOUR:    "#ff6b6b"
} as const;

export const LEGEND_SHIFT_THRESHOLD = 8;
export const CHART_MARGIN_RIGHT     = 20;

export const ARIAL_CHAR_WIDTHS: Record<string, number> = {
  " ": 278, "!": 278, "#": 556, "%": 889, "+": 584, ".": 278, "-": 333,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556,
  "5": 556, "6": 556, "7": 556, "8": 556, "9": 556,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611,
  G: 778, H: 722, I: 278, J: 500, K: 667, L: 556,
  M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722,
  S: 667, T: 611, U: 722, V: 667, W: 944, X: 667,
  Y: 667, Z: 611,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278,
  g: 556, h: 556, i: 222, j: 222, k: 500, l: 222,
  m: 833, n: 556, o: 556, p: 556, q: 556, r: 333,
  s: 500, t: 278, u: 556, v: 500, w: 722, x: 500,
  y: 500, z: 500
} as const;
export const DEFAULT_CHAR_WIDTH = 556;
