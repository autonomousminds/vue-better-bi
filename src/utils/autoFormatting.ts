/**
 * Auto-formatting utilities
 * 
 */

import ssf from 'ssf';
import type {
  FormatObject,
  ColumnUnitSummary,
  ColumnTypeDescriptor
} from '../types';

export const AUTO_FORMAT_CODE = 'auto';

/**
 * The number of units to display the median value in the series
 */
const AUTO_FORMAT_MEDIAN_PRECISION = 3;

interface ImplicitAutoFormat {
  name: string;
  description: string;
  matchingFunction: (
    columnName: string,
    columnTypeDescriptor: ColumnTypeDescriptor | undefined,
    columnUnitSummary: ColumnUnitSummary | undefined
  ) => boolean;
  format: FormatObject;
}

/**
 * Describes implicit formats for columns having a certain name pattern and a column type
 */
const IMPLICIT_COLUMN_AUTO_FORMATS: ImplicitAutoFormat[] = [
  {
    name: 'year',
    description:
      'When lowerCase(columnName)="year" with the column having numeric values will result in no formatting',
    matchingFunction: (
      columnName: string,
      columnTypeDescriptor: ColumnTypeDescriptor | undefined,
      columnUnitSummary: ColumnUnitSummary | undefined
    ) => {
      if (columnName && columnTypeDescriptor) {
        return (
          'year' === columnName.toLowerCase() &&
          (columnTypeDescriptor?.columnType === 'number' ||
            columnUnitSummary?.unitType === 'number')
        );
      }
      return false;
    },
    format: {
      formatTag: 'year',
      formatCode: AUTO_FORMAT_CODE,
      valueType: 'number',
      exampleInput: 2013,
      _autoFormat: {
        autoFormatCode: '@',
        truncateUnits: false
      }
    }
  },
  {
    name: 'id',
    description:
      'When lowerCase(columnName)="id" with the column having numeric values, then values will have no formatting',
    matchingFunction: (
      columnName: string,
      columnTypeDescriptor: ColumnTypeDescriptor | undefined,
      columnUnitSummary: ColumnUnitSummary | undefined
    ) => {
      if (columnName && columnTypeDescriptor) {
        return (
          'id' === columnName.toLowerCase() &&
          (columnTypeDescriptor?.columnType === 'number' ||
            columnUnitSummary?.unitType === 'number')
        );
      }
      return false;
    },
    format: {
      formatTag: 'id',
      formatCode: AUTO_FORMAT_CODE,
      valueType: 'number',
      exampleInput: 93120121,
      _autoFormat: {
        autoFormatFunction: (typedValue: unknown) => {
          const numValue = typedValue as number;
          if (numValue !== null && numValue !== undefined && !isNaN(numValue)) {
            return numValue.toLocaleString('fullwide', {
              useGrouping: false
            });
          } else {
            return String(numValue);
          }
        }
      }
    }
  },
  {
    name: 'defaultDate',
    description: 'Formatting for Default Date',
    matchingFunction: (
      _columnName: string,
      columnTypeDescriptor: ColumnTypeDescriptor | undefined,
      columnUnitSummary: ColumnUnitSummary | undefined
    ) => {
      if (columnTypeDescriptor) {
        return (
          columnTypeDescriptor?.columnType === 'date' ||
          columnUnitSummary?.unitType === 'date'
        );
      }
      return false;
    },
    format: {
      formatTag: 'defaultDate',
      formatCode: AUTO_FORMAT_CODE,
      valueType: 'date',
      exampleInput: 'Sat Jan 01 2022 03:15:00 GMT-0500',
      _autoFormat: {
        autoFormatCode: 'YYYY-MM-DD',
        truncateUnits: false
      }
    }
  }
];

/**
 * Applies column units to a value
 */
export function applyColumnUnits(
  value: number | undefined,
  unit: string
): number | undefined {
  switch (unit) {
    case 'T':
      return value !== undefined ? value / 1000000000000 : undefined;
    case 'B':
      return value !== undefined ? value / 1000000000 : undefined;
    case 'M':
      return value !== undefined ? value / 1000000 : undefined;
    case 'k':
      return value !== undefined ? value / 1000 : undefined;
    default:
      return value;
  }
}

/**
 * Configures auto formatting on a format object
 */
export function configureAutoFormatting(
  format: FormatObject,
  formatCode: string = '@',
  truncateUnits: boolean = false
): FormatObject {
  format._autoFormat = {
    autoFormatCode: formatCode,
    truncateUnits: truncateUnits
  };
  return format;
}

/**
 * Checks if a format is an auto format
 */
export function isAutoFormat(
  format: FormatObject,
  effectiveCode?: string
): boolean {
  const matchesCode =
    (effectiveCode || format.formatCode)?.toLowerCase() === AUTO_FORMAT_CODE;
  const autoFormatCode =
    format._autoFormat?.autoFormatFunction || format._autoFormat?.autoFormatCode;
  if (matchesCode && autoFormatCode !== undefined) {
    return true;
  }
  return false;
}

/**
 * Generates an implicit number format based on column statistics
 */
export function generateImplicitNumberFormat(
  columnUnitSummary: ColumnUnitSummary | undefined,
  maxDisplayDecimals: number = 7
): FormatObject {
  let effectiveFormatCode: string;
  let columnUnits = '';

  const median = columnUnitSummary?.median;
  let truncateUnits: boolean;

  if (median !== undefined) {
    let medianInUnitTerms: number;
    columnUnits = getAutoColumnUnit(median);
    if (columnUnits) {
      medianInUnitTerms = applyColumnUnits(median, columnUnits) as number;
      truncateUnits = true;
    } else {
      medianInUnitTerms = median;
      truncateUnits = false;
    }

    if (columnUnitSummary?.maxDecimals === 0 && !truncateUnits) {
      effectiveFormatCode = '#,##0';
    } else {
      effectiveFormatCode = computeNumberAutoFormatCode(
        medianInUnitTerms,
        maxDisplayDecimals
      );
    }
  } else {
    effectiveFormatCode = '#,##0';
    truncateUnits = false;
  }

  return {
    formatTag: 'auto',
    formatCode: AUTO_FORMAT_CODE,
    valueType: 'number',
    _autoFormat: {
      autoFormatCode: effectiveFormatCode,
      truncateUnits: truncateUnits,
      columnUnits: columnUnits
    }
  };
}

/**
 * Finds an implicit auto format based on column name and type
 */
export function findImplicitAutoFormat(
  columnName: string,
  columnTypeDescriptor: ColumnTypeDescriptor | undefined,
  columnUnitSummary: ColumnUnitSummary | undefined
): FormatObject | undefined {
  const matched = IMPLICIT_COLUMN_AUTO_FORMATS.find((implicitFormat) =>
    implicitFormat.matchingFunction(columnName, columnTypeDescriptor, columnUnitSummary)
  );
  if (matched) {
    return matched.format;
  } else {
    if (columnUnitSummary?.unitType === 'number') {
      return generateImplicitNumberFormat(columnUnitSummary);
    }
  }
  return undefined;
}

/**
 * Formats a value using auto formatting logic
 */
export function autoFormat(
  typedValue: unknown,
  columnFormat: FormatObject,
  columnUnitSummary?: ColumnUnitSummary
): string {
  if (columnFormat._autoFormat?.autoFormatFunction) {
    return columnFormat._autoFormat.autoFormatFunction(
      typedValue,
      columnFormat,
      columnUnitSummary
    );
  } else if (columnFormat._autoFormat?.autoFormatCode) {
    const autoFormatCode = columnFormat._autoFormat.autoFormatCode;
    const valueType = columnFormat.valueType;

    if (valueType === 'number') {
      const truncateUnits = columnFormat._autoFormat.truncateUnits;

      let unitValue = typedValue as number;
      let unit = '';

      if (truncateUnits && columnUnitSummary?.median !== undefined) {
        unit = getAutoColumnUnit(columnUnitSummary.median);
        unitValue = applyColumnUnits(typedValue as number, unit) as number;
      }
      return ssf.format(autoFormatCode, unitValue) + unit;
    } else {
      return ssf.format(autoFormatCode, typedValue as number);
    }
  } else {
    console.warn('autoFormat called without a formatCode or function');
  }
  return String(typedValue);
}

/**
 * Fallback formatting for values without format settings
 */
export function fallbackFormat(typedValue: unknown): string {
  if (typeof typedValue === 'number') {
    return typedValue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  } else if (typedValue !== undefined && typedValue !== null) {
    return String(typedValue);
  } else {
    return '-';
  }
}

/**
 * Computes the number format code for a given reference value
 */
export function computeNumberAutoFormatCode(
  referenceValue: number,
  maxDisplayDecimals: number = 7,
  significantDigits: number = AUTO_FORMAT_MEDIAN_PRECISION
): string {
  let formatCodeBuilder = '#,##0';

  const referenceValueLeadingDigitExponent = base10Exponent(referenceValue);
  let displayDecimals = 0;

  if (referenceValueLeadingDigitExponent - significantDigits < 0) {
    displayDecimals = Math.min(
      Math.max(
        Math.abs(referenceValueLeadingDigitExponent - significantDigits + 1),
        0
      ),
      maxDisplayDecimals
    );
  }

  if (displayDecimals > 0) {
    formatCodeBuilder += '.';
    formatCodeBuilder += '0'.repeat(displayDecimals);
  }

  return formatCodeBuilder;
}

/**
 * Gets the appropriate unit (B, M, k or '') for the given value
 */
function getAutoColumnUnit(value: number): string {
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 5000000000000) {
    return 'T';
  } else if (absoluteValue >= 5000000000) {
    return 'B';
  } else if (absoluteValue >= 5000000) {
    return 'M';
  } else if (absoluteValue >= 5000) {
    return 'k';
  } else {
    return '';
  }
}

/**
 * Calculates the base 10 exponent of a value
 */
function base10Exponent(value: number): number {
  if (value === 0) {
    return 0;
  } else {
    return Math.floor(Math.log10(Math.abs(value)));
  }
}
