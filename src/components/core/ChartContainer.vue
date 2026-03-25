<script setup lang="ts">
/**
 * ChartContainer component
 * Shared outer wrapper for all chart-like components (EChartsBase, BigValue, etc.)
 * Provides consistent padding, border-radius, margins, title/subtitle, and print styles.
 * Shows error display when error prop is set.
 * Shows empty state when data is provided but empty.
 * Optionally renders an attached DataTable above or below the chart content.
 */

import { computed } from 'vue';
import type { TablePosition } from '../../types';
import type { DataTableProps, ColumnProps } from '../../types/table.types';
import ChartHeader from './ChartHeader.vue';
import ErrorDisplay from './ErrorDisplay.vue';
import EmptyState from './EmptyState.vue';
import DataTable from '../table/DataTable.vue';
import Column from '../table/Column.vue';

const props = withDefaults(defineProps<{
  title?: string;
  titleIcon?: string;
  subtitle?: string;
  backgroundColor?: string;
  data?: Record<string, unknown>[];
  error?: string | null;
  emptySet?: 'pass' | 'warn' | 'error';
  emptyMessage?: string;
  table?: boolean | TablePosition;
  tableProps?: Partial<Omit<DataTableProps, 'data'>>;
  tableColumns?: ColumnProps[];
}>(), {});

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});

const isEmptyData = computed(() => {
  return props.data !== undefined && !hasData.value;
});

const tablePosition = computed<TablePosition | null>(() => {
  if (!props.table) return null;
  if (props.table === true) return 'bottom';
  return props.table;
});
</script>

<template>
  <div
    class="chart-container"
    :style="backgroundColor ? { backgroundColor } : undefined"
  >
    <ChartHeader :title="title" :title-icon="titleIcon" :subtitle="subtitle" />
    <template v-if="error">
      <ErrorDisplay :message="error" />
    </template>
    <template v-else-if="isEmptyData">
      <EmptyState :empty-set="emptySet" :empty-message="emptyMessage" />
    </template>
    <template v-else>
      <!-- Attached table (top) -->
      <template v-if="tablePosition === 'top' && data">
        <DataTable v-if="tableColumns && tableColumns.length > 0" :data="data" v-bind="tableProps" class="attached-table attached-table--top">
          <Column v-for="col in tableColumns" :key="col.id" v-bind="col" />
        </DataTable>
        <DataTable v-else :data="data" v-bind="tableProps" class="attached-table attached-table--top" />
      </template>

      <slot />

      <!-- Attached table (bottom) -->
      <template v-if="tablePosition === 'bottom' && data">
        <DataTable v-if="tableColumns && tableColumns.length > 0" :data="data" v-bind="tableProps" class="attached-table attached-table--bottom">
          <Column v-for="col in tableColumns" :key="col.id" v-bind="col" />
        </DataTable>
        <DataTable v-else :data="data" v-bind="tableProps" class="attached-table attached-table--bottom" />
      </template>
    </template>
  </div>
</template>

<style scoped>
.chart-container {
  padding: 0.75rem;
  border-radius: 6px;
}

.attached-table--top {
  margin-bottom: 0.5rem;
}

.attached-table--bottom {
  margin-top: 0.5rem;
}

@media print {
  .chart-container {
    padding: 0 !important;
  }
}
</style>
