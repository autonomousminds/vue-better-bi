<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
  dataType?: string;
  align?: string;
  height?: string;
  width?: string;
  wrap?: boolean;
  verticalAlign?: string;
  rowSpan?: number;
  colSpan?: number;
  show?: boolean;
  cellColor?: string;
  fontColor?: string;
  topBorder?: boolean;
  paddingLeft?: string;
  borderBottom?: string;
  compact?: boolean;
}>(), {
  verticalAlign: 'middle',
  rowSpan: 1,
  colSpan: 1,
  show: true,
  compact: false,
});

const cellStyle = computed<CSSProperties>(() => ({
  textAlign: (props.align as CSSProperties['textAlign']) || undefined,
  height: props.height,
  width: props.width,
  whiteSpace: props.wrap ? 'normal' : 'nowrap',
  verticalAlign: props.verticalAlign as CSSProperties['verticalAlign'],
  display: props.show ? undefined : 'none',
  backgroundColor: props.cellColor || undefined,
  color: props.fontColor || undefined,
  paddingLeft: props.paddingLeft || undefined,
  borderBottom: props.borderBottom || undefined,
}));
</script>

<template>
  <td
    role="cell"
    :class="[
      dataType,
      compact ? 'compact' : 'normal',
      { 'top-border': topBorder }
    ]"
    :style="cellStyle"
    :rowspan="rowSpan"
    :colspan="colSpan"
  >
    <slot />
  </td>
</template>

<style scoped>
td {
  overflow: hidden;
}

td:first-child {
  padding-left: 3px;
}

.compact {
  font-size: 0.75rem;
  padding: 1px 16.5px 1px 0;
}

.normal {
  padding: 2px 13px 2px 6px;
}

.string {
  text-align: left;
}

.date {
  text-align: left;
}

.number {
  text-align: right;
}

.boolean {
  text-align: left;
}

.index {
  color: var(--table-muted-color, #999);
  text-align: left;
  max-width: min-content;
}

.top-border {
  border-top: 1px solid var(--table-border-color, #e0e0e0);
}
</style>
