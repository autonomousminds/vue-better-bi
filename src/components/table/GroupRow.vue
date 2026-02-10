<script setup lang="ts">
import type { TableColumnConfig, ColumnSummaryItem } from '../../types/table.types';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { safeExtractColumn, aggregateColumn } from '../../utils/tableUtils';
import TableCell from './TableCell.vue';
import DeltaCell from './DeltaCell.vue';

const props = withDefaults(defineProps<{
  groupName: string;
  currentGroupData: Record<string, unknown>[];
  toggled?: boolean;
  columnSummary: ColumnSummaryItem[];
  rowNumbers?: boolean;
  rowColor?: string;
  subtotals?: boolean;
  orderedColumns: TableColumnConfig[];
  compact?: boolean;
  tableSubtotalFmt?: string;
}>(), {
  subtotals: true,
});

const emit = defineEmits<{
  (e: 'toggle', groupName: string): void;
}>();

function toggleGroup() {
  emit('toggle', props.groupName);
}

function getFormat(column: TableColumnConfig) {
  const useCol = safeExtractColumn(column, props.columnSummary);
  const columnFormat = column.fmt
    ? getFormatObjectFromString(column.fmt, useCol.format?.valueType)
    : useCol.format;
  // Priority: column subtotalFmt > table subtotalFmt > column totalFmt > column format
  const subtotalFmt = column.subtotalFmt || props.tableSubtotalFmt;
  const format = subtotalFmt
    ? getFormatObjectFromString(subtotalFmt)
    : column.totalFmt
      ? getFormatObjectFromString(column.totalFmt)
      : columnFormat;
  // Don't use date formats for aggregations
  if (format?.valueType === 'date') return undefined;
  return format;
}

function getAggValue(column: TableColumnConfig) {
  const useCol = safeExtractColumn(column, props.columnSummary);
  return aggregateColumn(
    props.currentGroupData,
    column.id,
    column.totalAgg,
    useCol.type,
    column.weightCol,
  );
}
</script>

<template>
  <tr
    class="group-row"
    :style="{ backgroundColor: rowColor }"
    role="button"
    tabindex="0"
    @click="toggleGroup"
    @keypress.enter="toggleGroup"
  >
    <template v-for="(column, j) in orderedColumns" :key="String(column.identifier)">
      <!-- First column: chevron + group name -->
      <TableCell
        v-if="j === 0"
        :compact="compact"
        :col-span="rowNumbers ? 2 : 1"
        padding-left="1px"
        class="group-name-cell"
      >
        <div class="group-name">
          <span class="chevron" :class="{ 'chevron-open': toggled }">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 1L8 5L3 9Z" />
            </svg>
          </span>
          {{ groupName }}
        </div>
      </TableCell>

      <!-- Subtotal columns -->
      <TableCell
        v-else-if="subtotals"
        :data-type="safeExtractColumn(column, columnSummary).type"
        :compact="compact"
        :align="column.align"
        class="group-subtotal-cell"
      >
        <template v-if="[undefined, 'sum', 'mean', 'median', 'min', 'max', 'weightedMean', 'count', 'countDistinct'].includes(column.totalAgg) || column.subtotalFmt">
          <DeltaCell
            v-if="column.contentType === 'delta'"
            :value="Number(getAggValue(column))"
            :down-is-good="column.downIsGood"
            :format-object="getFormat(column)"
            :column-unit-summary="safeExtractColumn(column, columnSummary).columnUnitSummary"
            :show-value="column.showValue !== false"
            :show-symbol="column.deltaSymbol !== false"
            :align="column.align"
            :neutral-min="column.neutralMin ?? 0"
            :neutral-max="column.neutralMax ?? 0"
            :chip="column.chip"
          />
          <template v-else>
            {{ formatValue(getAggValue(column), getFormat(column), safeExtractColumn(column, columnSummary).columnUnitSummary) }}
          </template>
        </template>
        <template v-else-if="column.totalAgg">
          {{ column.totalAgg }}
        </template>
      </TableCell>

      <!-- Empty cell when subtotals disabled -->
      <TableCell v-else :compact="compact" />
    </template>
  </tr>
</template>

<style scoped>
.group-row {
  cursor: pointer;
  border-top: 1px solid var(--table-border-color, #e5e7eb);
}

.group-row:hover {
  background-color: var(--table-row-shading, #f9fafb);
}

.group-name-cell {
  font-weight: 500;
  padding: 3px 0;
}

.group-subtotal-cell {
  font-weight: 500;
}

.group-name {
  display: flex;
  align-items: center;
  gap: 4px;
}

.chevron {
  display: inline-flex;
  transition: transform 150ms ease;
  transform: rotate(0deg);
}

.chevron-open {
  transform: rotate(90deg);
}

@media print {
  .chevron {
    display: none;
  }
}
</style>
