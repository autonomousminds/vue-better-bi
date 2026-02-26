<script setup lang="ts">
/**
 * BoxPlot component
 * Statistical box plot with min, max, midpoint, and confidence intervals.
 *
 * Data fallback logic (matching Evidence):
 *   whiskerMin = min ?? (midpoint - confidenceInterval) ?? intervalBottom
 *   whiskerMax = max ?? (midpoint + confidenceInterval) ?? intervalTop
 *
 * When confidenceInterval is provided, Q1/Q3 are computed as midpoint +/- CI,
 * and the whiskers also default to that range unless explicit min/max columns exist.
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { BoxPlotProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getDistinctValues } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<BoxPlotProps>(), {
  fillOpacity: 0.8,
  outlineWidth: 1.5,
  xBaseline: true,
  yGridlines: true,
  xAxisLabels: true,
  yAxisLabels: true,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColor, resolveColorPalette, theme } = useThemeStores();

// Process chart configuration
const {
  processedData,
  columnSummary: _columnSummary,
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, { chartType: 'Box Plot' });

// Resolve colors
const fillColorResolved = computed(() =>
  props.fillColor ? resolveColor(props.fillColor).value : undefined
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

// Determine if `color` prop refers to a column in the data or a literal color string
const isColorColumn = computed(() => {
  if (!props.color) return false;
  const firstRow = processedData.value[0];
  return firstRow != null && firstRow[props.color] !== undefined;
});

// Get box plot data
// Evidence fallback logic:
//   whiskerMin = min_col ?? (midpoint - confidenceInterval) ?? intervalBottom
//   whiskerMax = max_col ?? (midpoint + confidenceInterval) ?? intervalTop
//   Q1         = confidenceInterval ? midpoint - CI : intervalBottom
//   Q3         = confidenceInterval ? midpoint + CI : intervalTop
const boxPlotData = computed(() => {
  if (!props.x) return { categories: [] as string[], data: [] as number[][], colors: [] as (string | undefined)[] };

  const categories = getDistinctValues(processedData.value, props.x) as string[];

  const data: number[][] = [];
  const colors: (string | undefined)[] = [];

  for (const cat of categories) {
    const row = processedData.value.find((d) => d[props.x!] === cat);
    if (!row) {
      data.push([0, 0, 0, 0, 0]);
      colors.push(undefined);
      continue;
    }

    const midpointVal = props.midpoint ? (row[props.midpoint] as number) ?? 0 : 0;
    const ciVal = props.confidenceInterval ? (row[props.confidenceInterval] as number) ?? 0 : 0;

    // Q1: prefer confidenceInterval offset, then intervalBottom column
    const q1 = props.confidenceInterval
      ? midpointVal - ciVal
      : props.confidenceIntervalLower
        ? (row[props.confidenceIntervalLower] as number) ?? 0
        : 0;

    // Q3: prefer confidenceInterval offset, then intervalTop column
    const q3 = props.confidenceInterval
      ? midpointVal + ciVal
      : props.confidenceIntervalUpper
        ? (row[props.confidenceIntervalUpper] as number) ?? 0
        : 0;

    // Whisker min: explicit min column → CI-based → intervalBottom
    const whiskerMin = props.min
      ? (row[props.min] as number) ?? 0
      : props.confidenceInterval
        ? midpointVal - ciVal
        : props.confidenceIntervalLower
          ? (row[props.confidenceIntervalLower] as number) ?? 0
          : 0;

    // Whisker max: explicit max column → CI-based → intervalTop
    const whiskerMax = props.max
      ? (row[props.max] as number) ?? 0
      : props.confidenceInterval
        ? midpointVal + ciVal
        : props.confidenceIntervalUpper
          ? (row[props.confidenceIntervalUpper] as number) ?? 0
          : 0;

    // ECharts boxplot format: [min, Q1, median, Q3, max]
    data.push([whiskerMin, q1, midpointVal, q3, whiskerMax]);

    // Per-box color: column value or literal color or undefined
    if (isColorColumn.value) {
      colors.push(row[props.color!] as string | undefined);
    } else {
      colors.push(props.color ?? undefined);
    }
  }

  return { categories, data, colors };
});

// Resolve per-box colors through the theme resolver
const resolvedBoxColors = computed(() => {
  return boxPlotData.value.colors.map((c) => {
    if (!c) return undefined;
    return resolveColor(c).value as string | undefined;
  });
});

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };
  const { categories, data } = boxPlotData.value;

  // Theme-aware defaults
  const themeColors = theme.value.colors;
  const defaultFillColor = themeColors['base-200'] ?? '#f5f5f5';
  const defaultBorderColor = themeColors['primary'] ?? '#4e79a7';

  // Determine whether we're using per-box data-driven coloring
  const hasPerBoxColors = resolvedBoxColors.value.some((c) => c != null);

  const swapXY = props.swapXY ?? false;

  if (swapXY) {
    // Horizontal box plot: categories on y-axis, values on x-axis
    config.yAxis = {
      ...config.yAxis,
      type: 'category',
      data: categories,
      boundaryGap: true,
      inverse: true
    };
    config.xAxis = {
      ...config.xAxis,
      type: 'value',
      scale: true,
      boundaryGap: ['1%', '1%'] as unknown as [string, string]
    };
  } else {
    // Vertical box plot: categories on x-axis, values on y-axis
    config.xAxis = {
      ...config.xAxis,
      type: 'category',
      data: categories,
      boundaryGap: true
    };
    config.yAxis = {
      ...config.yAxis,
      type: 'value',
      scale: true,
      boundaryGap: ['1%', '1%'] as unknown as [string, string]
    };
  }

  // Build series data: when per-box coloring is active, wrap each data point
  // with an itemStyle so ECharts colors them individually
  const seriesData = hasPerBoxColors
    ? data.map((item, i) => {
        const boxColor = resolvedBoxColors.value[i];
        return {
          value: item,
          itemStyle: boxColor
            ? { borderColor: boxColor }
            : undefined
        };
      })
    : data;

  // Update series
  config.series = [
    {
      name: 'boxplot',
      type: 'boxplot' as const,
      data: seriesData,
      colorBy: hasPerBoxColors ? ('data' as const) : ('series' as const),
      itemStyle: {
        color: (fillColorResolved.value as string | undefined) ?? defaultFillColor,
        opacity: props.fillOpacity,
        borderColor: hasPerBoxColors
          ? undefined
          : (outlineColorResolved.value as string | undefined) ?? defaultBorderColor,
        borderWidth: props.outlineWidth
      },
      boxWidth: [7, 25],
      emphasis: {
        disabled: true
      }
    }
  ];

  // Update color palette
  if (colorPaletteResolved.value) {
    config.color = colorPaletteResolved.value;
  }

  // When using per-box colors and there's no explicit color palette, set the
  // resolved box colors as the chart color array so ECharts picks them up for
  // colorBy: 'data'
  if (hasPerBoxColors) {
    const paletteFromBoxColors = resolvedBoxColors.value.filter(
      (c): c is string => c != null
    );
    if (paletteFromBoxColors.length > 0) {
      config.color = paletteFromBoxColors;
    }
  }

  // Custom tooltip: conditionally show min/max rows
  const hasExplicitMin = !!props.min;
  const hasExplicitMax = !!props.max;

  config.tooltip = {
    ...(config.tooltip as Record<string, unknown>),
    trigger: 'item' as const,
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number[] };
      const val = p.value;
      // ECharts boxplot value layout: [min, Q1, median, Q3, max]
      let output = `<span style='font-weight: 600;'>${p.name}</span>`;

      if (hasExplicitMax) {
        output += `<br/>Maximum: <span style='float:right; margin-left: 10px;'>${formatValue(val[4], formats.value.y, unitSummaries.value.y)}</span>`;
      }
      output += `<br/>Q3: <span style='float:right; margin-left: 10px;'>${formatValue(val[3], formats.value.y, unitSummaries.value.y)}</span>`;
      output += `<br/>Median: <span style='float:right; margin-left: 10px;'>${formatValue(val[2], formats.value.y, unitSummaries.value.y)}</span>`;
      output += `<br/>Q1: <span style='float:right; margin-left: 10px;'>${formatValue(val[1], formats.value.y, unitSummaries.value.y)}</span>`;
      if (hasExplicitMin) {
        output += `<br/>Minimum: <span style='float:right; margin-left: 10px;'>${formatValue(val[0], formats.value.y, unitSummaries.value.y)}</span>`;
      }
      return output;
    }
  };

  return config;
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :data="props.data"
    :title="props.title"
    :title-icon="props.titleIcon"
    :subtitle="props.subtitle"
    :height="props.height"
    :width="props.width"
    :renderer="props.renderer"
    :connect-group="props.connectGroup"
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
    :swap-x-y="props.swapXY"
    :background-color="props.backgroundColor"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="processedData"
        :chart-title="props.title"
        :echarts-options="props.echartsOptions"
        :series-options="props.seriesOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
