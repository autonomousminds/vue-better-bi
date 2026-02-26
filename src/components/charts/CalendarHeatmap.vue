<script setup lang="ts">
/**
 * CalendarHeatmap component
 * Time-series heatmap displayed as a calendar
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { CalendarHeatmapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, formatTitle, getFormatObjectFromString } from '../../utils/formatting';
import { standardizeDateString } from '../../utils/dateParsing';

const props = withDefaults(defineProps<CalendarHeatmapProps>(), {
  height: '200px',
  width: '100%',
  legend: true,
  yearLabel: true,
  monthLabel: true,
  dayLabel: true,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { theme, resolveColorScale } = useThemeStores();

// Resolve color scale
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'green').value
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Process calendar data
const calendarData = computed(() => {
  if (!props.data?.length || !props.date || !props.value) {
    return { data: [], years: [] as number[], min: 0, max: 0 };
  }

  // Parse dates and values, group by year
  const data: [string, number][] = [];
  const yearSet = new Set<number>();
  let min = Infinity;
  let max = -Infinity;

  for (const row of props.data) {
    const dateStr = standardizeDateString(row[props.date]);
    const date = new Date(dateStr);
    const value = row[props.value] as number;

    if (!isNaN(date.getTime()) && value != null) {
      const formattedDate = date.toISOString().split('T')[0];
      data.push([formattedDate, value]);
      yearSet.add(date.getUTCFullYear());

      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  }

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with props if provided
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  const years = [...yearSet].sort();

  return { data, years, min, max };
});

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { data, years, min, max } = calendarData.value;
  const themeColors = theme.value.colors;

  const yearCount = years.length || 1;
  const CELL_SIZE = 13;
  const ROW_HEIGHT = 135;

  // Create calendar and series for each year
  const calendars: object[] = [];
  const series: object[] = [];

  for (let i = 0; i < yearCount; i++) {
    const year = years[i] ?? new Date().getFullYear();
    const top = 25 + i * ROW_HEIGHT;

    calendars.push({
      top,
      left: props.yearLabel ? 40 : 20,
      right: 5,
      cellSize: ['auto', CELL_SIZE],
      range: year,
      itemStyle: {
        color: themeColors['base-100'],
        borderWidth: 0.5,
        borderColor: themeColors['base-300']
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: themeColors['base-content']
        }
      },
      yearLabel: {
        show: props.yearLabel,
        color: themeColors['base-300'],
        fontSize: 16,
        fontWeight: 600,
        margin: 25
      },
      monthLabel: {
        show: props.monthLabel,
        color: themeColors['base-content-muted']
      },
      dayLabel: {
        firstDay: 0,
        show: props.dayLabel,
        color: themeColors['base-content-muted']
      }
    });

    series.push({
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: i,
      data: data.filter((d) => d[0].startsWith(`${year}`)),
      emphasis: {
        itemStyle: {
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    });
  }

  // Mobile calendar config for responsive layout
  const mobileCalendarConfig = {
    left: props.yearLabel ? 40 : 20,
    right: 5,
    cellSize: ['auto', 12],
    itemStyle: {
      borderWidth: 0.5,
      borderColor: themeColors['base-300']
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: themeColors['base-content-muted']
      }
    },
    monthLabel: {
      show: props.monthLabel,
      color: themeColors['base-content-muted'],
      fontSize: 10,
      formatter: (param: { nameMap: string }) => param.nameMap.substring(0, 1)
    },
    dayLabel: {
      show: props.dayLabel,
      color: themeColors['base-content-muted'],
      fontSize: 10,
      margin: 7
    },
    yearLabel: {
      show: props.yearLabel,
      color: themeColors['base-300'],
      fontWeight: 600,
      margin: 25,
      fontSize: 14
    }
  };

  // Build mobile calendar array (one entry per year)
  const mobileCalendars = calendars.map(() => ({ ...mobileCalendarConfig }));

  return {
    animation: false,
    tooltip: {
      trigger: 'item' as const,
      showDelay: 0,
      transitionDuration: 0.2,
      confine: true,
      formatter: (params: unknown) => {
        const p = params as { value: [string, number] };
        const [date, val] = p.value;
        const formattedVal = formatValue(
          Number.isNaN(val) ? 0 : val,
          valueFormat.value
        );
        const columnLabel = formatTitle(props.value, valueFormat.value);
        return `<span style='font-weight: 600;'>${date}</span><br/>`
          + `<span>${columnLabel}: </span>`
          + `<span style='float:right; margin-left: 10px;'>${formattedVal}</span>`;
      },
      padding: 6,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: themeColors['base-300'],
      backgroundColor: themeColors['base-100'],
      extraCssText:
        'box-shadow: 0 3px 6px rgba(0,0,0,.15); box-shadow: 0 2px 4px rgba(0,0,0,.12); z-index: 1;',
      textStyle: {
        color: themeColors['base-content'],
        fontSize: 12,
        fontWeight: 400
      },
      order: 'valueDesc'
    },
    visualMap: {
      show: props.legend,
      itemWidth: 10,
      min,
      max,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      handleStyle: {
        borderColor: themeColors['base-100']
      },
      textStyle: {
        color: themeColors['base-content-muted']
      },
      inRange: {
        color: colorScaleResolved.value || ['#ebedf0', '#216e39']
      },
      text: [
        formatValue(max, valueFormat.value),
        formatValue(min, valueFormat.value)
      ],
      formatter: ((val: number) => formatValue(val, valueFormat.value)) as unknown as string
    },
    calendar: calendars,
    series,
    media: [
      {
        query: { maxWidth: 400 },
        option: {
          calendar: mobileCalendars
        }
      }
    ]
  };
});

// Dynamic height based on data
const dynamicHeight = computed(() => {
  if (props.height !== '200px') return props.height;

  const yearCount = calendarData.value.years.length || 1;
  const ROW_HEIGHT = 135;
  const BASE_HEIGHT = 60;
  const LEGEND_HEIGHT = props.legend ? 35 : 0;
  return `${BASE_HEIGHT + LEGEND_HEIGHT + yearCount * ROW_HEIGHT}px`;
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
