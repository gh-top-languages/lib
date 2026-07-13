# GitHub Top Languages Library

Core library for gh-top-languages — chart generation, SVG output, and parameter parsing

[![CI](https://github.com/gh-top-languages/lib/actions/workflows/ci.yml/badge.svg)](https://github.com/gh-top-languages/lib/actions/workflows/ci.yml)
[![Library Version](https://img.shields.io/npm/v/@gh-top-languages/lib)](https://www.npmjs.com/package/@gh-top-languages/lib)
![Node](https://img.shields.io/badge/Node.js-22+-green)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

## Module APIs
### Public
Importable via `@gh-top-languages/lib/<path>`:
| Path                    | Description                                            |
| ---                     | ---                                                    |
| `charts/types.js`       | Shared types                                           |
| `charts/generate.js`    | Chart geometry dispatch, segment and legend generation |
| `render/svg.js`         | SVG document rendering                                 |
| `render/error.js`       | Error SVG rendering                                    |
| `utils/params.js`       | Query parameter parsing and normalization              |
| `utils/sanitize.js`     | HTML entity sanitization                               |
| `constants/config.js`   | Defaults for configurations and parameters             |
| `constants/themes.js`   | Built-in colour themes                                 |

### Defaults
Exported so consumers can use the library's default values without duplicating them:
- `DEFAULT_CONFIG` (sizes, count, title)
- `PARAM_DEFAULTS` (theme, type, gap_type)

### Internal
Shipped in the package but not part of the public API:
| Path                    | Description                                   |
| ---                     | ---                                           |
| `constants/geometry.js` | Geometry constants                            |
| `constants/styles.js`   | Style and layout constants                    |
| `constants/types.js`    | Valid chart type values                       |
| `charts/geometry.js`    | SVG arc path math and segment helpers         |
| `charts/helpers.js`     | Percent display and colour-resolution helpers |
| `charts/legend.js`      | Legend element generation                     |
| `charts/layout.js`      | Shared layout calculations                    |

### Escaping
`renderSvg`, `renderError`, and legend generation HTML-escape their text
inputs (title, error message, language names).

## Query parameters
All parsing lives in `parseQueryParams`(utils/params.js), invalid params fall back to defaults.

| Param          | Default       | Behaviour                                          |
| -----          | -------       | ---------                                          |
| type           | donut         | `donut` or `pie`                                   |
| count          | 8             | Parsed as integer, clamped to `1`-`16`             |
| theme          | default       | `default`, `light`, or `dark`                      |
| bg, text, gap, c1 - c16  | from theme | Accepts a theme name, or a hex value (3-8 digits with or without #) |
| gap_type       | gap           | `gap`, `grow`, or `adapt`                          |
| stroke         | false         | Adds a black outline to slices and legend squares. |
| title          | Top Languages | Custom SVG title                                   |
| hide_title     | false         | If `true` title is not rendered                    |
| width / height | 400 / 300     | Integers, minimums: width 400, height 265          |

## Gap modes
When the supplied languages sum to less than 100%, `gap_type` controls what fills the ring and what the legend prints:
| Mode | Ring | Legend %s |
| ---- | ---- | --------- |
| gap  | True-size slices, remainder drawn as the gap colour | Raw values, sum to 100 if all values are rendered |
| grow | Slice angles scaled to fill the circle              | Raw values, sum to 100 if all values are rendered |
| adapt | Slice angles scaled to fill the circle             | Rescaled to sum to 100 |

## API
Easily deploy your own with [@gh-top-languages/api](https://github.com/gh-top-languages/api): a deployable SVG endpoint for READMEs and websites.

## Builder
Easily customize your charts with [@gh-top-languages/builder](https://github.com/gh-top-languages/builder): an interactive preview and configurator.

## Installation
### Prerequisites
- Node.js 22+

### Install Library
```bash
npm install @gh-top-languages/lib
```

## License
MIT License - see [LICENSE](./LICENSE) for details.
