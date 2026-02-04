<script setup lang="ts">
/**
 * ChartProvider component
 * Provides chart context to child components via provide/inject
 */

import { provide, reactive, computed } from 'vue';
import type { EChartsOption } from 'echarts';
import type { ChartContext } from '../../types';
import { chartPropsKey, chartConfigKey, seriesConfigKey } from '../../symbols/injectionKeys';
import { useTheme, provideTheme } from '../../composables/useTheme';

interface Props {
  data?: Record<string, unknown>[];
  x?: string;
  y?: string | string[];
  y2?: string | string[];
  series?: string;
  swapXY?: boolean;
  xType?: 'category' | 'value' | 'time';
  xFormat?: object;
  yFormat?: object;
  y2Format?: object;
  sizeFormat?: object;
  xMismatch?: boolean;
  columnSummary?: Record<string, unknown>;
  xAxisTitle?: string;
  yAxisTitle?: string;
  y2AxisTitle?: string;
  tooltipTitle?: string;
  chartAreaHeight?: number;
  chartType?: string;
  yCount?: number;
  y2Count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  swapXY: false,
  xType: 'category',
  xMismatch: false,
  chartType: 'Chart',
  yCount: 1,
  y2Count: 0
});

// Set up theme
const themeReturn = useTheme();
provideTheme(themeReturn);

// Create reactive chart context
const chartContext = reactive<ChartContext>({
  data: props.data,
  x: props.x,
  y: props.y,
  y2: props.y2,
  series: props.series,
  swapXY: props.swapXY,
  xType: props.xType,
  xFormat: props.xFormat,
  yFormat: props.yFormat,
  y2Format: props.y2Format,
  sizeFormat: props.sizeFormat,
  xMismatch: props.xMismatch,
  columnSummary: props.columnSummary || {},
  xAxisTitle: props.xAxisTitle,
  yAxisTitle: props.yAxisTitle,
  y2AxisTitle: props.y2AxisTitle,
  tooltipTitle: props.tooltipTitle,
  chartAreaHeight: props.chartAreaHeight,
  chartType: props.chartType,
  yCount: props.yCount,
  y2Count: props.y2Count
});

// Create reactive chart config
const chartConfig = reactive<EChartsOption>({
  series: []
});

// Series management
const seriesMap = new Map<string, object>();

const addSeries = (series: EChartsOption['series']) => {
  if (!series) return;
  const seriesArray = Array.isArray(series) ? series : [series];
  for (const s of seriesArray) {
    if (s && typeof s === 'object' && 'name' in s) {
      seriesMap.set(s.name as string, s);
    }
  }
  chartConfig.series = Array.from(seriesMap.values());
};

const removeSeries = (name: string) => {
  seriesMap.delete(name);
  chartConfig.series = Array.from(seriesMap.values());
};

const updateSeries = (name: string, config: Partial<EChartsOption['series']>) => {
  const existing = seriesMap.get(name);
  if (existing) {
    seriesMap.set(name, { ...existing, ...config });
    chartConfig.series = Array.from(seriesMap.values());
  }
};

// Provide context to children
provide(chartPropsKey, computed(() => chartContext));
// @ts-expect-error - Complex type incompatibility with ECharts nested types
provide(chartConfigKey, computed(() => chartConfig));
provide(seriesConfigKey, {
  addSeries,
  removeSeries,
  updateSeries
});

// Expose for parent access (cast to simpler types to avoid declaration emit issues)
defineExpose({
  chartContext,
  chartConfig: chartConfig as Record<string, unknown>,
  addSeries,
  removeSeries,
  updateSeries
});
</script>

<template>
  <slot
    :context="chartContext"
    :config="chartConfig as Record<string, unknown>"
    :theme="themeReturn"
  />
</template>
