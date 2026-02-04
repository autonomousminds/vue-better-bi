import { ComputedRef } from 'vue';
import { FormatObject, ColumnUnitSummary, ValueType } from '../types';

export interface UseFormattingReturn {
    /**
     * Format a value for display in tooltips/labels
     */
    formatValue: (value: unknown, format?: FormatObject | string, columnUnitSummary?: ColumnUnitSummary) => string;
    /**
     * Format a value for display on axes
     */
    formatAxisValue: (value: unknown, format?: FormatObject | string, columnUnitSummary?: ColumnUnitSummary) => string;
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
    lookupColumnFormat: (columnName: string, columnType: {
        columnType: string;
    }, columnUnitSummary?: ColumnUnitSummary) => FormatObject | undefined;
    /**
     * Apply title tag replacement
     */
    applyTitleTagReplacement: (columnName: string, format?: FormatObject) => string;
    /**
     * Format an example value
     */
    formatExample: (format: FormatObject & {
        userInput?: string;
    }) => string;
    /**
     * Infer value type from a value
     */
    inferValueType: (value: unknown) => ValueType;
}
/**
 * Composable for formatting values and axis labels
 */
export declare function useFormatting(): UseFormattingReturn;
/**
 * Creates a computed formatter for a specific format
 */
export declare function useFormatter(formatString: string | FormatObject, columnUnitSummary?: ColumnUnitSummary): {
    format: ComputedRef<FormatObject>;
    formatValue: (value: unknown) => string;
    formatAxisValue: (value: unknown) => string;
};
