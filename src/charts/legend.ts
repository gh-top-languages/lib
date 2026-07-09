import { LEGEND_SHIFT_THRESHOLD, LEGEND_STYLES } from "../constants/styles.js";
import type { Theme, Language, GapType         } from "./types.js";
import { formatLegendEntry, resolveColour      } from "./helpers.js";

export function createLegend(
  languages:     Language[],
  selectedTheme: Theme,
  legendStartX:  number,
  stroke:        boolean,
  columnWidth:   number,
  gapType:       GapType,
): string {
  const numLangs = languages.length;
  const totalPct = languages.reduce((sum, l) => sum + l.pct, 0);

  return languages.map((lang, i) => {
    let x: number, y: number;

    if (languages.length <= LEGEND_SHIFT_THRESHOLD) {
      x = legendStartX;
      y = LEGEND_STYLES.START_Y + i * LEGEND_STYLES.ROW_HEIGHT;
    } else {
      const half = Math.ceil(numLangs / 2);
      const col  = Math.floor(i / half);
      const row  = i % half;

      x = legendStartX + col * columnWidth;
      y = LEGEND_STYLES.START_Y + row * LEGEND_STYLES.ROW_HEIGHT;
    }

    const fill = resolveColour(selectedTheme.colours, i);
    const strokeAttr = stroke
      ? ` stroke="#000" stroke-width="0.5" stroke-linejoin="round"`
      : ``;

    return `
      <rect
        x="${x}"
        y="${y - LEGEND_STYLES.SQUARE_SIZE + 3}"
        width="${LEGEND_STYLES.SQUARE_SIZE}"
        height="${LEGEND_STYLES.SQUARE_SIZE}"
        fill="${fill}"
        rx="${LEGEND_STYLES.SQUARE_RADIUS}"${strokeAttr}
      />
      <text
        x="${x + LEGEND_STYLES.SQUARE_SIZE + LEGEND_STYLES.TEXT_GAP}"
        y="${y}"
        fill="${selectedTheme.text}"
        font-size="${LEGEND_STYLES.FONT_SIZE}"
        font-family="Arial"
      >
      ${formatLegendEntry(lang, totalPct, gapType)}
    </text>
    `;
  }).join('');
}
