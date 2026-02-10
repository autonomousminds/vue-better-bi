<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import type { FormatObject, ColumnUnitSummary } from '../../types';
import { formatValue } from '../../utils/formatting';

const props = withDefaults(defineProps<{
  value: number;
  downIsGood?: boolean;
  formatObject?: FormatObject;
  columnUnitSummary?: ColumnUnitSummary;
  showValue?: boolean;
  showSymbol?: boolean;
  align?: string;
  neutralMin?: number;
  neutralMax?: number;
  chip?: boolean;
  symbolPosition?: 'left' | 'right';
  text?: string;
}>(), {
  showValue: true,
  showSymbol: true,
  neutralMin: 0,
  neutralMax: 0,
  symbolPosition: 'right',
});

const valueStatus = computed(() => {
  if (props.value > props.neutralMax) return 'positive';
  if (props.value < props.neutralMin) return 'negative';
  return 'neutral';
});

const textColorClass = computed(() => {
  const map = {
    positive: props.downIsGood ? 'delta-negative' : 'delta-positive',
    negative: props.downIsGood ? 'delta-positive' : 'delta-negative',
    neutral: 'delta-neutral',
  };
  return map[valueStatus.value];
});

const chipClass = computed(() => {
  if (!props.chip) return '';
  const map = {
    positive: props.downIsGood ? 'chip-negative' : 'chip-positive',
    negative: props.downIsGood ? 'chip-positive' : 'chip-negative',
    neutral: 'chip-neutral',
  };
  return map[valueStatus.value];
});

const symbolHtml = computed(() => {
  if (valueStatus.value === 'positive') return '&#9650;';
  if (valueStatus.value === 'negative') return '&#9660;';
  return '&ndash;&thinsp;';
});

const formattedValue = computed(() => {
  if (props.value === null || props.value === undefined) return '–';
  return formatValue(props.value, props.formatObject, props.columnUnitSummary);
});
</script>

<template>
  <span
    :class="[
      'delta-cell',
      textColorClass,
      chip ? chipClass : '',
      { 'delta-chip': chip },
    ]"
  >
    <span :style="{ textAlign: (align || 'right') as CSSProperties['textAlign'] }">
      <span v-if="showSymbol && symbolPosition === 'left'" class="delta-symbol" v-html="symbolHtml" />
      <span v-if="showValue">
        <template v-if="value === null">
          <span class="delta-symbol">&ndash;</span>
        </template>
        <template v-else>{{ formattedValue }}</template>
      </span>
      <span v-if="showSymbol && symbolPosition === 'right'" class="delta-symbol" v-html="symbolHtml" />
      <span v-if="text" class="delta-text">{{ text }}</span>
    </span>
  </span>
</template>

<style scoped>
.delta-cell {
  display: inline-block;
  font-size: 9.25pt;
  margin: 0;
  border-radius: 0.375rem;
}

.delta-chip {
  padding: 0 4px;
}

.delta-positive {
  color: var(--table-positive-color, #16a34a);
}

.delta-negative {
  color: var(--table-negative-color, #dc2626);
}

.delta-neutral {
  color: var(--table-muted-color, #999);
}

.chip-positive {
  background-color: rgba(22, 163, 74, 0.1);
  border: 1px solid rgba(22, 163, 74, 0.2);
}

.chip-negative {
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.chip-neutral {
  background-color: var(--table-row-shading, #f3f4f6);
  border: 1px solid var(--table-border-color, #e5e7eb);
}

.delta-symbol {
  font-family: system-ui, sans-serif;
}

.delta-text {
  margin-left: 4px;
  font-size: 0.85em;
  opacity: 0.7;
}
</style>
