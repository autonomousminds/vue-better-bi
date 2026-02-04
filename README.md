# Vue ECharts Charts

A Vue 3 charting library built on Apache ECharts with advanced formatting, theming, and export capabilities.

> This library was inspired by [evidence.dev](https://evidence.dev) charts.

## Features

- **16 Chart Types**: Bar, Line, Area, Scatter, Bubble, Box Plot, Histogram, Funnel, Heatmap, Calendar Heatmap, Sankey, US Map, Area Map, Point Map, Bubble Map
- **100+ Built-in Formats**: Currencies (USD, EUR, GBP, etc.), dates, numbers, percentages with automatic scaling (k, M, B, T)
- **Light/Dark Theme Support**: Automatic system detection with manual toggle
- **Export Options**: PNG, JPEG, CSV download and clipboard copy
- **TypeScript Support**: Full type definitions included
- **Reference Components**: Add reference lines, areas, and points to charts

## Installation

```bash
npm install vue-better-echarts echarts
```

## Quick Start

```vue
<script setup>
import { BarChart, LineChart, useTheme } from 'vue-better-echarts';

const { activeAppearance, cycleAppearance } = useTheme();

const data = [
  { month: 'Jan', sales: 12500, orders: 145 },
  { month: 'Feb', sales: 15200, orders: 178 },
  { month: 'Mar', sales: 18900, orders: 210 },
  { month: 'Apr', sales: 16400, orders: 189 },
  { month: 'May', sales: 21000, orders: 245 },
  { month: 'Jun', sales: 24500, orders: 289 }
];
</script>

<template>
  <button @click="cycleAppearance">Toggle Theme</button>

  <BarChart
    :data="data"
    x="month"
    y="sales"
    title="Monthly Sales"
    yFmt="usd0k"
  />

  <LineChart
    :data="data"
    x="month"
    :y="['sales', 'orders']"
    title="Sales & Orders Trend"
    :markers="true"
  />
</template>
```

## Chart Types

### Basic Charts

| Component | Description |
|-----------|-------------|
| `BarChart` | Vertical/horizontal bars with stacked, grouped, or stacked100 modes |
| `LineChart` | Line charts with markers, step interpolation, missing value handling |
| `AreaChart` | Area charts with stacked or stacked100 modes |
| `ScatterPlot` | Scatter plots with customizable point shapes and opacity |

### Advanced Charts

| Component | Description |
|-----------|-------------|
| `BubbleChart` | Scatter with size dimension |
| `BoxPlot` | Statistical box plots |
| `Histogram` | Automatic binning |
| `FunnelChart` | Funnel/pipeline visualization |

### Specialized Charts

| Component | Description |
|-----------|-------------|
| `Heatmap` | 2D heatmap with color scales |
| `CalendarHeatmap` | Calendar-based heatmap for time series |
| `SankeyDiagram` | Flow visualization |

### Maps

| Component | Description |
|-----------|-------------|
| `USMap` | US choropleth map |
| `AreaMap` | Custom GeoJSON choropleth |
| `PointMap` | Point markers on world map |
| `BubbleMap` | Sized bubbles on world map |

### Reference Components

| Component | Description |
|-----------|-------------|
| `ReferenceLine` | Horizontal/vertical reference lines |
| `ReferenceArea` | Shaded reference areas |
| `ReferencePoint` | Labeled reference points |

## Formatting

Use the `yFmt`, `xFmt`, or `valueFmt` props to format values:

### Currency Formats
- `usd`, `usd0`, `usd1`, `usd2` - US Dollars
- `usd0k`, `usd1k`, `usd2k` - USD in thousands
- `usd0m`, `usd1m`, `usd2m` - USD in millions
- `eur`, `gbp`, `jpy`, `cny`, etc. - Other currencies

### Number Formats
- `num0`, `num1`, `num2`, `num3`, `num4` - Decimals
- `num0k`, `num1k`, `num2k` - Thousands
- `num0m`, `num1m`, `num2m` - Millions
- `pct`, `pct0`, `pct1`, `pct2`, `pct3` - Percentages

### Date Formats
- `shortdate`, `longdate`, `fulldate`
- `mdy`, `dmy`, `hms`
- `mmm`, `mmmm`, `yyyy`

## Theming

### Using Theme Composable

```typescript
import { useTheme } from 'vue-better-echarts';

const {
  activeAppearance,    // Current theme: 'light' | 'dark'
  selectedAppearance,  // User preference: 'light' | 'dark' | 'system'
  setAppearance,       // Set preference
  cycleAppearance,     // Cycle through options
  resolveColor,        // Resolve color for current theme
  resolveColorPalette  // Get color palette
} = useTheme();
```

### Custom Themes

```typescript
import { configureThemes } from 'vue-better-echarts';

configureThemes({
  light: {
    colors: {
      'base-100': '#ffffff',
      'base-content': '#333333'
    },
    colorPalettes: {
      default: ['#3366cc', '#dc3912', '#ff9900']
    }
  }
});
```

## Props Reference

### Common Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `Array` | Data array |
| `x` | `string` | X-axis column |
| `y` | `string \| string[]` | Y-axis column(s) |
| `series` | `string` | Column to split into series |
| `title` | `string` | Chart title |
| `subtitle` | `string` | Chart subtitle |
| `height` | `string` | Chart height (default: '291px') |
| `width` | `string` | Chart width (default: '100%') |
| `legend` | `boolean` | Show legend |
| `yFmt` | `string` | Y-axis value format |
| `xFmt` | `string` | X-axis value format |

### Export Props

| Prop | Type | Description |
|------|------|-------------|
| `downloadableData` | `boolean` | Enable CSV download (default: true) |
| `downloadableImage` | `boolean` | Enable image download (default: true) |

## Running the Demo

```bash
cd examples/demo-app
npm install
npm run dev
```

## API

### Composables

- `useTheme()` - Theme management
- `useECharts()` - Direct ECharts instance management
- `useFormatting()` - Value formatting utilities
- `useExport()` - Export functionality

### Core Components

- `EChartsBase` - Base ECharts wrapper component
- `ChartProvider` - Context provider for nested components
- `ChartFooter` - Download buttons component

## License

MIT
