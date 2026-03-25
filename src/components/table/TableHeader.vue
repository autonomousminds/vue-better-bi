<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
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

const hasColGroups = computed(() => props.orderedColumns.some(c => c.colGroup));

/** Divider color derived from header font color, or a sensible default */
const dividerColor = computed(() =>
  props.headerFontColor
    ? `color-mix(in srgb, ${props.headerFontColor} 30%, transparent)`
    : 'rgba(255,255,255,0.25)',
);

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

// Compute column group spans for the group header row
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

/** Does this column start a colGroup? (first column in a named group) */
function isFirstInGroup(index: number): boolean {
  if (!hasColGroups.value) return false;
  const col = props.orderedColumns[index];
  if (!col.colGroup) return false;
  if (index === 0) return true;
  return col.colGroup !== props.orderedColumns[index - 1].colGroup;
}

/** Does this column end a colGroup? (last column in a named group) */
function isLastInGroup(index: number): boolean {
  if (!hasColGroups.value) return false;
  const col = props.orderedColumns[index];
  if (!col.colGroup) return false;
  if (index === props.orderedColumns.length - 1) return true;
  return col.colGroup !== props.orderedColumns[index + 1].colGroup;
}
</script>

<template>
  <thead>
    <!-- Column group header row -->
    <tr v-if="hasColGroups" class="group-row">
      <th
        v-if="rowNumbers"
        class="index-header group-row-cell"
        :style="{ backgroundColor: headerColor }"
      />
      <template v-for="(column, ci) in getColumnsWithGroupSpan()" :key="column.identifier">
        <th
          v-if="column.colGroup && column.isNewGroup"
          :colspan="column.span"
          class="group-header"
          :class="compact ? 'compact' : ''"
          :style="{
            color: headerFontColor || undefined,
            backgroundColor: headerColor || undefined,
            borderLeft: isFirstInGroup(ci) ? `1.5px solid ${dividerColor}` : 'none',
            borderRight: isLastInGroup(ci + column.span - 1) ? `1.5px solid ${dividerColor}` : 'none',
          }"
        >
          {{ column.colGroup }}
        </th>
        <th
          v-else-if="!column.colGroup"
          class="group-header-empty"
          :style="{
            backgroundColor: headerColor || undefined,
          }"
        />
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
        v-for="(column, ci) in orderedColumns"
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
          width: column.width || undefined,
          minWidth: column.minWidth || undefined,
          maxWidth: column.maxWidth || undefined,
          borderLeft: isFirstInGroup(ci) ? `1.5px solid ${dividerColor}` : 'none',
          borderRight: isLastInGroup(ci) ? `1.5px solid ${dividerColor}` : 'none',
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

/* ── Group row: darker tint band above the column headers ── */
.group-row {
  border: none;
}

.group-row-cell {
  padding: 0;
}

.group-header {
  text-align: center;
  vertical-align: middle;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 5px 8px 3px;
  border: none;
  /* Darken slightly relative to the main header row */
  background-image: linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08));
}

.group-header.compact {
  font-size: 0.6rem;
  padding: 3px 4px 2px;
}

.group-header-empty {
  padding: 0;
  border: none;
  /* Same darkening overlay so the band is consistent */
  background-image: linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08));
}

/* ── Standard column type alignment ── */
.index-header {
  color: var(--table-muted-color, #999);
  text-align: left;
  max-width: min-content;
  width: 2%;
}

.string { text-align: left; }
.date   { text-align: left; }
.number { text-align: right; }
.boolean { text-align: left; }

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
