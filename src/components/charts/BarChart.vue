<script setup lang="ts">
/**
 * BarChart component
 * Supports stacked, grouped, and stacked100 layouts
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { BarChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig, getDistinctCount } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { getStackPercentages } from '../../utils/getStackPercentages';
import { getCompletedData, replaceNulls } from '../../utils/getCompletedData';

const props = withDefaults(defineProps<BarChartProps>(), {
  type: 'stacked',
  fillOpacity: 1,
  outlineWidth: 0,
  swapXY: false,
  xBaseline: true,
  yGridlines: true,
  xAxisLabels: true,
  yAxisLabels: true,
  downloadableData: true,
  downloadableImage: true,
  seriesLabels: true,
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();

// Evidence rejects y2 on horizontal charts — silently ignore y2 when swapXY
const effectiveY2 = computed(() => props.swapXY ? undefined : props.y2);

// Effective y2 count for zoom targeting
const effectiveY2Count = computed(() => {
  const y2 = effectiveY2.value;
  if (!y2) return 0;
  return Array.isArray(y2) ? y2.length : 1;
});

// Interactive features - use getters for reactivity
const {
  interactiveConfig,
  tooltipBaseConfig
} = useInteractiveFeatures({
  zoom: () => props.zoom,
  toolbox: () => props.toolbox,
  brush: () => props.brush,
  animation: () => props.animation,
  tooltip: () => props.tooltip,
  swapXY: () => props.swapXY,
  y2Count: () => effectiveY2Count.value,
  chartType: 'bar'
});

// Resolve colors
const fillColorResolved = computed(() =>
  props.fillColor ? resolveColor(props.fillColor).value : undefined
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const labelColorResolved = computed(() =>
  props.labelColor ? resolveColor(props.labelColor).value : undefined
);
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);
const seriesColorsResolved = computed(() =>
  props.seriesColors ? resolveColorsObject(props.seriesColors).value : undefined
);
const yAxisColorResolved = computed(() =>
  props.yAxisColor ? resolveColor(props.yAxisColor).value : undefined
);
const y2AxisColorResolved = computed(() =>
  props.y2AxisColor ? resolveColor(props.y2AxisColor).value : undefined
);

// Process chart configuration
const {
  processedData: rawProcessedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, {
  chartType: 'Bar Chart',
  stacked100: props.type === 'stacked100',
  resolvedColorPalette: () => colorPaletteResolved.value,
  resolvedYAxisColor: () => yAxisColorResolved.value,
  resolvedY2AxisColor: () => y2AxisColorResolved.value
});

// Derive the y-columns list (needed for data transforms)
const yColumns = computed<string[]>(() => {
  if (!props.y) return [];
  return Array.isArray(props.y) ? props.y : [props.y];
});

// Determine if multi-series (either `series` prop or multiple y columns)
const isMultiSeries = computed(() =>
  !!props.series || yColumns.value.length > 1
);

const isStacked = computed(() =>
  props.type === 'stacked' || props.type === 'stacked100'
);

/**
 * Processed data pipeline:
 * 1. xMismatch coercion — numeric x values on a category axis are coerced to strings
 * 2. Data completion — fill missing x/series combinations with zeros (stacked charts)
 * 3. Null replacement — replace null y values with 0 (stacked charts)
 * 4. Stacked100 transformation — convert raw values to percentages
 * 5. Sort by stack total — for horizontal bars or when sort=true with stacked multi-series
 */
const processedData = computed(() => {
  let data = [...rawProcessedData.value];
  if (data.length === 0 || !props.x || !props.y) return data;

  const x = props.x;
  const yCols = yColumns.value;

  // --- 1. xMismatch: coerce numeric x values to strings on category axes ---
  const xAxisType = _xAxisType.value;
  if (xAxisType === 'category' && data.some(d => typeof d[x] === 'number')) {
    data = data.map(d => ({ ...d, [x]: String(d[x]) }));
  }

  // --- 2. Data completion for stacked charts ---
  if (isStacked.value && props.series) {
    data = getCompletedData(data, x, props.y, props.series, { nullsZero: true });
  }

  // --- 3. Replace null y values with 0 for stacked charts ---
  if (isStacked.value) {
    data = replaceNulls(data, yCols);
  }

  // --- 4. Stacked100 transformation ---
  if (props.type === 'stacked100') {
    const result = getStackPercentages(data, x, yCols);
    // Replace y column values in-place with their percentage equivalents
    // The _pct columns are added by getStackPercentages; we'll map back to originals
    data = result.data.map(row => {
      const newRow = { ...row };
      for (let i = 0; i < yCols.length; i++) {
        newRow[yCols[i]] = row[result.yColumns[i]];
      }
      return newRow;
    });
  }

  // --- 5. Sort by stack total for stacked multi-series ---
  if (props.sort === true && isStacked.value && isMultiSeries.value) {
    // Compute total per x-value across all y columns
    const totals = new Map<unknown, number>();
    for (const row of data) {
      const xVal = row[x];
      const rowTotal = yCols.reduce((sum, col) => sum + (Number(row[col]) || 0), 0);
      totals.set(xVal, (totals.get(xVal) || 0) + rowTotal);
    }

    // Build sort order: x-values sorted by total descending
    const sortedX = [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([xVal]) => xVal);

    // Sort data according to the computed x-order
    const xOrder = new Map(sortedX.map((xVal, idx) => [xVal, idx]));
    data = [...data].sort((a, b) =>
      (xOrder.get(a[x]) ?? 0) - (xOrder.get(b[x]) ?? 0)
    );
  }

  return data;
});

// Build bar series configuration
const barSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  const stacked = isStacked.value;
  // Determine if individual bar labels should show:
  // When labels=true and seriesLabels is not explicitly false, show labels on individual bars.
  // For stacked multi-series with stackTotalLabel, default seriesLabels to false
  // (Evidence: seriesLabels defaults to true, but labels on individual stacked bars are
  //  suppressed when only stack totals are desired)
  const showSeriesLabels = props.seriesLabels !== false;

  // Default label position: 'inside' for stacked multi-series, otherwise 'right' (horizontal) or 'top' (vertical)
  const defaultPosition = (stacked && isMultiSeries.value)
    ? 'inside'
    : (props.swapXY ? 'right' : 'top');

  // Resolve label position: map 'outside' to proper ECharts positions (Evidence pattern)
  // 'outside' is not a reliable ECharts position for bar charts — map it explicitly
  const labelPositionMap: Record<string, string> = props.swapXY
    ? { outside: 'right', inside: 'inside' }
    : { outside: 'top', inside: 'inside' };
  const resolvedPosition = props.labelPosition
    ? (labelPositionMap[props.labelPosition] ?? props.labelPosition)
    : defaultPosition;

  return {
    type: 'bar',
    stack: stacked ? 'total' : undefined,
    barMaxWidth: props.swapXY ? undefined : 60,
    itemStyle: {
      color: fillColorResolved.value,
      opacity: props.fillOpacity,
      borderColor: outlineColorResolved.value,
      borderWidth: props.outlineWidth
    },
    label: props.labels ? {
      show: showSeriesLabels,
      position: resolvedPosition,
      fontSize: props.labelSize || 11,
      color: labelColorResolved.value,
      formatter: (params: { value: unknown[]; seriesIndex: number }) => {
        const value = props.swapXY ? params.value[0] : params.value[1];
        if (value === 0 || value == null) return '';
        const isY2 = seriesData.value[params.seriesIndex]?.yAxisIndex === 1;
        const labelFmt = isY2
          ? (props.y2LabelFmt || props.labelFmt)
          : (props.yLabelFmt || props.labelFmt);
        const format = labelFmt
          ? getFormatObjectFromString(labelFmt)
          : (isY2 ? formats.value.y2 : formats.value.y);
        return formatValue(value, format, isY2 ? unitSummaries.value.y2 : unitSummaries.value.y);
      }
    } : undefined,
    // Label layout: hide overlapping labels unless showAllLabels is true
    labelLayout: props.labels ? {
      hideOverlap: !props.showAllLabels
    } : undefined,
    emphasis: {
      focus: 'series'
    }
  };
});

// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  const baseSeriesConfig = barSeriesConfig.value;

  const allSeries = getSeriesConfig(
    processedData.value,
    props.x,
    props.y,
    props.series,
    props.swapXY || false,
    baseSeriesConfig,
    columnSummary.value,
    {
      y2: effectiveY2.value,
      seriesOrder: props.seriesOrder,
      seriesLabelFmt: props.seriesLabelFmt,
      fillMissingData: isStacked.value
    }
  );

  // Apply y2SeriesType: change y2 series to the specified type (default: 'line')
  if (effectiveY2.value) {
    const y2Type = props.y2SeriesType || 'line';
    for (let i = 0; i < allSeries.length; i++) {
      if (allSeries[i].yAxisIndex === 1) {
        allSeries[i].type = y2Type;
        allSeries[i].stack = undefined;
        if (y2Type === 'line') {
          allSeries[i].symbol = 'circle';
          allSeries[i].symbolSize = 6;
        }
      }
    }
  }

  return allSeries;
});

// Auto-expand height for horizontal bars when no explicit height is set.
// When swapXY is true and there are many categories, the default height (291px)
// can make bars too thin. Scale up based on the number of bar slots.
const dynamicHeight = computed(() => {
  if (!props.swapXY || props.height) return props.height;

  const distinctX = props.x ? getDistinctCount(processedData.value, props.x) : 0;
  const stacked = isStacked.value;
  const seriesCount = props.series
    ? getDistinctCount(processedData.value, props.series)
    : (Array.isArray(props.y) ? props.y.length : 1);
  // Stacked bars share a slot; grouped bars multiply
  const barSlots = stacked ? distinctX : distinctX * seriesCount;
  const DEFAULT_MAX_BARS = 8;
  const DEFAULT_HEIGHT = 291;
  if (barSlots <= DEFAULT_MAX_BARS) return undefined; // use default
  const heightMultiplier = barSlots / DEFAULT_MAX_BARS;
  return `${Math.round(DEFAULT_HEIGHT * heightMultiplier)}px`;
});

// Build final config
const chartConfig = computed<EChartsOption>(() => {
  const config = { ...baseConfig.value };

  // Update series
  config.series = seriesData.value as EChartsOption['series'];

  // Update color palette
  if (colorPaletteResolved.value) {
    config.color = colorPaletteResolved.value;
  }

  // Handle stacked100 value-axis formatting
  if (props.type === 'stacked100') {
    if (props.swapXY) {
      // Horizontal stacked100: format the x-axis (value axis)
      const xAxisRaw = config.xAxis as Record<string, unknown> | undefined;
      if (xAxisRaw) {
        xAxisRaw.max = 1;
        xAxisRaw.axisLabel = {
          ...(xAxisRaw.axisLabel as Record<string, unknown> | undefined),
          formatter: (value: number) => `${Math.round(value * 100)}%`
        };
      }
    } else {
      // Vertical stacked100: format the y-axis (value axis)
      const yAxisRaw = config.yAxis;
      const primaryYAxis = (Array.isArray(yAxisRaw) ? yAxisRaw[0] : yAxisRaw) as Record<string, unknown> | undefined;
      if (primaryYAxis) {
        primaryYAxis.max = 1;
        primaryYAxis.axisLabel = {
          ...(primaryYAxis.axisLabel as Record<string, unknown> | undefined),
          formatter: (value: number) => `${Math.round(value * 100)}%`
        };
      }
    }
  }

  // Handle stack total labels
  if (props.stackTotalLabel && isStacked.value) {
    const seriesArray = seriesData.value;
    // Add a hidden series for stack total labels
    const stackTotalSeries = {
      name: 'stackTotal',
      type: 'bar' as const,
      stack: 'total',
      itemStyle: { color: 'transparent' },
      label: {
        show: true,
        position: props.swapXY ? 'right' as const : 'top' as const,
        fontWeight: 'bold' as const,
        fontSize: props.labelSize || 11,
        padding: props.swapXY ? [0, 0, 0, 5] as [number, number, number, number] : undefined,
        formatter: (params: { value: unknown[]; dataIndex: number }) => {
          // Calculate total from all real series (not the stackTotal itself)
          let total = 0;
          for (const s of seriesArray) {
            const dataPoint = s.data[params.dataIndex] as unknown[];
            if (dataPoint) {
              total += (dataPoint[props.swapXY ? 0 : 1] as number) || 0;
            }
          }
          if (total === 0) return '';
          const labelFmt = props.yLabelFmt || props.labelFmt;
          const format = labelFmt
            ? getFormatObjectFromString(labelFmt)
            : formats.value.y;
          return formatValue(total, format, unitSummaries.value.y);
        }
      },
      data: seriesArray[0]?.data.map(() => [0, 0]) || []
    };
    (config.series as unknown[]).push(stackTotalSeries);

    // Disable legend toggle when stackTotalLabel is shown — toggling individual
    // series would break the total calculation (matches Evidence behavior)
    const legendConfig = config.legend as Record<string, unknown> | undefined;
    if (legendConfig) {
      legendConfig.selectedMode = false;
    }
  }

  // Merge interactive features
  const interactive = interactiveConfig.value;
  if (interactive.dataZoom) {
    config.dataZoom = interactive.dataZoom;
  }
  if (interactive.toolbox) {
    config.toolbox = interactive.toolbox;
  }
  if (interactive.brush) {
    config.brush = interactive.brush;
  }
  // Merge animation settings
  if (interactive.animation !== undefined) {
    config.animation = interactive.animation;
  }
  if (interactive.animationDuration !== undefined) {
    config.animationDuration = interactive.animationDuration;
  }
  if (interactive.animationDurationUpdate !== undefined) {
    config.animationDurationUpdate = interactive.animationDurationUpdate;
  }
  if (interactive.animationEasing !== undefined) {
    config.animationEasing = interactive.animationEasing;
  }
  if (interactive.animationDelay !== undefined) {
    config.animationDelay = interactive.animationDelay;
  }
  if (interactive.animationThreshold !== undefined) {
    config.animationThreshold = interactive.animationThreshold;
  }

  // Merge tooltip config from interactive features
  const tooltipBase = tooltipBaseConfig.value;
  if (tooltipBase && Object.keys(tooltipBase).length > 0) {
    config.tooltip = { ...(config.tooltip as Record<string, unknown>), ...tooltipBase } as EChartsOption['tooltip'];
  }

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
    :height="dynamicHeight || props.height"
    :width="props.width"
    :renderer="props.renderer"
    :connect-group="props.connectGroup"
    :series-colors="seriesColorsResolved as Record<string, string>"
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
    :show-all-x-axis-labels="props.showAllXAxisLabels"
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
        :series-colors="seriesColorsResolved as Record<string, string>"
        :echarts-options="props.echartsOptions"
        :series-options="props.seriesOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
