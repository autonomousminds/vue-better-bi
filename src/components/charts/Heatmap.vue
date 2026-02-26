<script setup lang="ts">
/**
 * Heatmap component
 *
 * Displays a matrix of colored cells where color intensity represents
 * the value at each x/y intersection.
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { HeatmapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString, formatTitle } from '../../utils/formatting';
import { getDistinctValues } from '../../composables/useChartConfig';
import { getCompletedData } from '../../utils/getCompletedData';

const props = withDefaults(defineProps<HeatmapProps>(), {
  width: '100%',
  legend: true,
  nullsZero: true,
  valueLabels: true,
  mobileValueLabels: false,
  zeroDisplay: '\u2014',
  downloadableData: true,
  downloadableImage: true,
  cellHeight: 30,
  borders: true,
  xAxisPosition: 'top',
  filter: false,
  xSortOrder: 'asc',
  ySortOrder: 'asc'
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorScale } = useThemeStores();

// Resolve color scale
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'default').value
);

// Get format objects
const xFormat = computed(() =>
  props.xFmt ? getFormatObjectFromString(props.xFmt) : undefined
);
const yFormat = computed(() =>
  props.yFmt ? getFormatObjectFromString(props.yFmt) : undefined
);
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

/**
 * Gets sorted distinct values from a column, optionally sorting by a different column.
 * Matches Evidence's getSortedDistinctValues utility.
 */
function getSortedDistinctValues(
  data: Record<string, unknown>[],
  categoryCol: string,
  sortByCol: string,
  sortOrder: 'asc' | 'desc' = 'asc'
): string[] {
  const sortedData = [...data];

  if (categoryCol !== sortByCol && sortByCol) {
    // Sort the full dataset by the sortBy column first
    sortedData.sort((a, b) => {
      const valueA = a[sortByCol];
      const valueB = b[sortByCol];
      if (valueA == null) return 1;
      if (valueB == null) return -1;
      const cmp = (valueA as number | string) < (valueB as number | string) ? -1 : (valueA as number | string) > (valueB as number | string) ? 1 : 0;
      return cmp * (sortOrder === 'asc' ? 1 : -1);
    });
  }

  // Extract distinct values (preserving order from the sorted dataset)
  const distinctValues = [
    ...new Set(
      sortedData
        .map((item) => item[categoryCol])
        .filter((v) => v !== undefined)
    )
  ].map(String);

  // If sorting by the same column, sort the distinct values directly
  if (categoryCol === sortByCol) {
    distinctValues.sort((a, b) => {
      const cmp = a < b ? -1 : a > b ? 1 : 0;
      return cmp * (sortOrder === 'asc' ? 1 : -1);
    });
  }

  return distinctValues;
}

// Process heatmap data
const heatmapData = computed(() => {
  if (!props.data?.length || !props.x || !props.y || !props.value) {
    return { xCategories: [] as string[], yCategories: [] as string[], data: [] as [string, string, number | null][], min: 0, max: 0 };
  }

  // Complete data so every x/y combination has an entry
  // Evidence calls: getCompletedData(data, x, value, y, nullsZero)
  // where y is used as the "series" column and value as the "y" column
  const completedData = getCompletedData(
    props.data as Record<string, any>[],
    props.x,
    props.value,
    props.y,
    { nullsZero: props.nullsZero }
  );

  // Get sorted categories
  const xCategories = props.xSort
    ? getSortedDistinctValues(completedData, props.x, props.xSort, props.xSortOrder ?? 'asc')
    : getDistinctValues(completedData, props.x).map(String);

  const yCategories = props.ySort
    ? getSortedDistinctValues(completedData, props.y, props.ySort, props.ySortOrder ?? 'asc')
    : getDistinctValues(completedData, props.y).map(String);

  // Build data array using string-based format: [xString, yString, value]
  // This avoids O(n*m) indexOf lookups and matches Evidence's approach
  const data: [string, string, number | null][] = [];
  let min = Infinity;
  let max = -Infinity;

  for (const row of completedData) {
    const xVal = String(row[props.x]);
    const yVal = String(row[props.y]);
    const rawValue = row[props.value] as number | null | undefined;
    const numValue = props.nullsZero && rawValue == null ? 0 : (rawValue ?? null);

    data.push([xVal, yVal, numValue]);

    if (numValue != null) {
      min = Math.min(min, numValue);
      max = Math.max(max, numValue);
    }
  }

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with user-supplied min/max
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  return { xCategories, yCategories, data, min, max };
});

// Compute dynamic height based on row count and cellHeight
const dynamicHeight = computed(() => {
  if (props.height) return props.height;

  const { yCategories } = heatmapData.value;
  const gridHeight = props.chartAreaHeight ?? Math.max(100, yCategories.length * (props.cellHeight ?? 30));
  const hasTitle = props.title !== undefined;
  const hasSubtitle = props.subtitle !== undefined;
  const legendSpace = props.legend ? 35 : 0;
  const titleSpace = hasTitle ? 18 : 0;
  const subtitleSpace = hasSubtitle ? 18 : 0;
  const totalHeight = 20 + legendSpace + titleSpace + subtitleSpace + gridHeight;
  return `${totalHeight}px`;
});

// Compute grid height for the ECharts grid config
const gridHeight = computed(() => {
  const { yCategories } = heatmapData.value;
  return props.chartAreaHeight ?? Math.max(100, yCategories.length * (props.cellHeight ?? 30));
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { xCategories, yCategories, data, min, max } = heatmapData.value;
  const valFmt = valueFormat.value;
  const valColumn = props.value;
  const zeroDisp = props.zeroDisplay;
  const isFilter = props.filter;

  return {
    animation: false,
    tooltip: {
      trigger: 'item' as const,
      showDelay: 0,
      confine: true,
      formatter: (params: unknown) => {
        const p = params as { value: [string, string, number | null]; name: string };
        const [xVal, yVal, value] = p.value;

        const formattedX = formatValue(xVal, xFormat.value);
        const formattedY = formatValue(yVal, yFormat.value);
        const columnTitle = formatTitle(valColumn, valFmt);

        let valueStr: string;
        if (value === 0) {
          valueStr = zeroDisp;
        } else if (value != null) {
          valueStr = formatValue(Number.isNaN(value) ? 0 : value, valFmt);
        } else {
          valueStr = '-';
        }

        let output = `<span style='font-weight: 600;'>${formattedY}</span><br/>`;
        output += `<span style='font-weight: 600;'>${formattedX}</span><br/>`;
        output += `<span>${columnTitle}: </span>`;
        output += `<span style='float:right; margin-left: 10px;'>${valueStr}</span>`;
        return output;
      }
    },
    grid: {
      height: gridHeight.value,
      top: (props.title ? 20 : 0) + (props.subtitle ? 20 : 0) + 8,
      left: 0,
      right: 2,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xCategories,
      position: props.xAxisPosition ?? 'top',
      splitArea: { show: true },
      axisTick: {
        show: false,
        alignWithLabel: false
      },
      axisLabel: {
        interval: 0,
        hideOverlap: true
      }
    },
    yAxis: {
      type: 'category',
      data: yCategories,
      inverse: true,
      splitArea: { show: true },
      axisTick: {
        show: false,
        alignWithLabel: false
      }
    },
    visualMap: {
      itemWidth: 10,
      show: props.legend,
      min,
      max,
      calculable: isFilter,
      orient: 'horizontal' as const,
      left: 'center',
      bottom: '0%',
      inRange: {
        color: colorScaleResolved.value || ['#f0f9e8', '#0868ac']
      },
      text: isFilter
        ? undefined
        : [
            formatValue(max, valFmt),
            formatValue(min, valFmt)
          ],
      formatter: ((value: unknown) => {
        return formatValue(value as number, valFmt);
      }) as unknown as string
    },
    series: [
      {
        type: 'heatmap',
        data: data,
        label: {
          show: props.valueLabels,
          formatter: (params: unknown) => {
            const p = params as { value: [string, string, number | null] };
            const val = p.value[2];
            if (val === 0) return zeroDisp;
            return val != null ? formatValue(val, valFmt) : '';
          }
        },
        labelLayout: {
          hideOverlap: true
        },
        itemStyle: {
          borderColor: '#e0e0e0',
          borderWidth: props.borders ? 0.5 : 0
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    media: [
      {
        query: { maxWidth: 400 },
        option: {
          series: [{ label: { show: props.mobileValueLabels } }]
        }
      },
      {
        query: { minWidth: 400 },
        option: {
          series: [{ label: { show: props.valueLabels } }]
        }
      }
    ]
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
    :height="dynamicHeight"
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
