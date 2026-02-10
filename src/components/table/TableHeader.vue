<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { TableColumnConfig, ColumnSummaryItem, SortState } from '../../types/table.types';
import { safeExtractColumn } from '../../utils/tableUtils';
import SortIcon from './SortIcon.vue';
import InfoTooltip from './InfoTooltip.vue';

const props = withDefaults(defineProps<{
  orderedColumns: TableColumnConfig[];
  columnSummary: ColumnSummaryItem[];
  rowNumbers?: boolean;
  sortable?: boolean;
  sortState: SortState;
  formatColumnTitles?: boolean;
  wrapTitles?: boolean;
  compact?: boolean;
  headerColor?: string;
  headerFontColor?: string;
  link?: string;
}>(), {
  sortable: true,
  formatColumnTitles: true,
});

const emit = defineEmits<{
  (e: 'sortClick', column: string): void;
}>();

function getWrapTitleAlignment(column: TableColumnConfig): string {
  if (column.align) {
    if (column.align === 'right') return 'justify-end';
    if (column.align === 'center') return 'justify-center';
    return 'justify-start';
  }
  const colSummary = safeExtractColumn(column, props.columnSummary);
  if (colSummary.type === 'number') return 'justify-end';
  return 'justify-start';
}

function getHeaderAlignment(column: TableColumnConfig): string | undefined {
  if (column.align) return column.align;
  if (['sparkline', 'sparkbar', 'sparkarea', 'bar'].includes(column.contentType || '')) {
    return 'center';
  }
  return undefined;
}

function getColumnTitle(column: TableColumnConfig): string {
  if (column.title) return column.title;
  if (props.formatColumnTitles) {
    return safeExtractColumn(column, props.columnSummary).title;
  }
  return safeExtractColumn(column, props.columnSummary).id;
}

// Compute column group spans
function getColumnsWithGroupSpan() {
  return props.orderedColumns.map((column, index, array) => {
    const isNewGroup = index === 0 || column.colGroup !== array[index - 1].colGroup;
    let span = 1;
    if (column.colGroup && isNewGroup) {
      for (let i = index + 1; i < array.length && array[i].colGroup === column.colGroup; i++) {
        span++;
      }
    }
    return { ...column, isNewGroup, span: isNewGroup ? span : 0 };
  });
}
</script>

<template>
  <thead>
    <!-- Column group header row -->
    <tr
      v-if="orderedColumns.some(c => c.colGroup)"
      class="group-row"
      :style="{ backgroundColor: headerColor }"
    >
      <th v-if="rowNumbers" class="index-header" :style="{ backgroundColor: headerColor }" />
      <template v-for="column in getColumnsWithGroupSpan()" :key="column.identifier">
        <th
          v-if="column.colGroup && column.isNewGroup"
          :colspan="column.span"
          class="group-header"
          :class="compact ? 'compact' : ''"
        >
          <div class="group-header-label">
            {{ column.colGroup }}
          </div>
        </th>
        <th v-else-if="!column.colGroup" />
      </template>
    </tr>

    <!-- Main header row -->
    <tr class="header-row">
      <th
        v-if="rowNumbers"
        role="columnheader"
        class="index-header"
        :class="compact ? 'compact' : ''"
        :style="{ backgroundColor: headerColor }"
      />
      <th
        v-for="column in orderedColumns"
        :key="String(column.identifier)"
        role="columnheader"
        :class="[
          safeExtractColumn(column, columnSummary).type,
          compact ? 'compact' : '',
        ]"
        :style="{
          textAlign: getHeaderAlignment(column) as CSSProperties['textAlign'],
          color: headerFontColor || undefined,
          background: headerColor || undefined,
          cursor: sortable ? 'pointer' : 'auto',
          verticalAlign: 'bottom',
          borderRadius: sortState.col === column.id ? '2px' : '',
        } as CSSProperties"
        @click="sortable ? emit('sortClick', column.id) : undefined"
      >
        <div
          :class="[
            (wrapTitles || column.wrapTitle)
              ? `wrap-header ${getWrapTitleAlignment(column)}`
              : '',
          ]"
          style="letter-spacing: -1.5px;"
        >
          <span
            :class="{ 'wrap-text': wrapTitles || column.wrapTitle }"
            style="letter-spacing: normal;"
          >
            {{ getColumnTitle(column) }}
            <InfoTooltip
              v-if="column.description"
              :text="column.description"
            />
          </span>
          <span
            :class="[
              (wrapTitles || column.wrapTitle) ? 'ml-half' : '',
              compact ? 'mr-compact' : '',
            ]"
            style="letter-spacing: normal;"
          >
            <SortIcon
              v-if="sortState.col === column.id"
              :ascending="sortState.ascending"
            />
            <span v-else class="invisible-sort"><SortIcon /></span>
          </span>
        </div>
      </th>

      <!-- Extra column for link chevrons -->
      <th v-if="link" role="columnheader">
        <span class="sr-only">Links</span>
      </th>
    </tr>
  </thead>
</template>

<style scoped>
th {
  white-space: nowrap;
  overflow: hidden;
  font-weight: 600;
}

th:first-child {
  padding-left: 3px;
}

th.compact {
  font-size: 0.75rem;
  padding: 1px 4px;
}

th:not(.compact) {
  padding: 2px 8px;
}

.header-row {
  border-bottom: 1px solid var(--table-border-strong-color, #999);
}

.group-row {
  border: none;
}

.group-header {
  padding-top: 4px;
  vertical-align: bottom;
}

.group-header-label {
  border-bottom: 1px solid var(--table-muted-color, #999);
  white-space: normal;
  padding-bottom: 2px;
}

.index-header {
  color: var(--table-muted-color, #999);
  text-align: left;
  max-width: min-content;
  width: 2%;
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

.wrap-header {
  display: flex;
  align-items: flex-end;
}

.wrap-text {
  white-space: normal;
}

.ml-half {
  margin-left: 2px;
}

.mr-compact {
  margin-right: 4px;
}

.invisible-sort {
  visibility: hidden;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
