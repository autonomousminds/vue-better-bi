/**
 * Core formatting utilities
 */

import ssf from 'ssf';
import type { FormatObject, ColumnUnitSummary, ValueType } from '../types';
import { BUILT_IN_FORMATS } from './builtInFormats';
import { findImplicitAutoFormat, autoFormat, isAutoFormat } from './autoFormatting';
import { standardizeDateString } from './dateParsing';

const AXIS_FORMATTING_CONTEXT = 'axis';
const VALUE_FORMATTING_CONTEXT = 'value';

// Custom formats storage
let customFormats: FormatObject[] = [];

/**
 * Sets custom formats
 */
export function setCustomFormats(formats: FormatObject[]): void {
  customFormats = formats;
}

/**
 * Gets custom formats
 */
export function getCustomFormats(): FormatObject[] {
  return customFormats;
}

/**
 * Infers the value type from a value
 */
export function inferValueType(value: unknown): ValueType {
  if (value === null || value === undefined) {
    return 'string';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  if (value instanceof Date) {
    return 'date';
  }
  if (typeof value === 'string') {
    // Check if it looks like a date
    const dateAttempt = new Date(value);
    if (!isNaN(dateAttempt.getTime()) && value.match(/\d{4}-\d{2}-\d{2}/)) {
      return 'date';
    }
  }
  return 'string';
}

/**
 * Extracts a format tag from a column name if it follows the pattern column_formatTag
 */
function maybeExtractFormatTag(columnName: string | undefined): string | undefined {
  if (!columnName) return undefined;

  const lastUnderscore = columnName.lastIndexOf('_');
  if (lastUnderscore > 0) {
    return columnName.substring(lastUnderscore + 1);
  }
  return undefined;
}

/**
 * Looks up a format based on column name
 */
export function lookupColumnFormat(
  columnName: string | undefined,
  columnInfo: { columnType: string },
  columnUnitSummary: ColumnUnitSummary | undefined
): FormatObject | undefined {
  const potentialFormatTag = maybeExtractFormatTag(columnName);

  if (columnInfo.columnType === 'string') {
    return undefined;
  }

  if (potentialFormatTag) {
    const matchingFormat = BUILT_IN_FORMATS.find(
      (format) => format.formatTag?.toLowerCase() === potentialFormatTag?.toLowerCase()
    );
    if (matchingFormat) {
      return matchingFormat;
    }
  }

  const matchingImplicitAutoFormat = findImplicitAutoFormat(
    columnName ?? '',
    { columnType: columnInfo.columnType as 'number' | 'date' | 'string' | 'boolean' },
    columnUnitSummary
  );
  if (matchingImplicitAutoFormat) {
    return matchingImplicitAutoFormat;
  }

  return undefined;
}

/**
 * Returns a format object from a format string
 */
export function getFormatObjectFromString(
  formatString: string,
  valueType?: ValueType
): FormatObject {
  const potentialFormatTag = formatString;
  const matchingFormat = BUILT_IN_FORMATS.find(
    (format) => format.formatTag?.toLowerCase() === potentialFormatTag?.toLowerCase()
  );

  if (matchingFormat) {
    return matchingFormat;
  }

  const newFormat: FormatObject = {
    formatTag: 'custom',
    formatCode: potentialFormatTag
  };

  if (valueType) {
    newFormat.valueType = valueType;
  }

  return newFormat;
}

/**
 * Gets the effective formatting code based on context
 */
function getEffectiveFormattingCode(
  columnFormat: FormatObject,
  formattingContext: string
): string | undefined {
  if (formattingContext === AXIS_FORMATTING_CONTEXT && columnFormat.axisFormatCode) {
    return columnFormat.axisFormatCode;
  }
  return columnFormat.formatCode;
}

/**
 * Formats a value for display
 */
export function formatValue(
  value: unknown,
  columnFormat?: FormatObject,
  columnUnitSummary?: ColumnUnitSummary
): string {
  try {
    return applyFormatting(value, columnFormat, columnUnitSummary, VALUE_FORMATTING_CONTEXT);
  } catch (error) {
    console.warn(`Unexpected error in formatValue: ${error}`);
    return String(value);
  }
}

/**
 * Formats a value for axis display
 */
export function formatAxisValue(
  value: unknown,
  columnFormat?: FormatObject,
  columnUnitSummary?: ColumnUnitSummary
): string {
  try {
    return applyFormatting(value, columnFormat, columnUnitSummary, AXIS_FORMATTING_CONTEXT);
  } catch (error) {
    return String(value);
  }
}

/**
 * Applies title tag replacement to column names
 */
export function applyTitleTagReplacement(
  columnName: string | undefined,
  columnFormatSettings: FormatObject | undefined
): string {
  let result = columnName || '';

  if (columnName && columnFormatSettings?.formatTag) {
    const lastIndexOfTag = columnName
      .toLowerCase()
      .lastIndexOf(`_${columnFormatSettings.formatTag.toLowerCase()}`);

    let titleTagReplacement = '';
    if (lastIndexOfTag > 0) {
      if (typeof columnFormatSettings?.titleTagReplacement === 'string') {
        titleTagReplacement = columnFormatSettings.titleTagReplacement;
      }
      result = columnName.substring(0, lastIndexOfTag) + titleTagReplacement;
    }
  }

  return result;
}

/**
 * Formats a column title
 */
export function formatTitle(
  columnName: string,
  format?: FormatObject
): string {
  let title = applyTitleTagReplacement(columnName, format);

  // Convert snake_case and camelCase to Title Case
  title = title
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return title;
}

/**
 * Core formatting function
 */
function applyFormatting(
  value: unknown,
  columnFormat?: FormatObject,
  columnUnitSummary?: ColumnUnitSummary,
  formattingContext: string = VALUE_FORMATTING_CONTEXT
): string {
  if (value === undefined || value === null) {
    return '-';
  }

  if (columnFormat) {
    try {
      const formattingCode = getEffectiveFormattingCode(columnFormat, formattingContext);
      let typedValue: unknown;

      try {
        if (columnFormat.valueType === 'date' && typeof value === 'string') {
          typedValue = new Date(standardizeDateString(value));
        } else if (value instanceof Date) {
          typedValue = new Date(value.toISOString().slice(0, -1));
        } else if (
          columnFormat.valueType === 'number' &&
          typeof value !== 'number' &&
          !Number.isNaN(value)
        ) {
          typedValue = Number(value);
        } else {
          typedValue = value;
        }
      } catch {
        typedValue = value;
      }

      if (isAutoFormat(columnFormat, formattingCode)) {
        try {
          return autoFormat(typedValue as number, columnFormat, columnUnitSummary);
        } catch (error) {
          console.warn(`Unexpected error applying auto formatting: ${error}`);
        }
      } else if (formattingCode) {
        try {
          return ssf.format(formattingCode, typedValue);
        } catch (error) {
          console.warn(`Unexpected error applying ssf formatting: ${error}`);
        }
      }
    } catch (error) {
      console.warn(`Unexpected error in applyFormatting: ${error}`);
    }
  }

  // Fallback formatting
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return value.toLocaleString();
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return String(value);
}

/**
 * Default example values for format preview
 */
function defaultExample(valueType: ValueType | undefined): unknown {
  switch (valueType) {
    case 'number':
      return 1234;
    case 'date':
      return '2022-01-03';
    default:
      return undefined;
  }
}

/**
 * Formats an example value using the given format
 */
export function formatExample(format: FormatObject & { userInput?: string; exampleInput?: unknown }): string {
  const normalizedUserInput = format.userInput?.trim();
  const preFormattedValue = normalizedUserInput || format.exampleInput || defaultExample(format.valueType);

  if (preFormattedValue) {
    try {
      let columnUnitSummary: ColumnUnitSummary | undefined;
      if (format.valueType === 'number') {
        const numericValue = Number(preFormattedValue);
        columnUnitSummary = {
          min: numericValue,
          max: numericValue,
          median: numericValue,
          maxDecimals: numericValue.toString().split('.')[1]?.length || 0,
          unitType: 'number'
        };
      }
      return applyFormatting(preFormattedValue, format, columnUnitSummary, VALUE_FORMATTING_CONTEXT);
    } catch {
      // Return empty on error
    }
  }
  return '';
}

/**
 * Shorthand formatting function - formats a value with a format tag
 */
export function fmt(value: unknown, formatTag?: string): string {
  if (formatTag) {
    const format = getFormatObjectFromString(formatTag);
    return formatValue(value, format);
  }
  return formatValue(value);
}
