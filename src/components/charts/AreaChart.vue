<script setup lang="ts">
/**
 * AreaChart component
 * Supports stacked and stacked100 layouts
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { AreaChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { getStackPercentages } from '../../utils/getStackPercentages';
import { getCompletedData, replaceNulls } from '../../utils/getCompletedData';
import { interpolateSeriesData } from '../../utils/splineInterpolation';

const props = withDefaults(defineProps<AreaChartProps>(), {
  type: 'stacked',
  fillOpacity: 0.85,
  lineType: 'solid',
  lineWidth: 0,
  smooth: true,
  markers: false,
  markerShape: 'circle',
  markerSize: 8,
  handleMissing: 'gap',
  step: false,
  stepPosition: 'middle',
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

const { resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();

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
  swapXY: () => false,
  chartType: 'area'
});

// Resolve colors
const fillColorResolved = computed(() =>
  props.fillColor ? resolveColor(props.fillColor).value : undefined
);
const lineColorResolved = computed(() =>
  props.lineColor ? resolveColor(props.lineColor).value : undefined
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
  chartType: 'Area Chart',
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

const isStacked = computed(() =>
  props.type === 'stacked' || props.type === 'stacked100'
);

/**
 * Processed data pipeline (mirrors BarChart):
 * 1. Data completion — fill missing x/series combinations with zeros (stacked charts)
 * 2. Null replacement — replace null y values with 0 (stacked charts)
 * 3. Stacked100 transformation — convert raw values to percentages
 */
const processedData = computed(() => {
  let data = [...rawProcessedData.value];
  if (data.length === 0 || !props.x || !props.y) return data;

  const x = props.x;
  const yCols = yColumns.value;

  // --- 1. Data completion for stacked charts ---
  if (isStacked.value && props.series) {
    data = getCompletedData(data, x, props.y, props.series, { nullsZero: true });
  }

  // --- 2. Replace null y values with 0 for stacked charts ---
  if (isStacked.value) {
    data = replaceNulls(data, yCols);
  }

  // --- 3. Stacked100 transformation ---
  if (props.type === 'stacked100') {
    const result = getStackPercentages(data, x, yCols);
    data = result.data.map(row => {
      const newRow = { ...row };
      for (let i = 0; i < yCols.length; i++) {
        newRow[yCols[i]] = row[result.yColumns[i]];
      }
      return newRow;
    });
  }

  return data;
});

// Map line type to ECharts format
const lineTypeMap = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
} as const;

// Map step position
const stepMap = {
  start: 'start',
  middle: 'middle',
  end: 'end'
} as const;

// For stacked + smooth charts we pre-interpolate the data with a monotone cubic
// spline so that all series share identical x-positions.  This lets us set
// `smooth: false` in ECharts (straight lines between the dense points) which
// guarantees adjacent stack boundaries align perfectly — no white gaps.
const usePreInterpolation = computed(() =>
  isStacked.value && props.smooth && !props.step
);

// Build area series configuration
const areaSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  const hideLines = props.lineWidth === 0;
  // When pre-interpolating we disable ECharts' own smooth to avoid double-smoothing
  const smoothValue = usePreInterpolation.value
    ? false
    : (props.smooth === true ? 0.4 : props.smooth);
  return {
    type: 'line',
    stack: 'total',
    smooth: smoothValue,
    step: props.step ? stepMap[props.stepPosition || 'middle'] : false,
    connectNulls: props.handleMissing === 'connect',
    areaStyle: {
      ...(fillColorResolved.value ? { color: fillColorResolved.value } : {}),
      opacity: props.fillOpacity
    },
    lineStyle: {
      ...(lineColorResolved.value ? { color: lineColorResolved.value } : {}),
      width: props.lineWidth,
      type: lineTypeMap[props.lineType || 'solid'],
      ...(hideLines ? { opacity: 0 } : {})
    },
    itemStyle: {
      ...(lineColorResolved.value || fillColorResolved.value
        ? { color: lineColorResolved.value || fillColorResolved.value }
        : {})
    },
    symbol: props.markers ? props.markerShape : 'none',
    symbolSize: props.markers ? props.markerSize : 0,
    label: props.labels ? {
      show: true,
      position: props.labelPosition === 'outside' ? 'top' : (props.labelPosition || 'top'),
      fontSize: props.labelSize || 11,
      color: labelColorResolved.value,
      formatter: (params: { value: unknown[]; seriesIndex: number }) => {
        const value = params.value[1];
        if (value === 0 || value == null) return '';
        const isY2 = seriesData.value[params.seriesIndex]?.yAxisIndex === 1;
        const labelFmt = isY2
          ? props.y2LabelFmt
          : (props.yLabelFmt || props.labelFmt);
        const format = labelFmt
          ? getFormatObjectFromString(labelFmt)
          : (isY2 ? formats.value.y2 : formats.value.y);
        return formatValue(value, format, isY2 ? unitSummaries.value.y2 : unitSummaries.value.y);
      }
    } : undefined,
    emphasis: {
      focus: 'series'
    }
  };
});


// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  let data = processedData.value;

  // Handle missing values
  if (props.handleMissing === 'zero') {
    const yColumns = Array.isArray(props.y) ? props.y : [props.y];
    data = data.map((row) => {
      const newRow = { ...row };
      for (const col of yColumns) {
        if (newRow[col] == null) {
          newRow[col] = 0;
        }
      }
      return newRow;
    });
  }

  const allSeries = getSeriesConfig(
    data,
    props.x,
    props.y,
    props.series,
    false,
    areaSeriesConfig.value,
    columnSummary.value,
    {
      y2: props.y2,
      seriesOrder: props.seriesOrder,
      seriesLabelFmt: props.seriesLabelFmt,
      fillMissingData: !!props.series && (props.type === 'stacked' || props.type === 'stacked100'),
      stackSortByValue: isStacked.value && !!props.series
    }
  );

  // Pre-interpolate stacked series so all share identical x-positions (no gaps)
  if (usePreInterpolation.value) {
    for (let i = 0; i < allSeries.length; i++) {
      const s = allSeries[i];
      if (s.stack && s.data) {
        allSeries[i] = { ...s, data: interpolateSeriesData(s.data as unknown[][], 8) };
      }
    }
  }

  // Apply y2SeriesType: change y2 series to the specified type (default: 'line')
  if (props.y2) {
    const y2Type = props.y2SeriesType || 'line';
    for (let i = 0; i < allSeries.length; i++) {
      if (allSeries[i].yAxisIndex === 1) {
        allSeries[i].type = y2Type;
        allSeries[i].stack = undefined;
        allSeries[i].areaStyle = undefined;
        if (y2Type === 'line') {
          allSeries[i].symbol = 'circle';
          allSeries[i].symbolSize = 6;
        }
      }
    }
  }

  return allSeries;
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

  // Handle stacked100 y-axis formatting
  if (props.type === 'stacked100') {
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
    :height="props.height"
    :width="props.width"
    :renderer="props.renderer"
    :connect-group="props.connectGroup"
    :series-colors="seriesColorsResolved as Record<string, string>"
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
    :show-all-x-axis-labels="props.showAllXAxisLabels"
    :background-color="props.backgroundColor"
    :table="props.table"
    :tableProps="props.tableProps"
    :tableColumns="props.tableColumns"
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
