<script setup lang="ts">
/**
 * Column component for DataTable
 *
 * Renderless component that registers column configuration with the parent DataTable
 * via provide/inject. Follows the same pattern as Evidence's Column.svelte.
 */
import { inject, onUnmounted, watch, computed } from 'vue';
import type { TableColumnConfig, ColumnContentType, AggregationType } from '../../types/table.types';
import type { TableContext } from '../../symbols/injectionKeys';
import { tableContextKey } from '../../symbols/injectionKeys';

const props = withDefaults(defineProps<{
  id: string;
  title?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  wrap?: boolean;
  wrapTitle?: boolean;
  contentType?: ColumnContentType;
  fmt?: string;
  fmtColumn?: string;
  totalAgg?: AggregationType | string;
  totalFmt?: string;
  weightCol?: string;
  subtotalFmt?: string;

  // Image
  height?: string;
  width?: string;
  alt?: string;

  // Link
  openInNewTab?: boolean;
  linkLabel?: string;

  // Color Scale
  colorMax?: number;
  colorMin?: number;
  colorMid?: number;
  colorBreakpoints?: number[];
  colorScale?: string | string[];
  scaleColumn?: string;

  // Delta
  downIsGood?: boolean;
  showValue?: boolean;
  deltaSymbol?: boolean;
  neutralMin?: number;
  neutralMax?: number;
  chip?: boolean;
  symbolPosition?: 'left' | 'right';
  deltaText?: string;

  // Sparkline
  sparkWidth?: number;
  sparkHeight?: number;
  sparkColor?: string;
  sparkX?: string;
  sparkY?: string;
  sparkYScale?: boolean;
  interactive?: boolean;
  valueFmt?: string;
  dateFmt?: string;

  // Bar
  barColor?: string;
  negativeBarColor?: string;
  backgroundColor?: string;
  hideLabels?: boolean;

  // Column Groups
  colGroup?: string;

  // Styling
  redNegatives?: boolean;
}>(), {
  wrap: false,
  wrapTitle: false,
  openInNewTab: false,
  downIsGood: false,
  showValue: true,
  deltaSymbol: true,
  neutralMin: 0,
  neutralMax: 0,
  chip: false,
  symbolPosition: 'right',
  sparkYScale: false,
  interactive: false,
  barColor: '#a5cdee',
  negativeBarColor: '#fca5a5',
  backgroundColor: 'transparent',
  hideLabels: false,
  redNegatives: false,
  colorScale: 'default',
});

const tableContext = inject<TableContext>(tableContextKey);

const identifier = Symbol(`column-${props.id}`);

const columnConfig = computed<TableColumnConfig>(() => ({
  identifier,
  id: props.id,
  title: props.title,
  description: props.description,
  align: props.align === ('centre' as string) ? 'center' : props.align,
  wrap: props.wrap,
  wrapTitle: props.wrapTitle,
  contentType: props.contentType,
  fmt: props.fmt,
  fmtColumn: props.fmtColumn,
  totalAgg: props.totalAgg,
  totalFmt: props.totalFmt,
  weightCol: props.weightCol,
  subtotalFmt: props.subtotalFmt,
  height: props.height,
  width: props.width,
  alt: props.alt,
  openInNewTab: props.openInNewTab,
  linkLabel: props.linkLabel,
  colorMax: props.colorMax,
  colorMin: props.colorMin,
  colorMid: props.colorMid,
  colorBreakpoints: props.colorBreakpoints,
  colorScale: props.colorScale,
  scaleColumn: props.scaleColumn,
  downIsGood: props.downIsGood,
  showValue: props.showValue,
  deltaSymbol: props.deltaSymbol,
  neutralMin: props.neutralMin,
  neutralMax: props.neutralMax,
  chip: props.chip,
  symbolPosition: props.symbolPosition,
  deltaText: props.deltaText,
  sparkWidth: props.sparkWidth,
  sparkHeight: props.sparkHeight,
  sparkColor: props.sparkColor,
  sparkX: props.sparkX,
  sparkY: props.sparkY,
  sparkYScale: props.sparkYScale,
  interactive: props.interactive,
  valueFmt: props.valueFmt,
  dateFmt: props.dateFmt,
  barColor: props.barColor,
  negativeBarColor: props.negativeBarColor,
  backgroundColor: props.backgroundColor,
  hideLabels: props.hideLabels,
  colGroup: props.colGroup,
  redNegatives: props.redNegatives,
}));

if (tableContext) {
  // Register on mount
  tableContext.registerColumn(columnConfig.value);

  // Update on prop changes
  watch(columnConfig, (newConfig) => {
    tableContext.updateColumn(newConfig);
  });

  // Unregister on destroy
  onUnmounted(() => {
    tableContext.unregisterColumn(props.id);
  });
} else {
  console.warn('<Column> must be used inside a <DataTable> component');
}
</script>

<template>
  <!-- Renderless component -->
</template>
