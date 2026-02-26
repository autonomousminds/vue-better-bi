<script setup lang="ts">
/**
 * ReferencePoint component
 * Adds one or more reference point markers to a chart.
 *
 * Supports:
 * - Static single point (x/y props)
 * - Data-driven multiple points (data prop)
 * - Symbol handling (arrow -> SVG path, none -> symbolSize:0)
 * - symbolOpacity, symbolBorderWidth, symbolBorderColor props
 * - labelWidth with 'fit' option (overflow: 'break')
 * - Rich label styling (bold, italic, border)
 * - Theme-token default colors
 */

import { computed, inject, watch, onMounted, onUnmounted } from 'vue';
import type { ReferencePointProps } from '../../types';
import { seriesConfigKey } from '../../symbols/injectionKeys';
import { useThemeStores } from '../../composables/useTheme';

// ---------------------------------------------------------------------------
// Stable ID counter
// ---------------------------------------------------------------------------
let _idCounter = 0;
const nextId = () => `refpoint_${++_idCounter}`;

const props = withDefaults(defineProps<ReferencePointProps>(), {
  labelPosition: 'top',
  symbol: 'pin',
  symbolSize: 30,
  labelPadding: 4,
  fontSize: 12
});

const seriesConfig = inject(seriesConfigKey, undefined);
const { resolveColor, theme } = useThemeStores();

// ---------------------------------------------------------------------------
// Stable series identity
// ---------------------------------------------------------------------------
const seriesId = nextId();
const seriesName = `__reference_point_${seriesId}`;

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
const labelBgResolved = computed(() =>
  props.labelBackgroundColor ? resolveColor(props.labelBackgroundColor).value : undefined
);
const symbolBorderColorResolved = computed(() =>
  props.symbolBorderColor ? resolveColor(props.symbolBorderColor).value : undefined
);
const labelBorderColorResolved = computed(() =>
  props.labelBorderColor ? resolveColor(props.labelBorderColor).value : undefined
);

// ---------------------------------------------------------------------------
// Label position mapping
// ---------------------------------------------------------------------------
const labelPositionMap: Record<string, string> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
};

// ---------------------------------------------------------------------------
// Symbol handling
// ---------------------------------------------------------------------------
const ARROW_SVG_PATH = 'path://M0,10 L5,0 L10,10 z';

function resolveSymbol(sym: string | undefined): string {
  if (!sym || sym === 'none') return 'circle'; // Use circle but hide via symbolSize:0
  if (sym === 'arrow') return ARROW_SVG_PATH;
  return sym;
}

function resolveSymbolSize(sym: string | undefined, size: number | undefined): number {
  if (sym === 'none') return 0;
  return size ?? 30;
}

// ---------------------------------------------------------------------------
// Build markPoint config
// ---------------------------------------------------------------------------
const markPointConfig = computed(() => {
  const effectiveColor = (colorResolved.value || defaultColor.value) as string;
  const resolvedSym = resolveSymbol(props.symbol);
  const resolvedSymSize = resolveSymbolSize(props.symbol, props.symbolSize);

  // Label width handling
  const labelWidthConfig: Record<string, unknown> = {};
  if (props.labelWidth !== undefined) {
    if (props.labelWidth === 'fit') {
      labelWidthConfig.overflow = 'break';
    } else {
      labelWidthConfig.width = props.labelWidth;
      labelWidthConfig.overflow = 'break';
    }
  }

  const labelConfig: Record<string, unknown> = {
    show: !!props.label,
    position: labelPositionMap[props.labelPosition || 'top'] ?? props.labelPosition,
    formatter: () => props.label || '',
    color: labelColorResolved.value as string | undefined,
    backgroundColor: labelBgResolved.value as string | undefined,
    padding: props.labelPadding,
    fontSize: props.fontSize,
    fontWeight: props.bold ? 'bold' : undefined,
    fontStyle: props.italic ? 'italic' : undefined,
    borderWidth: props.labelBorderWidth,
    borderRadius: props.labelBorderRadius,
    borderColor: labelBorderColorResolved.value as string | undefined,
    ...labelWidthConfig
  };

  const itemStyle: Record<string, unknown> = {
    color: effectiveColor,
    opacity: props.symbolOpacity,
    borderWidth: props.symbolBorderWidth,
    borderColor: symbolBorderColorResolved.value as string | undefined
  };

  // Build data entries
  const dataEntries: Record<string, unknown>[] = [];

  if (props.data && props.data.length > 0) {
    // Data-driven: one point per row
    for (const row of props.data) {
      const px = row.x ?? props.x;
      const py = row.y ?? props.y;
      const pl = row.label ?? props.label;
      dataEntries.push({
        name: pl || '',
        coord: [px, py] as [string | number, number],
        value: py
      });
    }
  } else {
    // Single static point
    dataEntries.push({
      name: props.label || '',
      coord: [props.x, props.y] as [string | number, number],
      value: props.y
    });
  }

  return {
    silent: false,
    symbol: resolvedSym,
    symbolSize: resolvedSymSize,
    itemStyle,
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
  markPoint: markPointConfig.value,
  seriesType: 'reference_point'
}));

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------
onMounted(() => {
  if (seriesConfig) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- markPoint data shape doesn't match ECharts strict types
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
