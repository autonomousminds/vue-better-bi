<script setup lang="ts">
/**
 * ReferenceLine component
 * Adds a reference line to a chart
 */

import { computed, inject, watch, onMounted, onUnmounted } from 'vue';
import type { ReferenceLineProps } from '../../types';
import { seriesConfigKey } from '../../symbols/injectionKeys';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<ReferenceLineProps>(), {
  labelPosition: 'end',
  lineType: 'dashed',
  lineWidth: 1,
  hideValue: false,
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

// Map line type
const lineTypeMap = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
} as const;

// Generate a unique series name
const seriesName = computed(() => `reference_line_${props.y ?? props.x}_${Date.now()}`);

// Build markLine config
const markLineConfig = computed(() => {
  const isHorizontal = props.y !== undefined;

  const lineConfig: Record<string, unknown> = {
    symbol: 'none',
    lineStyle: {
      color: colorResolved.value || '#666',
      width: props.lineWidth,
      type: lineTypeMap[props.lineType || 'dashed']
    },
    label: {
      show: true,
      position: props.labelPosition,
      formatter: () => {
        let labelText = '';
        if (props.label) {
          labelText = props.label;
          if (!props.hideValue) {
            const value = isHorizontal ? props.y : props.x;
            labelText += `: ${formatValue(value)}`;
          }
        } else if (!props.hideValue) {
          labelText = formatValue(isHorizontal ? props.y : props.x);
        }
        return labelText;
      },
      color: labelColorResolved.value,
      backgroundColor: labelBgResolved.value,
      padding: props.labelPadding,
      fontSize: props.fontSize
    }
  };

  if (isHorizontal) {
    lineConfig.yAxis = props.y;
  } else {
    lineConfig.xAxis = props.x;
  }

  return {
    silent: true,
    data: [lineConfig]
  };
});

// Build series config
const seriesConfig2 = computed(() => ({
  name: seriesName.value,
  type: 'line' as const,
  data: [] as number[],
  markLine: markLineConfig.value,
  seriesType: 'reference_line'
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
