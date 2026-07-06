import { TITLE_STYLES     } from "../constants/styles.js";
import type { ChartResult } from "../charts/types.js";

export function renderSvg(
  width: number, height: number, background: string,
  chart: ChartResult, title: string | null, textColour: string
): string {
  const titleElement = title ? `
    <text
      x="${chart.contentWidth / 2}"
      y="${TITLE_STYLES.TEXT_Y}"
      text-anchor="middle" fill="${textColour}"
      font-family="Arial" font-size="${TITLE_STYLES.FONT_SIZE}"
    >
      ${title}
    </text>
  ` : '';

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${background}" rx="10"/>
      <svg width="${width}" height="${height}"
           viewBox="0 0 ${chart.contentWidth} ${chart.contentHeight}"
           preserveAspectRatio="xMidYMid meet">
        ${titleElement}
        ${chart.segments}
        ${chart.legend}
      </svg>
    </svg>`.trim();
}
