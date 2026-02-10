<script setup lang="ts">
import type { TableColumnConfig, ColumnSummaryItem, GroupType } from '../../types/table.types';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { safeExtractColumn, aggregateColumn } from '../../utils/tableUtils';
import TableCell from './TableCell.vue';
import DeltaCell from './DeltaCell.vue';

const props = defineProps<{
  groupName: string;
  currentGroupData: Record<string, unknown>[];
  columnSummary: ColumnSummaryItem[];
  rowColor?: string;
  fontColor?: string;
  groupBy: string;
  groupType?: GroupType;
  orderedColumns: TableColumnConfig[];
  compact?: boolean;
  tableSubtotalFmt?: string;
}>();

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
    class="subtotal-row"
    :style="{ backgroundColor: rowColor, color: fontColor }"
  >
    <template v-for="column in orderedColumns" :key="String(column.identifier)">
      <TableCell
        :data-type="safeExtractColumn(column, columnSummary).type"
        :compact="compact"
        :align="column.align"
        class="subtotal-cell"
      >
        <template v-if="column.id !== groupBy">
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
        <template v-else-if="groupType === 'section'">
          {{ groupName }}
        </template>
      </TableCell>
    </template>
  </tr>
</template>

<style scoped>
.subtotal-row {
  border-bottom: 1px solid var(--table-border-strong-color, #999);
  background-color: var(--table-row-shading, #f3f4f6);
}

.subtotal-cell {
  font-weight: 500;
}
</style>
