<script setup lang="ts">
/**
 * LineChart component
 * Supports markers, step interpolation, and missing value handling
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { LineChartProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useInteractiveFeatures } from '../../composables/useInteractiveFeatures';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { getCompletedData } from '../../utils/getCompletedData';

const props = withDefaults(defineProps<LineChartProps>(), {
  lineType: 'solid',
  lineOpacity: 1,
  lineWidth: 2,
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
  downloadableImage: true,
  legendPosition: 'top',
  showAllLabels: false
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
  swapXY: () => props.swapXY ?? false,
  chartType: 'line'
});

// Resolve colors
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
// Note: We pass props directly (not spread) to maintain Vue reactivity
const {
  processedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries
} = useChartConfig(props, {
  chartType: 'Line Chart',
  resolvedColorPalette: () => colorPaletteResolved.value,
  resolvedYAxisColor: () => yAxisColorResolved.value,
  resolvedY2AxisColor: () => y2AxisColorResolved.value
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

// Build line series configuration
const lineSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  return {
    type: 'line',
    smooth: false,
    step: props.step ? stepMap[props.stepPosition || 'middle'] : false,
    connectNulls: props.handleMissing === 'connect',
    lineStyle: {
      color: lineColorResolved.value,
      width: props.lineWidth,
      opacity: props.lineOpacity,
      type: lineTypeMap[props.lineType || 'solid']
    },
    itemStyle: {
      color: lineColorResolved.value,
      opacity: props.lineOpacity
    },
    // Symbol anchor: showSymbol must be true for labels to have anchor points.
    // When labels=true but markers=false, use symbolSize:0 for invisible anchors.
    showSymbol: props.labels || props.markers,
    symbol: props.markers ? props.markerShape : 'circle',
    symbolSize: props.markers ? props.markerSize : (props.labels ? 0 : undefined),
    label: props.labels ? {
      show: true,
      position: props.labelPosition || ((props.swapXY ?? false) ? 'right' : 'top'),
      fontSize: props.labelSize || 11,
      color: labelColorResolved.value,
      padding: 3,
      formatter: (params: { value: unknown[]; seriesIndex: number }) => {
        const value = (props.swapXY ?? false) ? params.value[0] : params.value[1];
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
    labelLayout: {
      hideOverlap: props.showAllLabels ? false : true
    },
    emphasis: {
      focus: 'series',
      endLabel: { show: false },
      lineStyle: {
        opacity: 1,
        width: (props.lineWidth || 2) + 1
      }
    }
  };
});

// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  let data = processedData.value;

  // Data completion for multi-series charts:
  // When using a series column or multiple y columns, ensure every series
  // has a value for every x value to prevent visual artifacts.
  const isMultiSeries = props.series || (Array.isArray(props.y) && props.y.length > 1);
  if (isMultiSeries) {
    try {
      data = getCompletedData(data, props.x, props.y, props.series);
    } catch (e) {
      console.warn('LineChart: Failed to complete data', e);
    }
  }

  // Handle missing values: replace nulls with zero
  if (props.handleMissing === 'zero') {
    try {
      data = getCompletedData(data, props.x, props.y, props.series, { nullsZero: true });
    } catch (e) {
      console.warn('LineChart: Failed to complete data with zeros', e);
    }
  }

  const allSeries = getSeriesConfig(
    data,
    props.x,
    props.y,
    props.series,
    props.swapXY ?? false,
    lineSeriesConfig.value,
    columnSummary.value,
    {
      y2: props.y2,
      seriesOrder: props.seriesOrder,
      seriesLabelFmt: props.seriesLabelFmt
    }
  );

  // Apply y2SeriesType if specified (e.g., 'bar' for line chart with bar y2)
  if (props.y2 && props.y2SeriesType) {
    for (let i = 0; i < allSeries.length; i++) {
      if (allSeries[i].yAxisIndex === 1) {
        allSeries[i].type = props.y2SeriesType;
        if (props.y2SeriesType === 'bar') {
          allSeries[i].barMaxWidth = 60;
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

  // xAxis boundaryGap: prevent first/last points from sitting on the axis edge.
  // Evidence sets ['2%', '2%'] for time axes and ['0%', '2%'] for others.
  const xAxisConfig = config.xAxis as Record<string, unknown> | undefined;
  if (xAxisConfig) {
    xAxisConfig.boundaryGap = [_xAxisType.value === 'time' ? '2%' : '0%', '2%'];
  }

  // When labels are enabled, disable axisPointer emphasis to prevent
  // labels from flashing/flickering on hover (matching Evidence behavior).
  if (props.labels) {
    config.axisPointer = { triggerEmphasis: false };
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
