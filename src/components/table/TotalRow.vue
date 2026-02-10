<script setup lang="ts">
import type { TableColumnConfig, ColumnSummaryItem, GroupType } from '../../types/table.types';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { safeExtractColumn, weightedMean } from '../../utils/tableUtils';
import TableCell from './TableCell.vue';
import DeltaCell from './DeltaCell.vue';

const props = defineProps<{
  data: Record<string, unknown>[];
  columnSummary: ColumnSummaryItem[];
  rowNumbers?: boolean;
  rowColor?: string;
  fontColor?: string;
  groupType?: GroupType;
  orderedColumns: TableColumnConfig[];
  compact?: boolean;
}>();

function getAggValue(column: TableColumnConfig) {
  const colSummary = safeExtractColumn(column, props.columnSummary);
  const totalAgg = column.totalAgg || 'sum';

  if (totalAgg === 'weightedMean') {
    return weightedMean(props.data, column.id, column.weightCol);
  }

  const summary = colSummary.columnUnitSummary;
  if (summary) {
    const val = (summary as unknown as Record<string, unknown>)[totalAgg];
    if (val !== undefined) return val;
  }

  return null;
}

function getFormat(column: TableColumnConfig) {
  const colSummary = safeExtractColumn(column, props.columnSummary);
  if (column.totalFmt) return getFormatObjectFromString(column.totalFmt);
  if (column.fmt) return getFormatObjectFromString(column.fmt);
  return colSummary.format;
}
</script>

<template>
  <tr
    class="total-row"
    :style="{ backgroundColor: rowColor, color: fontColor }"
  >
    <!-- Row number placeholder -->
    <TableCell
      v-if="rowNumbers && groupType !== 'section'"
      data-type="index"
      :compact="compact"
      :top-border="true"
    />

    <template v-for="column in orderedColumns" :key="String(column.identifier)">
      <TableCell
        :data-type="safeExtractColumn(column, columnSummary).type"
        :compact="compact"
        :align="column.align"
        :height="column.height"
        :width="column.width"
        :wrap="column.wrap"
        :top-border="true"
        class="total-cell"
      >
        <template v-if="['sum', 'mean', 'weightedMean', 'median', 'min', 'max', 'count', 'countDistinct'].includes(column.totalAgg || 'sum')">
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
            {{ formatValue(
              getAggValue(column),
              getFormat(column),
              safeExtractColumn(column, columnSummary).columnUnitSummary
            ) }}
          </template>
        </template>
        <template v-else-if="column.totalAgg">
          {{ column.totalFmt
            ? formatValue(column.totalAgg, getFormat(column), safeExtractColumn(column, columnSummary).columnUnitSummary)
            : column.totalAgg
          }}
        </template>
      </TableCell>
    </template>
  </tr>
</template>

<style scoped>
.total-row {
  font-weight: 600;
}

.total-cell {
  border-top: 1px solid var(--table-border-strong-color, #999);
}
</style>
