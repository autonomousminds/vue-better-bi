<script setup lang="ts">
import type { TableColumnConfig, ColumnSummaryItem, GroupType, GroupNamePosition } from '../../types/table.types';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { safeExtractColumn } from '../../utils/tableUtils';
import TableCell from './TableCell.vue';
import DeltaCell from './DeltaCell.vue';
import BarCell from './BarCell.vue';
import SparklineCell from './SparklineCell.vue';
import chroma from 'chroma-js';

const props = withDefaults(defineProps<{
  displayedData: Record<string, unknown>[];
  orderedColumns: TableColumnConfig[];
  columnSummary: ColumnSummaryItem[];
  rowShading?: boolean;
  link?: string;
  rowNumbers?: boolean;
  rowLines?: boolean;
  compact?: boolean;
  index?: number;
  grouped?: boolean;
  groupType?: GroupType;
  groupColumn?: string;
  rowSpan?: number;
  groupNamePosition?: GroupNamePosition;
}>(), {
  index: 0,
  rowLines: true,
  groupNamePosition: 'middle',
});

function getColumnFormat(column: TableColumnConfig, row: Record<string, unknown>) {
  const useCol = safeExtractColumn(column, props.columnSummary);
  if (column.fmt) {
    return getFormatObjectFromString(column.fmt, useCol.format?.valueType);
  }
  if (column.fmtColumn && row[column.fmtColumn]) {
    return getFormatObjectFromString(String(row[column.fmtColumn]), useCol.format?.valueType);
  }
  return useCol.format;
}

function getCellColor(column: TableColumnConfig, row: Record<string, unknown>): string {
  if (column.contentType !== 'colorscale') return '';
  const useCol = safeExtractColumn(column, props.columnSummary);
  const scaleCol = column.scaleColumn
    ? props.columnSummary.find((d) => d.id === column.scaleColumn) || useCol
    : useCol;

  const colMin = column.colorMin ?? scaleCol.columnUnitSummary?.min ?? 0;
  const colMax = column.colorMax ?? scaleCol.columnUnitSummary?.max ?? 0;
  const isNonZero = colMax - colMin !== 0 && !isNaN(colMax) && !isNaN(colMin);

  if (!isNonZero || !column.colorScale) return '';

  const domain = column.colorBreakpoints ??
    (column.colorMid != null ? [colMin, column.colorMid, colMax] : [colMin, colMax]);

  try {
    // Resolve color scale - named presets map to specific palettes
    const COLOR_SCALE_PRESETS: Record<string, string[]> = {
      default: ['#c6dbef', '#6baed6', '#2171b5'],
      positive: ['#c6f6d5', '#48bb78', '#276749'],
      negative: ['#fed7d7', '#fc8181', '#c53030'],
      info: ['#bee3f8', '#63b3ed', '#2b6cb0'],
    };

    let scaleColors: string[];
    if (typeof column.colorScale === 'string' && column.colorScale in COLOR_SCALE_PRESETS) {
      scaleColors = COLOR_SCALE_PRESETS[column.colorScale];
    } else if (Array.isArray(column.colorScale)) {
      scaleColors = column.colorScale;
    } else {
      scaleColors = [column.colorScale as string];
    }
    const scale = chroma.scale(scaleColors).domain(domain);
    const value = column.scaleColumn ? row[column.scaleColumn] : row[column.id];
    // Handle nodata — return neutral background for null/undefined/NaN
    if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
      return '#f3f4f6'; // base-100 neutral color for nodata
    }
    return scale(Number(value)).hex();
  } catch {
    return '';
  }
}

function getFontColor(column: TableColumnConfig, row: Record<string, unknown>, cellColor: string): string {
  if (column.redNegatives && Number(row[column.id]) < 0) {
    return '#e53e3e';
  }
  if (cellColor) {
    try {
      const contrastDark = chroma.contrast(cellColor, '#1a1a1a');
      const contrastLight = chroma.contrast(cellColor, '#ffffff');
      return contrastLight > contrastDark + 0.5 ? '#ffffff' : '#1a1a1a';
    } catch {
      return '';
    }
  }
  return '';
}

function getCellBorderBottom(column: TableColumnConfig, cellColor: string, rowIndex: number): string {
  if (
    rowIndex !== props.displayedData.length - 1 &&
    props.rowLines &&
    column.contentType === 'colorscale' &&
    cellColor
  ) {
    try {
      return `1px solid ${chroma(cellColor).darken(0.5).hex()}`;
    } catch {
      return '';
    }
  }
  return '';
}

function formatCellValue(column: TableColumnConfig, row: Record<string, unknown>): string {
  const useCol = safeExtractColumn(column, props.columnSummary);
  const format = getColumnFormat(column, row);
  return formatValue(row[column.id], format, useCol.columnUnitSummary);
}

function getBarExtents(column: TableColumnConfig) {
  const useCol = safeExtractColumn(column, props.columnSummary);
  const scaleCol = column.scaleColumn
    ? props.columnSummary.find((d) => d.id === column.scaleColumn) || useCol
    : useCol;
  return {
    min: column.colorMin ?? scaleCol.columnUnitSummary?.min ?? 0,
    max: column.colorMax ?? scaleCol.columnUnitSummary?.max ?? 0,
  };
}

function navigateToLink(row: Record<string, unknown>, event: MouseEvent) {
  if (!props.link || !row[props.link]) return;

  // Don't navigate if clicking on a link element that should open in new tab
  const target = (event.target as HTMLElement)?.closest('a');
  if (target?.getAttribute('target') === '_blank') return;

  const url = String(row[props.link]);

  try {
    const isExternal = new URL(url, window.location.origin).origin !== window.location.origin;
    if (isExternal) {
      window.location.href = url;
    } else {
      window.location.href = url;
    }
  } catch {
    window.location.href = url;
  }
}
</script>

<template>
  <tr
    v-for="(row, i) in displayedData"
    :key="i"
    :class="{
      'row-shaded': rowShading && i % 2 === 1,
      'row-link': link && row[link],
      'row-border': rowLines,
    }"
    @click="link && row[link] ? navigateToLink(row, $event) : undefined"
  >
    <!-- Row number -->
    <TableCell
      v-if="rowNumbers && groupType !== 'section'"
      data-type="index"
      :compact="compact"
    >
      {{ (index + i + 1).toLocaleString() }}
    </TableCell>

    <!-- Data cells -->
    <template v-for="(column, k) in orderedColumns" :key="String(column.identifier)">
      <TableCell
        :data-type="safeExtractColumn(column, columnSummary).type"
        :compact="compact"
        :vertical-align="groupType === 'section' ? groupNamePosition : undefined"
        :row-span="groupType === 'section' && groupColumn === column.id && i === 0 ? rowSpan : 1"
        :show="!(groupType === 'section' && groupColumn === column.id && i !== 0)"
        :align="column.align"
        :padding-left="k === 0 && grouped && groupType === 'accordion' && !rowNumbers ? '28px' : undefined"
        :height="column.height"
        :width="column.width"
        :wrap="column.wrap"
        :cell-color="getCellColor(column, row)"
        :font-color="getFontColor(column, row, getCellColor(column, row))"
        :border-bottom="getCellBorderBottom(column, getCellColor(column, row), i)"
      >
        <!-- Image -->
        <template v-if="column.contentType === 'image' && row[column.id] != null">
          <img
            :src="String(row[column.id])"
            :alt="column.alt ? String(row[column.alt!] || '') : String(row[column.id]).replace(/^(.*[/])/g, '').replace(/[.][^.]+$/g, '')"
            class="cell-image"
            :style="{ height: column.height, width: column.width }"
          />
        </template>

        <!-- Link -->
        <template v-else-if="column.contentType === 'link' && row[column.id] != null">
          <template v-if="column.linkLabel != null && row[column.linkLabel!] == null && column.linkLabel in row">
            -
          </template>
          <a
            v-else
            :href="String(row[column.id])"
            :target="column.openInNewTab ? '_blank' : undefined"
            class="cell-link"
          >
            <template v-if="column.linkLabel != null && row[column.linkLabel!] != null">
              {{ formatCellValue({ ...column, id: column.linkLabel! }, row) }}
            </template>
            <template v-else-if="column.linkLabel != null">
              {{ column.linkLabel }}
            </template>
            <template v-else>
              {{ formatCellValue(column, row) }}
            </template>
          </a>
        </template>

        <!-- Delta -->
        <template v-else-if="column.contentType === 'delta' && row[column.id] != null">
          <DeltaCell
            :value="Number(row[column.id])"
            :down-is-good="column.downIsGood"
            :format-object="getColumnFormat(column, row)"
            :column-unit-summary="safeExtractColumn(column, columnSummary).columnUnitSummary"
            :show-value="column.showValue !== false"
            :show-symbol="column.deltaSymbol !== false"
            :align="column.align"
            :neutral-min="column.neutralMin ?? 0"
            :neutral-max="column.neutralMax ?? 0"
            :chip="column.chip"
            :symbol-position="column.symbolPosition ?? 'right'"
            :text="column.deltaText"
          />
        </template>

        <!-- Bar -->
        <template v-else-if="column.contentType === 'bar' && row[column.id] != null">
          <BarCell
            :value="Number(row[column.id])"
            :min="getBarExtents(column).min"
            :max="getBarExtents(column).max"
            :label="formatCellValue(column, row)"
            :bar-color="column.barColor || '#a5cdee'"
            :negative-bar-color="column.negativeBarColor || '#fca5a5'"
            :background-color="column.backgroundColor || 'transparent'"
            :hide-labels="column.hideLabels"
            :align="column.align"
          />
        </template>

        <!-- Sparkline / Sparkbar / Sparkarea -->
        <template v-else-if="['sparkline', 'sparkbar', 'sparkarea'].includes(column.contentType || '') && row[column.id] != null">
          <SparklineCell
            :type="column.contentType === 'sparkbar' ? 'bar' : column.contentType === 'sparkarea' ? 'area' : 'line'"
            :data="Array.isArray(row[column.id]) ? (row[column.id] as unknown[]) : []"
            :date-col="column.sparkX"
            :value-col="column.sparkY"
            :color="column.sparkColor"
            :y-scale="column.sparkYScale"
            :height="column.sparkHeight ?? (column.contentType === 'sparkarea' ? 20 : 19)"
            :width="column.sparkWidth ?? (column.contentType === 'sparkarea' ? 80 : 90)"
            :interactive="column.interactive"
            :value-fmt="column.valueFmt"
            :date-fmt="column.dateFmt"
          />
        </template>

        <!-- HTML -->
        <template v-else-if="column.contentType === 'html' && row[column.id] != null">
          <span v-html="String(row[column.id])" />
        </template>

        <!-- Default (text) -->
        <template v-else>
          {{ formatCellValue(column, row) }}
        </template>
      </TableCell>
    </template>

    <!-- Link chevron -->
    <TableCell v-if="link && row[link]" :compact="compact" width="16px">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
      <a :href="String(row[link])" class="sr-only">See more</a>
    </TableCell>
  </tr>
</template>

<style scoped>
.row-shaded {
  background-color: var(--table-row-shading, #f9fafb);
}

.row-link {
  cursor: pointer;
}

.row-link:hover {
  background-color: var(--table-row-shading, #f9fafb);
}

.row-border {
  border-bottom: 1px solid var(--table-border-color, #e5e7eb);
}

.cell-image {
  margin: 4px auto;
  max-width: unset;
  border-radius: unset;
}

.cell-link {
  color: var(--table-link-color, #3b82f6);
  text-decoration: none;
}

.cell-link:hover {
  filter: brightness(1.1);
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
