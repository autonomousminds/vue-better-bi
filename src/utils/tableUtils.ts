/**
 * Utility functions for DataTable
 * Ported from Evidence's datatable.js and getColumnSummary.js
 */

import type { ColumnSummaryItem, ColumnUnitSummary } from '../types';
import { inferValueType, lookupColumnFormat, formatTitle } from './formatting';

// ============================================================================
// Aggregation Functions
// ============================================================================

/**
 * Calculates weighted mean of a column
 * @returns null when weightCol is missing or data is empty
 */
export function weightedMean(
  data: Record<string, unknown>[],
  valueCol: string,
  weightCol?: string
): number | null {
  if (!weightCol) return null;
  if (!data.length) return null;

  let totalWeightedValue = 0;
  let totalWeight = 0;

  data.forEach((item) => {
    const value = Number(item[valueCol] ?? 0);
    const weight = Number(item[weightCol] ?? 0);
    totalWeightedValue += value * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? totalWeightedValue / totalWeight : 0;
}

/**
 * Calculates median of a column
 */
export function median(data: Record<string, unknown>[], column: string): number {
  const values = data
    .map((item) => item[column])
    .filter((val): val is number => val !== undefined && val !== null && !isNaN(Number(val)))
    .map(Number)
    .sort((a, b) => a - b);

  if (values.length === 0) return 0; // standalone median helper, not the aggregation path

  const midIndex = Math.floor(values.length / 2);
  return values.length % 2 !== 0
    ? values[midIndex]
    : (values[midIndex - 1] + values[midIndex]) / 2;
}

/**
 * Aggregates column values based on the specified aggregation type.
 * Defaults to 'sum' for numeric columns if aggType is not specified.
 */
export function aggregateColumn(
  data: Record<string, unknown>[],
  columnName: string,
  aggType: string | undefined,
  columnType: string,
  weightColumnName?: string | null
): number | string | null {
  if (!aggType && columnType === 'number') {
    aggType = 'sum';
  }

  if (!data || !data.length) return null;

  // Non-numeric columns can't have numeric aggregations
  if (
    columnType !== 'number' &&
    ['sum', 'min', 'max', 'mean', 'weightedMean', 'median', undefined].includes(aggType)
  ) {
    return '-';
  }

  const columnValues = data
    .map((row) => row[columnName])
    .filter((val) => val !== undefined && val !== null);

  switch (aggType) {
    case 'sum':
      return columnValues.reduce<number>((sum, val) => sum + Number(val), 0);
    case 'min':
      return Math.min(...columnValues.map(Number));
    case 'max':
      return Math.max(...columnValues.map(Number));
    case 'mean':
      return columnValues.length
        ? columnValues.reduce<number>((sum, val) => sum + Number(val), 0) / columnValues.length
        : '-';
    case 'count':
      return data.length;
    case 'countDistinct':
      return new Set(columnValues).size;
    case 'weightedMean': {
      if (!weightColumnName) return null;
      let totalWeight = 0;
      const weightedSum = data.reduce((sum, row) => {
        const weight = Number(row[weightColumnName] || 0);
        totalWeight += weight;
        return sum + (Number(row[columnName]) || 0) * weight;
      }, 0);
      return totalWeight > 0 ? weightedSum / totalWeight : null;
    }
    case 'median': {
      const sortedValues = columnValues.map(Number).sort((a, b) => a - b);
      const mid = Math.floor(sortedValues.length / 2);
      return sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    }
    default:
      return aggType ? `${aggType}` : null;
  }
}

// ============================================================================
// Column Order
// ============================================================================

/**
 * Generates the final column order placing priority columns (groupBy) first
 */
export function getFinalColumnOrder(columns: string[], priorityColumns: (string | undefined)[]): string[] {
  const validPriority = priorityColumns.filter((c): c is string => c !== undefined);
  const restColumns = columns.filter((key) => !validPriority.includes(key));
  return [...validPriority, ...restColumns];
}

// ============================================================================
// Column Summary
// ============================================================================

/**
 * Computes column unit summary (min, max, median, mean, etc.) for a numeric column
 */
function getColumnUnitSummary(
  data: Record<string, unknown>[],
  columnName: string,
  isNumeric: boolean
): ColumnUnitSummary {
  const values = data
    .map((row) => row[columnName])
    .filter((v): v is number | string => v !== undefined && v !== null);

  const count = values.length;
  const countDistinct = new Set(values).size;

  if (!isNumeric || count === 0) {
    return {
      min: undefined as unknown as number,
      max: undefined as unknown as number,
      median: undefined as unknown as number,
      maxDecimals: 0,
      unitType: 'string',
      count,
      countDistinct,
      mean: undefined as unknown as number,
      sum: undefined as unknown as number,
    };
  }

  const numericValues = values.map(Number).filter((v) => !isNaN(v));

  if (numericValues.length === 0) {
    return {
      min: 0,
      max: 0,
      median: 0,
      maxDecimals: 0,
      unitType: 'number',
      count,
      countDistinct,
      mean: 0,
      sum: 0,
    };
  }

  const sorted = [...numericValues].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const sum = sorted.reduce((s, v) => s + v, 0);
  const mean = sum / sorted.length;

  const midIdx = Math.floor(sorted.length / 2);
  const medianVal =
    sorted.length % 2 !== 0
      ? sorted[midIdx]
      : (sorted[midIdx - 1] + sorted[midIdx]) / 2;

  // Calculate max decimals
  let maxDecimals = 0;
  for (const val of numericValues) {
    const str = String(val);
    const dotIdx = str.indexOf('.');
    if (dotIdx !== -1) {
      maxDecimals = Math.max(maxDecimals, str.length - dotIdx - 1);
    }
  }

  return {
    min,
    max,
    median: medianVal,
    maxDecimals,
    unitType: 'number',
    count,
    countDistinct,
    mean,
    sum,
  };
}

/**
 * Generates column summaries from data array.
 * Returns metadata for each column: id, title, type, format, columnUnitSummary.
 */
export function getColumnSummary(data: Record<string, unknown>[]): ColumnSummaryItem[] {
  if (!data || data.length === 0) return [];

  const columns = Object.keys(data[0]);
  const result: ColumnSummaryItem[] = [];

  for (const colName of columns) {
    // Find first non-null value to infer type
    let sampleValue: unknown = undefined;
    for (const row of data) {
      if (row[colName] !== undefined && row[colName] !== null) {
        sampleValue = row[colName];
        break;
      }
    }

    const type = inferValueType(sampleValue);
    const isNumeric = type === 'number';
    const columnUnitSummary = getColumnUnitSummary(data, colName, isNumeric);

    const format = lookupColumnFormat(
      colName,
      { columnType: type },
      columnUnitSummary
    );

    const title = formatTitle(colName, format);

    result.push({
      id: colName,
      title,
      type,
      format,
      columnUnitSummary,
    });
  }

  return result;
}

/**
 * Finds a column in columnSummary by id
 */
export function safeExtractColumn(
  column: { id: string },
  columnSummary: ColumnSummaryItem[]
): ColumnSummaryItem {
  const found = columnSummary.find((d) => d.id === column.id);
  if (!found) {
    console.warn(`Column "${column.id}" not found in column summary`);
    return {
      id: column.id,
      title: column.id,
      type: 'string',
    };
  }
  return found;
}

// ============================================================================
// Date Auto-Detection
// ============================================================================

/**
 * Standardizes a date string for reliable parsing.
 * Ported from Evidence's dateParsing.js.
 */
function standardizeDateString(date: string): string {
  let d = date;
  const dateSplit = d.split(' ');

  // If date doesn't contain timestamp, add one at midnight
  if (!d.includes(':')) {
    d = d + 'T00:00:00';
  }

  // Remove character groups beyond 2 (date and time)
  if (dateSplit.length > 2) {
    d = dateSplit[0] + ' ' + dateSplit[1];
  }

  // Remove microseconds
  d = d.replace(/\.([^\s]+)/, '');

  // Remove "Z" to avoid timezone issue
  d = d.replace('Z', '');

  // Replace spaces with "T"
  d = d.replace(' ', 'T');

  return d;
}

/**
 * Detects date-typed columns with string values and converts them to Date objects.
 * Returns a new data array with converted date columns.
 */
export function autoConvertDateColumns(
  data: Record<string, unknown>[],
  columnSummary: ColumnSummaryItem[]
): Record<string, unknown>[] {
  if (!data || data.length === 0) return data;

  // Find columns typed as 'date' but with string values (not Date objects)
  const dateCols = columnSummary
    .filter((d) => d.type === 'date' && data[0]?.[d.id] != null && !(data[0][d.id] instanceof Date))
    .map((d) => d.id);

  if (dateCols.length === 0) return data;

  return data.map((row) => {
    const newRow = { ...row };
    for (const col of dateCols) {
      const val = newRow[col];
      if (val != null && typeof val === 'string') {
        newRow[col] = new Date(standardizeDateString(val));
      }
    }
    return newRow;
  });
}

// ============================================================================
// CSV Export
// ============================================================================

/**
 * Exports table data to CSV and triggers download
 */
export function exportToCsv(
  data: Record<string, unknown>[],
  columns: string[],
  filename = 'table-data'
): void {
  if (!data || data.length === 0) return;

  const subset = data.map((row) => {
    const obj: Record<string, unknown> = {};
    for (const col of columns) {
      obj[col] = row[col];
    }
    return obj;
  });

  const headers = columns.join(',');
  const rows = subset.map((row) =>
    columns
      .map((col) => {
        const val = row[col];
        if (val === null || val === undefined) return '';
        const str = String(val);
        // Escape values containing commas, quotes, or newlines
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(',')
  );

  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
