/**
 * Vue 3 composable for value and axis formatting
 */

import { computed, type ComputedRef } from 'vue';
import type { FormatObject, ColumnUnitSummary, ValueType } from '../types';
import {
  formatValue as formatValueFn,
  formatAxisValue as formatAxisValueFn,
  getFormatObjectFromString,
  formatTitle as formatTitleFn,
  fmt as fmtFn,
  setCustomFormats,
  getCustomFormats,
  lookupColumnFormat,
  applyTitleTagReplacement,
  formatExample,
  inferValueType
} from '../utils/formatting';
import { BUILT_IN_FORMATS } from '../utils/builtInFormats';

export interface UseFormattingReturn {
  /**
   * Format a value for display in tooltips/labels
   */
  formatValue: (
    value: unknown,
    format?: FormatObject | string,
    columnUnitSummary?: ColumnUnitSummary
  ) => string;

  /**
   * Format a value for display on axes
   */
  formatAxisValue: (
    value: unknown,
    format?: FormatObject | string,
    columnUnitSummary?: ColumnUnitSummary
  ) => string;

  /**
   * Get a format object from a format string or tag
   */
  getFormat: (formatString: string, valueType?: ValueType) => FormatObject;

  /**
   * Format a column title
   */
  formatTitle: (columnName: string, format?: FormatObject) => string;

  /**
   * Convenience function to format with a format string
   */
  fmt: (value: unknown, format: string) => string;

  /**
   * Set custom formats
   */
  setCustomFormats: (formats: FormatObject[]) => void;

  /**
   * Get all custom formats
   */
  getCustomFormats: () => FormatObject[];

  /**
   * Get all built-in formats
   */
  getBuiltInFormats: () => FormatObject[];

  /**
   * Look up format based on column name
   */
  lookupColumnFormat: (
    columnName: string,
    columnType: { columnType: string },
    columnUnitSummary?: ColumnUnitSummary
  ) => FormatObject | undefined;

  /**
   * Apply title tag replacement
   */
  applyTitleTagReplacement: (columnName: string, format?: FormatObject) => string;

  /**
   * Format an example value
   */
  formatExample: (format: FormatObject & { userInput?: string }) => string;

  /**
   * Infer value type from a value
   */
  inferValueType: (value: unknown) => ValueType;
}

/**
 * Composable for formatting values and axis labels
 */
export function useFormatting(): UseFormattingReturn {
  const formatValue = (
    value: unknown,
    format?: FormatObject | string,
    columnUnitSummary?: ColumnUnitSummary
  ): string => {
    if (typeof format === 'string') {
      return formatValueFn(value, getFormatObjectFromString(format), columnUnitSummary);
    }
    return formatValueFn(value, format, columnUnitSummary);
  };

  const formatAxisValue = (
    value: unknown,
    format?: FormatObject | string,
    columnUnitSummary?: ColumnUnitSummary
  ): string => {
    if (typeof format === 'string') {
      return formatAxisValueFn(value, getFormatObjectFromString(format), columnUnitSummary);
    }
    return formatAxisValueFn(value, format, columnUnitSummary);
  };

  const getFormat = (formatString: string, valueType?: ValueType): FormatObject => {
    return getFormatObjectFromString(formatString, valueType);
  };

  const formatTitle = (columnName: string, format?: FormatObject): string => {
    return formatTitleFn(columnName, format);
  };

  const fmt = (value: unknown, format: string): string => {
    return fmtFn(value, format);
  };

  const getBuiltInFormats = (): FormatObject[] => {
    return BUILT_IN_FORMATS;
  };

  return {
    formatValue,
    formatAxisValue,
    getFormat,
    formatTitle,
    fmt,
    setCustomFormats,
    getCustomFormats,
    getBuiltInFormats,
    lookupColumnFormat,
    applyTitleTagReplacement,
    formatExample,
    inferValueType
  };
}

/**
 * Creates a computed formatter for a specific format
 */
export function useFormatter(
  formatString: string | FormatObject,
  columnUnitSummary?: ColumnUnitSummary
): {
  format: ComputedRef<FormatObject>;
  formatValue: (value: unknown) => string;
  formatAxisValue: (value: unknown) => string;
} {
  const format = computed(() => {
    if (typeof formatString === 'string') {
      return getFormatObjectFromString(formatString);
    }
    return formatString;
  });

  const formatValueComputed = (value: unknown): string => {
    return formatValueFn(value, format.value, columnUnitSummary);
  };

  const formatAxisValueComputed = (value: unknown): string => {
    return formatAxisValueFn(value, format.value, columnUnitSummary);
  };

  return {
    format,
    formatValue: formatValueComputed,
    formatAxisValue: formatAxisValueComputed
  };
}
