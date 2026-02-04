<script setup lang="ts">
/**
 * ScatterPlot component
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { ScatterPlotProps, SeriesConfig } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useChartConfig, getSeriesConfig } from '../../composables/useChartConfig';
import { useThemeStores } from '../../composables/useTheme';
import { useTooltip } from '../../composables/useTooltip';
// formatValue and formatTitle imported via useTooltip

const props = withDefaults(defineProps<ScatterPlotProps>(), {
  pointOpacity: 0.7,
  pointSize: 10,
  pointShape: 'circle',
  outlineWidth: 1,
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

const { activeAppearance, resolveColor, resolveColorPalette, resolveColorsObject } = useThemeStores();
const { scatterFormatter } = useTooltip();

// Process chart configuration
const {
  processedData,
  columnSummary,
  xAxisType: _xAxisType,
  baseConfig,
  formats,
  unitSummaries: _unitSummaries
} = useChartConfig({
  ...props,
  chartType: 'Scatter Plot',
  xType: props.xType || 'value' // Default to value axis for scatter
});

// Resolve colors
const pointColorResolved = computed(() =>
  props.pointColor ? resolveColor(props.pointColor).value : undefined
);
const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);
const seriesColorsResolved = computed(() =>
  props.seriesColors ? resolveColorsObject(props.seriesColors).value : undefined
);

// Build scatter series configuration
const scatterSeriesConfig = computed<Partial<SeriesConfig>>(() => {
  return {
    type: 'scatter',
    symbol: props.pointShape,
    symbolSize: props.pointSize,
    itemStyle: {
      color: pointColorResolved.value,
      opacity: props.pointOpacity,
      borderColor: outlineColorResolved.value,
      borderWidth: props.outlineWidth
    },
    emphasis: {
      focus: 'series',
      itemStyle: {
        borderWidth: (props.outlineWidth || 1) + 1
      }
    }
  };
});

// Generate series
const seriesData = computed(() => {
  if (!props.x || !props.y) return [];

  return getSeriesConfig(
    processedData.value,
    props.x,
    props.y,
    props.series,
    false,
    scatterSeriesConfig.value,
    columnSummary.value,
    {
      tooltipTitle: props.tooltipTitle
    }
  );
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

  // Custom tooltip for scatter
  config.tooltip = {
    ...config.tooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      return scatterFormatter(params as Parameters<typeof scatterFormatter>[0], {
        xColumn: props.x,
        yColumn: props.y,
        xFormat: formats.value.x,
        yFormat: formats.value.y,
        tooltipTitle: props.tooltipTitle
      });
    }
  };

  // Ensure x-axis is value type for scatter
  if (!props.xType) {
    (config.xAxis as Record<string, unknown>).type = 'value';
  }

  return config;
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :height="props.height"
    :width="props.width"
    :theme="activeAppearance"
    :renderer="props.renderer"
    :connect-group="props.connectGroup"
    :series-colors="seriesColorsResolved as Record<string, string>"
    :echarts-options="props.echartsOptions"
    :series-options="props.seriesOptions"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="processedData"
        :chart-title="props.title"
        :theme="activeAppearance"
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
