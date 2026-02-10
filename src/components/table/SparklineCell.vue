<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import * as echarts from 'echarts';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';

const props = withDefaults(defineProps<{
  type: 'line' | 'bar' | 'area';
  data: unknown[];
  dateCol?: string;
  valueCol?: string;
  color?: string;
  yScale?: boolean;
  height?: number;
  width?: number;
  interactive?: boolean;
  valueFmt?: string;
  dateFmt?: string;
}>(), {
  type: 'line',
  height: 19,
  width: 90,
  interactive: false,
});

const svgContent = ref('');
const chartContainer = ref<HTMLDivElement>();
let liveChart: echarts.ECharts | null = null;

const chartValues = computed(() => {
  if (!props.data || props.data.length === 0) return [];

  return props.data.map((item) => {
    if (typeof item === 'number') return item;
    if (typeof item === 'object' && item !== null) {
      const record = item as Record<string, unknown>;
      if (props.valueCol && record[props.valueCol] != null) {
        return Number(record[props.valueCol]);
      }
      // Fall back to first numeric value
      for (const val of Object.values(record)) {
        if (typeof val === 'number') return val;
      }
    }
    return Number(item) || 0;
  });
});

const chartDates = computed(() => {
  if (!props.dateCol || !props.data || props.data.length === 0) return [];
  return props.data.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return (item as Record<string, unknown>)[props.dateCol!];
    }
    return undefined;
  });
});

function buildOption(): echarts.EChartsOption {
  const values = chartValues.value;
  const resolvedColor = props.color || '#6baed6';

  const valFmt = props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined;
  const datFmt = props.dateFmt ? getFormatObjectFromString(props.dateFmt) : undefined;

  return {
    animation: false,
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: {
      type: 'category',
      show: false,
      data: values.map((_, i) => i),
    },
    yAxis: {
      type: 'value',
      show: false,
      min: props.yScale ? undefined : 0,
    },
    tooltip: props.interactive ? {
      trigger: 'axis',
      confine: true,
      formatter: (params: unknown) => {
        const p = Array.isArray(params) ? params[0] : params;
        const param = p as { dataIndex: number; value: number };
        const val = param.value;
        const dateVal = chartDates.value[param.dataIndex];
        const formattedVal = valFmt ? formatValue(val, valFmt) : String(val);
        const formattedDate = dateVal != null
          ? (datFmt ? formatValue(dateVal, datFmt) : String(dateVal))
          : undefined;
        return formattedDate
          ? `${formattedDate}<br/>${formattedVal}`
          : formattedVal;
      },
    } : undefined,
    series: [
      {
        type: props.type === 'bar' ? 'bar' : 'line',
        data: values,
        showSymbol: false,
        lineStyle: props.type !== 'bar' ? { width: 1.5, color: resolvedColor } : undefined,
        itemStyle: { color: resolvedColor },
        areaStyle: props.type === 'area' ? { color: resolvedColor, opacity: 0.3 } : undefined,
        barWidth: props.type === 'bar' ? '60%' : undefined,
      },
    ],
  };
}

function renderStaticSparkline() {
  const values = chartValues.value;
  if (values.length === 0) {
    svgContent.value = '';
    return;
  }

  const container = document.createElement('div');
  container.style.width = `${props.width}px`;
  container.style.height = `${props.height}px`;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  try {
    const chart = echarts.init(container, undefined, {
      renderer: 'svg',
      width: props.width,
      height: props.height,
    });
    chart.setOption(buildOption());

    const svgEl = container.querySelector('svg');
    if (svgEl) {
      svgContent.value = svgEl.outerHTML;
    }

    chart.dispose();
  } catch (e) {
    console.warn('SparklineCell render error:', e);
  } finally {
    document.body.removeChild(container);
  }
}

function renderInteractiveSparkline() {
  if (!chartContainer.value) return;
  const values = chartValues.value;
  if (values.length === 0) return;

  if (liveChart) {
    liveChart.dispose();
  }

  liveChart = echarts.init(chartContainer.value, undefined, {
    renderer: 'svg',
    width: props.width,
    height: props.height,
  });
  liveChart.setOption(buildOption());
}

function render() {
  if (props.interactive) {
    renderInteractiveSparkline();
  } else {
    renderStaticSparkline();
  }
}

onMounted(render);
watch(
  [chartValues, () => props.type, () => props.color, () => props.width, () => props.height, () => props.interactive],
  render
);

onUnmounted(() => {
  if (liveChart) {
    liveChart.dispose();
    liveChart = null;
  }
});
</script>

<template>
  <div
    v-if="interactive"
    ref="chartContainer"
    class="sparkline-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
  <div
    v-else
    class="sparkline-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
    v-html="svgContent"
  />
</template>

<style scoped>
.sparkline-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.sparkline-container :deep(svg) {
  display: block;
}
</style>
