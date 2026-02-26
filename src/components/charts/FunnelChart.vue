<script setup lang="ts">
/**
 * FunnelChart component
 *
 * Matches Evidence's FunnelChart behavior:
 * - Percentage base = first row value (top of funnel), not max
 * - Exposes funnelSort, funnelAlign, labelPosition props
 * - Uses props.outlineColor instead of hardcoded '#fff'
 * - Shows formatted value (+ optional percent) in labels
 * - Series name auto-generated from column name
 * - minSize: '30%' to prevent tiny bottom segments
 * - labelLayout: { hideOverlap: true }
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { FunnelChartProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, formatTitle, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<FunnelChartProps>(), {
  height: '400px',
  width: '100%',
  legend: true,
  showPercent: true,
  funnelSort: 'descending',
  funnelAlign: 'center',
  labelPosition: 'inside',
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColor, resolveColorPalette } = useThemeStores();

// Resolve colors
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

const outlineColorResolved = computed(() =>
  props.outlineColor ? resolveColor(props.outlineColor).value : undefined
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);
const percentFormat = computed(() =>
  props.percentFmt ? getFormatObjectFromString(props.percentFmt) : { formatTag: 'pct1', formatCode: '#,##0.0%', valueType: 'number' as const }
);

// Determine column names
const nameCol = computed(() => {
  if (!props.data?.length) return '';
  return props.name || Object.keys(props.data[0])[0];
});

const valueCol = computed(() => {
  if (!props.data?.length) return '';
  return props.value || Object.keys(props.data[0])[1];
});

// Process funnel data
const funnelData = computed(() => {
  if (!props.data?.length) return [];

  return props.data.map((row) => ({
    name: String(row[nameCol.value]),
    value: row[valueCol.value] as number
  }));
});

// Calculate max value for ECharts series max
const maxValue = computed(() => {
  if (!funnelData.value.length) return 0;
  return Math.max(...funnelData.value.map((d) => d.value));
});

// Base value for percentage calculation: first row = top of funnel
// This matches Evidence's pattern: "what fraction of the initial audience remains"
const baseValue = computed(() => {
  if (!funnelData.value.length) return 1;
  return funnelData.value[0]?.value ?? 1;
});

// Map user-facing labelPosition to ECharts-compatible position
// ECharts funnel uses 'inner'/'outer' instead of 'inside'/'outside'
const echartsLabelPosition = computed(() => {
  const pos = props.labelPosition;
  if (pos === 'outside') return 'outer' as const;
  if (pos === 'inside') return 'inner' as const;
  return pos as 'left' | 'right';
});

// Auto-generate series name from the value column name
const seriesName = computed(() => {
  const col = valueCol.value;
  if (!col) return 'Funnel';
  return formatTitle(col);
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  // Calculate chart area
  const hasLegend = props.legend;
  const legendHeight = hasLegend ? 25 : 0;
  const legendTop = 7;
  const chartTop = legendTop + legendHeight + 10;

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number };
        let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
        output += `<span>${seriesName.value}:</span><span style='float:right; margin-left: 10px;'>${formatValue(p.value, valueFormat.value)}</span>`;
        if (props.showPercent && baseValue.value > 0) {
          const percent = p.value / baseValue.value;
          output += `<br/>Percent: <span style='float:right; margin-left: 10px;'>${formatValue(percent, percentFormat.value)}</span>`;
        }
        return output;
      }
    },
    legend: {
      show: props.legend,
      type: 'scroll',
      top: legendTop,
      data: funnelData.value.map((d) => d.name)
    },
    series: [
      {
        name: seriesName.value,
        type: 'funnel',
        left: props.funnelAlign === 'center' ? '10%' : '',
        top: chartTop,
        bottom: 20,
        width: '80%',
        min: 0,
        max: maxValue.value || 100,
        minSize: '30%',
        maxSize: '90%',
        sort: props.funnelSort,
        funnelAlign: props.funnelAlign,
        gap: 2,
        label: {
          show: true,
          position: echartsLabelPosition.value,
          formatter: (params: unknown) => {
            const p = params as { name: string; value: number };
            const formattedValue = formatValue(p.value, valueFormat.value);
            if (props.showPercent && baseValue.value > 0) {
              const percentOfInitial = ((p.value / baseValue.value) * 100).toFixed(1);
              return `${formattedValue}\n${percentOfInitial}%`;
            }
            return String(formattedValue);
          }
        },
        labelLayout: { hideOverlap: true },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: outlineColorResolved.value as string | undefined,
          borderWidth: props.outlineWidth ?? 1
        },
        emphasis: {
          label: {
            fontSize: 14
          }
        },
        data: funnelData.value
      }
    ],
    color: colorPaletteResolved.value
  };
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
    :echarts-options="props.echartsOptions"
    :background-color="props.backgroundColor"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="props.data"
        :chart-title="props.title"
        :echarts-options="props.echartsOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>
