import { FormatObject, ColumnUnitSummary, ValueType } from '../types';

/**
 * Sets custom formats
 */
export declare function setCustomFormats(formats: FormatObject[]): void;
/**
 * Gets custom formats
 */
export declare function getCustomFormats(): FormatObject[];
/**
 * Infers the value type from a value
 */
export declare function inferValueType(value: unknown): ValueType;
/**
 * Looks up a format based on column name
 */
export declare function lookupColumnFormat(columnName: string | undefined, columnInfo: {
    columnType: string;
}, columnUnitSummary: ColumnUnitSummary | undefined): FormatObject | undefined;
/**
 * Returns a format object from a format string
 */
export declare function getFormatObjectFromString(formatString: string, valueType?: ValueType): FormatObject;
/**
 * Formats a value for display
 */
export declare function formatValue(value: unknown, columnFormat?: FormatObject, columnUnitSummary?: ColumnUnitSummary): string;
/**
 * Formats a value for axis display
 */
export declare function formatAxisValue(value: unknown, columnFormat?: FormatObject, columnUnitSummary?: ColumnUnitSummary): string;
/**
 * Applies title tag replacement to column names
 */
export declare function applyTitleTagReplacement(columnName: string | undefined, columnFormatSettings: FormatObject | undefined): string;
/**
 * Formats a column title
 */
export declare function formatTitle(columnName: string, format?: FormatObject): string;
/**
 * Formats an example value using the given format
 */
export declare function formatExample(format: FormatObject & {
    userInput?: string;
    exampleInput?: unknown;
}): string;
/**
 * Shorthand formatting function - formats a value with a format tag
 */
export declare function fmt(value: unknown, formatTag?: string): string;
