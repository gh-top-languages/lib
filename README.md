# GitHub Top Languages Library

Core library for gh-top-languages — chart generation, SVG output, and parameter parsing

[![CI](https://github.com/gh-top-languages/lib/actions/workflows/ci.yml/badge.svg)](https://github.com/gh-top-languages/lib/actions/workflows/ci.yml)
[![Library Version](https://img.shields.io/npm/v/@gh-top-languages/lib)](https://www.npmjs.com/package/@gh-top-languages/lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

## Modules
| Path                    | Description                               |
| ---                     | ---                                       |
| `constants/config.js`   | Default configuration values              |
| `constants/geometry.js` | Geometry constants                        |
| `constants/styles.js`   | Style and layout constants                |
| `constants/themes.js`   | Built-in colour themes                    |
| `constants/types.js`    | Valid chart type values                   |
| `charts/types.js`       | Shared types                              |
| `utils/params.js`       | Query parameter parsing and normalization |
| `utils/sanitize.js`     | HTML entity sanitization                  |
| `charts/geometry.js`    | SVG arc path math and segment helpers     |
| `charts/legend.js`      | Legend element generation                 |
| `charts/layout.js`      | Shared layout calculations                |
| `charts/generate.js`    | Chart geometry dispatch, segment and legend generation |
| `render/svg.js`         | SVG document rendering                    |
| `render/error.js`       | Error SVG rendering                       |

## Query parameters
All parsing lives in `parseQueryParams`(utils/params.js), invalid params fall back to defaults.

| Param          | Default       | Behaviour                                 |
| -----          | -------       | ---------                                 |
| type           | donut         | `donut` or `pie`                          |
| count          | 8             | Parsed as integer, clamped to `1`-`16`    |
| theme          | default       | `default`, `light`, or `dark`             |
| bg, text, gap, c1 - c16  | from theme | Accepts a theme name, or a hex value (3-8 digits with or without #) |
| gap_type       | gap           | `gap`, `grow`, or `adapt`                 |
| stroke         | false         | Adds a black outline to slices and legend squares. |
| title          | Top Languages | HTML-escaped                              |
| hide_title     | false         | If `true` title is not rendered           |
| width / height | 400 / 300     | Integers, minimums: width 400, height 265 |
| test           | false         | Disable/enable requesting test data       |
| error          | ''            | Test hook: sanitized message for testing the error card. |

## Gap modes
When the supplied languages sum to less than 100%, `gap_type` controls what fills the ring and what the legend prints:
| Mode | Ring | Legend %s |
| ---- | ---- | --------- |
| gap  | True-size slices, remainder drawn as the gap colour | Raw values, sum to 100 if all values are rendered |
| grow | Slice angles scaled to fill the circle              | Raw values, sum to 100 if all values are rendered |
| adapt | Slice angles scaled to fill the circle             | Rescaled to sum to 100 |

## Installation
```bash
npm install @gh-top-languages/lib
```

## License
MIT License - see [LICENSE](./LICENSE) for details.
