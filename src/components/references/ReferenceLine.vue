<script setup lang="ts">
/**
 * ReferenceLine component
 * Adds one or more reference lines to a chart.
 *
 * Supports:
 * - Static single line (x/y props)
 * - Data-driven multiple lines (data prop)
 * - Diagonal/sloped lines (x+y + x2+y2)
 * - Label position aliasing (friendly names -> ECharts positions)
 * - Symbol support (arrow, circle, etc.)
 * - Rich label styling (bold, italic, border)
 * - Theme-token default colors
 */

import { computed, inject, watch, onMounted, onUnmounted } from 'vue';
import type { ReferenceLineProps } from '../../types';
import { seriesConfigKey } from '../../symbols/injectionKeys';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue } from '../../utils/formatting';

// ---------------------------------------------------------------------------
// Stable ID counter (avoids Date.now() collisions)
// ---------------------------------------------------------------------------
let _idCounter = 0;
const nextId = () => `refline_${++_idCounter}`;

const props = withDefaults(defineProps<ReferenceLineProps>(), {
  labelPosition: 'end',
  lineType: 'dashed',
  lineWidth: 1,
  hideValue: false,
  labelPadding: 4,
  fontSize: 12
});

const seriesConfig = inject(seriesConfigKey, undefined);
const { resolveColor, theme } = useThemeStores();

// ---------------------------------------------------------------------------
// Stable series identity
// ---------------------------------------------------------------------------
const seriesId = nextId();
const seriesName = `__reference_line_${seriesId}`;

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
const labelBorderColorResolved = computed(() =>
  props.labelBorderColor ? resolveColor(props.labelBorderColor).value : undefined
);

// ---------------------------------------------------------------------------
// Line type mapping
// ---------------------------------------------------------------------------
const lineTypeMap: Record<string, string> = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted'
};

// ---------------------------------------------------------------------------
// Label position aliasing
// ---------------------------------------------------------------------------
const positionMap: Record<string, string> = {
  aboveStart: 'insideStartTop',
  aboveCenter: 'insideMiddleTop',
  aboveEnd: 'insideEndTop',
  belowStart: 'insideStartBottom',
  belowCenter: 'insideMiddleBottom',
  belowEnd: 'insideEndBottom',
  start: 'insideStartTop',
  middle: 'insideMiddleTop',
  end: 'insideEndTop'
};

function resolvePosition(pos: string | undefined): string {
  if (!pos) return 'insideEndTop';
  return positionMap[pos] ?? pos;
}

// ---------------------------------------------------------------------------
// Symbol handling
// ---------------------------------------------------------------------------
const ARROW_SVG_PATH = 'path://M0,10 L5,0 L10,10 z';

function resolveSymbol(sym: string | undefined): string | string[] {
  if (!sym || sym === 'none') return 'none';
  if (sym === 'arrow') return ARROW_SVG_PATH;
  return sym;
}

function resolveSymbolSize(sym: string | undefined, size: number | undefined): number | number[] {
  if (sym === 'none') return 0;
  return size ?? 5;
}

// ---------------------------------------------------------------------------
// Build a single markLine data entry from values
// ---------------------------------------------------------------------------
function buildLineEntry(
  x: string | number | undefined,
  y: string | number | undefined,
  x2: string | number | undefined,
  y2: string | number | undefined,
  label: string | undefined
) {
  const effectiveColor = (colorResolved.value || defaultColor.value) as string;
  const isHorizontal = y !== undefined && x === undefined && x2 === undefined && y2 === undefined;
  const isVertical = x !== undefined && y === undefined && x2 === undefined && y2 === undefined;
  const isDiagonal = x !== undefined && y !== undefined && x2 !== undefined && y2 !== undefined;

  const lineStyle: Record<string, unknown> = {
    color: effectiveColor,
    width: props.lineWidth,
    type: lineTypeMap[props.lineType || 'dashed']
  };

  const labelConfig: Record<string, unknown> = {
    show: true,
    position: resolvePosition(props.labelPosition),
    formatter: () => {
      let labelText = '';
      if (label) {
        labelText = label;
        if (!props.hideValue) {
          const value = isHorizontal ? y : x;
          labelText += `: ${formatValue(value)}`;
        }
      } else if (!props.hideValue) {
        labelText = formatValue(isHorizontal ? y : x);
      }
      return labelText;
    },
    color: labelColorResolved.value,
    backgroundColor: labelBgResolved.value,
    padding: props.labelPadding,
    fontSize: props.fontSize,
    fontWeight: props.bold ? 'bold' : undefined,
    fontStyle: props.italic ? 'italic' : undefined,
    borderWidth: props.labelBorderWidth,
    borderRadius: props.labelBorderRadius,
    borderColor: labelBorderColorResolved.value
  };

  const resolvedSym = resolveSymbol(props.symbol);
  const resolvedSymSize = resolveSymbolSize(props.symbol, props.symbolSize);

  // Diagonal / sloped line (two coord endpoints)
  if (isDiagonal) {
    return [
      {
        coord: [x, y],
        symbol: resolvedSym,
        symbolSize: resolvedSymSize,
        lineStyle,
        label: labelConfig
      },
      {
        coord: [x2, y2],
        symbol: resolvedSym,
        symbolSize: resolvedSymSize
      }
    ];
  }

  // Standard horizontal or vertical line
  const entry: Record<string, unknown> = {
    lineStyle,
    label: labelConfig,
    symbol: resolvedSym,
    symbolSize: resolvedSymSize
  };

  if (isHorizontal) {
    entry.yAxis = y;
  } else if (isVertical) {
    entry.xAxis = x;
  } else {
    // Fallback: if only x or only y is set alongside extra props
    if (y !== undefined) entry.yAxis = y;
    if (x !== undefined) entry.xAxis = x;
  }

  return entry;
}

// ---------------------------------------------------------------------------
// Build markLine config
// ---------------------------------------------------------------------------
const markLineConfig = computed(() => {
  const dataEntries: unknown[] = [];

  if (props.data && props.data.length > 0) {
    // Data-driven: one line per row
    for (const row of props.data) {
      const entry = buildLineEntry(
        row.x ?? props.x,
        row.y ?? props.y,
        row.x2 ?? props.x2,
        row.y2 ?? props.y2,
        row.label ?? props.label
      );
      dataEntries.push(entry);
    }
  } else {
    // Single static line
    const entry = buildLineEntry(props.x, props.y, props.x2, props.y2, props.label);
    dataEntries.push(entry);
  }

  return {
    silent: true,
    symbol: resolveSymbol(props.symbol),
    symbolSize: resolveSymbolSize(props.symbol, props.symbolSize),
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
  markLine: markLineConfig.value,
  seriesType: 'reference_line'
}));

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------
onMounted(() => {
  if (seriesConfig) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- markLine data shape doesn't match ECharts strict types
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
