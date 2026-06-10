# GitHub Top Languages Library

Core library for github-top-languages projects — chart generation, SVG output, and parameter parsing

## Modules

| Module                  | Description |
| ---                     | --- |
| `charts/donut.js`       | Donut chart segment and legend generation |
| `charts/pie.js`         | Pie chart segment and legend generation   |
| `charts/geometry.js`    | SVG arc path math and segment helpers     |
| `charts/legend.js`      | Legend element generation                 |
| `charts/layout.js`      | Shared layout calculations                |
| `render/chart.js`       | Chart type dispatcher                     |
| `render/svg.js`         | SVG document rendering                    |
| `render/error.js`       | Error SVG rendering                       |
| `utils/params.js`       | Query parameter parsing and normalization |
| `utils/sanitize.js`     | HTML entity sanitization                  |
| `constants/config.js`   | Default configuration values              |
| `constants/geometry.js` | Geometry constants                        |
| `constants/styles.js`   | Style and layout constants                |
| `constants/themes.js`   | Built-in colour themes                    |
| `constants/types.js`    | Valid chart type values                   |
| `types.js`              | Shared TypeScript types                   |

## Installation

```bash
npm install github-top-languages-lib
```

## License
MIT License - see [LICENSE](./LICENSE) for details.
