<script setup lang="ts">
/**
 * ReferenceArea component
 * Adds a reference area/region to a chart
 */

import { computed, inject, watch, onMounted, onUnmounted } from 'vue';
import type { ReferenceAreaProps } from '../../types';
import { seriesConfigKey } from '../../symbols/injectionKeys';
import { useThemeStores } from '../../composables/useTheme';

const props = withDefaults(defineProps<ReferenceAreaProps>(), {
  opacity: 0.2,
  border: false,
  borderType: 'solid',
  borderWidth: 1
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
const borderColorResolved = computed(() =>
  props.borderColor ? resolveColor(props.borderColor).value : undefined
);

// Map border type
const borderTypeMap = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
} as const;

// Generate a unique series name
const seriesName = computed(() => `reference_area_${Date.now()}`);

// Build markArea config
const markAreaConfig = computed(() => {
  // Determine if horizontal (y-based) or vertical (x-based)
  const hasYBounds = props.yMin !== undefined || props.yMax !== undefined;
  const hasXBounds = props.xMin !== undefined || props.xMax !== undefined;

  const areaConfig: [Record<string, unknown>, Record<string, unknown>] = [{}, {}];

  // Set up the area bounds
  if (hasYBounds) {
    areaConfig[0].yAxis = props.yMin ?? 'min';
    areaConfig[1].yAxis = props.yMax ?? 'max';
  }

  if (hasXBounds) {
    areaConfig[0].xAxis = props.xMin ?? 'min';
    areaConfig[1].xAxis = props.xMax ?? 'max';
  }

  return {
    silent: true,
    itemStyle: {
      color: (colorResolved.value || 'rgba(100, 100, 100, 0.2)') as string,
      opacity: props.opacity,
      borderColor: (props.border ? (borderColorResolved.value || colorResolved.value) : 'transparent') as string,
      borderWidth: props.border ? props.borderWidth : 0,
      borderType: borderTypeMap[props.borderType || 'solid']
    },
    label: props.label ? {
      show: true,
      position: 'insideTop' as const,
      color: labelColorResolved.value as string | undefined
    } : undefined,
    data: [[
      { ...areaConfig[0], name: props.label || '' },
      areaConfig[1]
    ]] as [Record<string, unknown>, Record<string, unknown>][]
  };
});

// Build series config
const seriesConfig2 = computed(() => ({
  name: seriesName.value,
  type: 'line' as const,
  data: [] as number[],
  markArea: markAreaConfig.value,
  seriesType: 'reference_area'
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
