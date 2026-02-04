<script setup lang="ts">
/**
 * ReferencePoint component
 * Adds a reference point/marker to a chart
 */

import { computed, inject, watch, onMounted, onUnmounted } from 'vue';
import type { ReferencePointProps } from '../../types';
import { seriesConfigKey } from '../../symbols/injectionKeys';
import { useThemeStores } from '../../composables/useTheme';
// formatValue is used indirectly through formatter

const props = withDefaults(defineProps<ReferencePointProps>(), {
  labelPosition: 'top',
  symbol: 'pin',
  symbolSize: 30,
  labelPadding: 4,
  fontSize: 12
});

const seriesConfig = inject(seriesConfigKey, undefined);
const { resolveColor } = useThemeStores();

// Resolve colors
const colorResolved = computed(() =>
  props.color ? resolveColor(props.color).value : undefined
);
const labelColorResolved = computed(() =>
  props.labelColor ? resolveColor(props.labelColor).value : undefined
);
const labelBgResolved = computed(() =>
  props.labelBackgroundColor ? resolveColor(props.labelBackgroundColor).value : undefined
);

// Generate a unique series name
const seriesName = computed(() => `reference_point_${props.x}_${props.y}_${Date.now()}`);

// Map label position
const labelPositionMap = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
} as const;

// Build markPoint config
const markPointConfig = computed(() => {
  return {
    silent: false,
    symbol: props.symbol,
    symbolSize: props.symbolSize,
    itemStyle: {
      color: (colorResolved.value || '#666') as string
    },
    label: {
      show: !!props.label,
      position: labelPositionMap[props.labelPosition || 'top'],
      formatter: () => props.label || '',
      color: labelColorResolved.value as string | undefined,
      backgroundColor: labelBgResolved.value as string | undefined,
      padding: props.labelPadding,
      fontSize: props.fontSize
    },
    data: [
      {
        name: props.label || '',
        coord: [props.x, props.y] as [string | number, number],
        value: props.y
      }
    ]
  };
});

// Build series config
const seriesConfig2 = computed(() => ({
  name: seriesName.value,
  type: 'line' as const,
  data: [] as number[],
  markPoint: markPointConfig.value,
  seriesType: 'reference_point'
}));

// Register series on mount
onMounted(() => {
  if (seriesConfig) {
    seriesConfig.addSeries(seriesConfig2.value);
  }
});

// Update series when props change
watch(seriesConfig2, (newConfig) => {
  if (seriesConfig) {
    seriesConfig.updateSeries(seriesName.value, newConfig);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (seriesConfig) {
    seriesConfig.removeSeries(seriesName.value);
  }
});
</script>

<template>
  <slot />
</template>
