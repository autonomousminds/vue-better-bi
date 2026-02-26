<script setup lang="ts">
/**
 * ReferenceArea component
 * Adds one or more reference areas/regions to a chart.
 *
 * Supports:
 * - Static single area (xMin/xMax/yMin/yMax props)
 * - Data-driven multiple areas (data prop)
 * - Label position with 10 options (topLeft, top, topRight, etc.)
 * - Smart default label position based on which bounds are set
 * - Theme-token default colors
 * - labelBackgroundColor, labelPadding, fontSize props
 */

import { computed, inject, watch, onMounted, onUnmounted } from 'vue';
import type { ReferenceAreaProps } from '../../types';
import { seriesConfigKey } from '../../symbols/injectionKeys';
import { useThemeStores } from '../../composables/useTheme';

// ---------------------------------------------------------------------------
// Stable ID counter
// ---------------------------------------------------------------------------
let _idCounter = 0;
const nextId = () => `refarea_${++_idCounter}`;

const props = withDefaults(defineProps<ReferenceAreaProps>(), {
  opacity: 0.2,
  border: false,
  borderType: 'solid',
  borderWidth: 1,
  labelPadding: 4,
  fontSize: 12
});

const seriesConfig = inject(seriesConfigKey, undefined);
const { resolveColor, theme } = useThemeStores();

// ---------------------------------------------------------------------------
// Stable series identity
// ---------------------------------------------------------------------------
const seriesId = nextId();
const seriesName = `__reference_area_${seriesId}`;

// ---------------------------------------------------------------------------
// Theme-token default color
// ---------------------------------------------------------------------------
const defaultColor = computed(() => theme.value.colors['base-content-muted'] ?? '#999');

// ---------------------------------------------------------------------------
// Resolve colors
// ---------------------------------------------------------------------------
const colorResolved = computed(() =>
  props.color ? resolveColor(props.color).value : undefined
);
const labelColorResolved = computed(() =>
  props.labelColor ? resolveColor(props.labelColor).value : undefined
);
const borderColorResolved = computed(() =>
  props.borderColor ? resolveColor(props.borderColor).value : undefined
);
const labelBgResolved = computed(() =>
  props.labelBackgroundColor ? resolveColor(props.labelBackgroundColor).value : undefined
);

// ---------------------------------------------------------------------------
// Border type mapping
// ---------------------------------------------------------------------------
const borderTypeMap: Record<string, string> = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
};

// ---------------------------------------------------------------------------
// Label position mapping (10 options)
// ---------------------------------------------------------------------------
const areaPositionMap: Record<string, string> = {
  topLeft: 'insideTopLeft',
  top: 'insideTop',
  topRight: 'insideTopRight',
  bottomLeft: 'insideBottomLeft',
  bottom: 'insideBottom',
  bottomRight: 'insideBottomRight',
  left: 'insideLeft',
  center: 'inside',
  right: 'insideRight',
  // Also accept ECharts-native values as pass-through
  insideTopLeft: 'insideTopLeft',
  insideTop: 'insideTop',
  insideTopRight: 'insideTopRight',
  insideBottomLeft: 'insideBottomLeft',
  insideBottom: 'insideBottom',
  insideBottomRight: 'insideBottomRight',
  insideLeft: 'insideLeft',
  inside: 'inside',
  insideRight: 'insideRight'
};

// ---------------------------------------------------------------------------
// Smart default label position based on which bounds are set
// ---------------------------------------------------------------------------
function getSmartDefaultPosition(
  hasXBounds: boolean,
  hasYBounds: boolean
): string {
  if (hasXBounds && hasYBounds) return 'insideTopLeft';
  if (hasYBounds) return 'insideRight';
  if (hasXBounds) return 'insideTop';
  return 'insideTop';
}

function resolveAreaPosition(
  pos: string | undefined,
  hasXBounds: boolean,
  hasYBounds: boolean
): string {
  if (!pos) return getSmartDefaultPosition(hasXBounds, hasYBounds);
  return areaPositionMap[pos] ?? pos;
}

// ---------------------------------------------------------------------------
// Build a single markArea data entry from values
// ---------------------------------------------------------------------------
function buildAreaEntry(
  xMin: string | number | undefined,
  xMax: string | number | undefined,
  yMin: number | undefined,
  yMax: number | undefined,
  label: string | undefined
) {
  const hasYBounds = yMin !== undefined || yMax !== undefined;
  const hasXBounds = xMin !== undefined || xMax !== undefined;

  const startCoord: Record<string, unknown> = {};
  const endCoord: Record<string, unknown> = {};

  if (hasYBounds) {
    startCoord.yAxis = yMin ?? 'min';
    endCoord.yAxis = yMax ?? 'max';
  }

  if (hasXBounds) {
    startCoord.xAxis = xMin ?? 'min';
    endCoord.xAxis = xMax ?? 'max';
  }

  if (label) {
    startCoord.name = label;
  }

  return [startCoord, endCoord];
}

// ---------------------------------------------------------------------------
// Build markArea config
// ---------------------------------------------------------------------------
const markAreaConfig = computed(() => {
  const effectiveColor = (colorResolved.value || defaultColor.value) as string;

  const hasYBounds = props.yMin !== undefined || props.yMax !== undefined;
  const hasXBounds = props.xMin !== undefined || props.xMax !== undefined;

  const dataEntries: unknown[] = [];

  if (props.data && props.data.length > 0) {
    // Data-driven: one area per row
    for (const row of props.data) {
      const entry = buildAreaEntry(
        row.xMin ?? props.xMin,
        row.xMax ?? props.xMax,
        row.yMin ?? props.yMin,
        row.yMax ?? props.yMax,
        row.label ?? props.label
      );
      dataEntries.push(entry);
    }
  } else {
    // Single static area
    const entry = buildAreaEntry(props.xMin, props.xMax, props.yMin, props.yMax, props.label);
    dataEntries.push(entry);
  }

  const labelConfig = props.label
    ? {
        show: true,
        position: resolveAreaPosition(props.labelPosition, hasXBounds, hasYBounds),
        color: labelColorResolved.value as string | undefined,
        backgroundColor: labelBgResolved.value as string | undefined,
        padding: props.labelPadding,
        fontSize: props.fontSize
      }
    : undefined;

  return {
    silent: true,
    itemStyle: {
      color: effectiveColor,
      opacity: props.opacity,
      borderColor: (props.border
        ? (borderColorResolved.value || effectiveColor)
        : 'transparent') as string,
      borderWidth: props.border ? props.borderWidth : 0,
      borderType: borderTypeMap[props.borderType || 'solid']
    },
    label: labelConfig,
    data: dataEntries
  };
});

// ---------------------------------------------------------------------------
// Build series config
// ---------------------------------------------------------------------------
const seriesConfig2 = computed(() => ({
  name: seriesName,
  type: 'line' as const,
  data: [] as number[],
  markArea: markAreaConfig.value,
  seriesType: 'reference_area'
}));

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------
onMounted(() => {
  if (seriesConfig) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- markArea data shape doesn't match ECharts strict types
    seriesConfig.addSeries(seriesConfig2.value as any);
  }
});

watch(seriesConfig2, (newConfig) => {
  if (seriesConfig) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seriesConfig.updateSeries(seriesName, newConfig as any);
  }
});

onUnmounted(() => {
  if (seriesConfig) {
    seriesConfig.removeSeries(seriesName);
  }
});
</script>

<template>
  <slot />
</template>
