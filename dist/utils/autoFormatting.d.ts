import { FormatObject, ColumnUnitSummary, ColumnTypeDescriptor } from '../types';

export declare const AUTO_FORMAT_CODE = "auto";
/**
 * Applies column units to a value
 */
export declare function applyColumnUnits(value: number | undefined, unit: string): number | undefined;
/**
 * Configures auto formatting on a format object
 */
export declare function configureAutoFormatting(format: FormatObject, formatCode?: string, truncateUnits?: boolean): FormatObject;
/**
 * Checks if a format is an auto format
 */
export declare function isAutoFormat(format: FormatObject, effectiveCode?: string): boolean;
/**
 * Generates an implicit number format based on column statistics
 */
export declare function generateImplicitNumberFormat(columnUnitSummary: ColumnUnitSummary | undefined, maxDisplayDecimals?: number): FormatObject;
/**
 * Finds an implicit auto format based on column name and type
 */
export declare function findImplicitAutoFormat(columnName: string, columnTypeDescriptor: ColumnTypeDescriptor | undefined, columnUnitSummary: ColumnUnitSummary | undefined): FormatObject | undefined;
/**
 * Formats a value using auto formatting logic
 */
export declare function autoFormat(typedValue: unknown, columnFormat: FormatObject, columnUnitSummary?: ColumnUnitSummary): string;
/**
 * Fallback formatting for values without format settings
 */
export declare function fallbackFormat(typedValue: unknown): string;
/**
 * Computes the number format code for a given reference value
 */
export declare function computeNumberAutoFormatCode(referenceValue: number, maxDisplayDecimals?: number, significantDigits?: number): string;
