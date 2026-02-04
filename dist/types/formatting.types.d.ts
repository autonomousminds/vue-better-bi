/**
 * Formatting types for the chart system
 */
export type ValueType = 'number' | 'date' | 'boolean' | 'string';
export type FormatCategory = 'currency' | 'number' | 'percent' | 'date';
export type FormattingContext = 'axis' | 'value';
export interface AutoFormatConfig {
    autoFormatCode?: string;
    autoFormatFunction?: (typedValue: unknown, columnFormat: FormatObject, columnUnitSummary?: ColumnUnitSummary) => string;
    truncateUnits?: boolean;
    columnUnits?: string;
}
export interface FormatObject {
    formatTag: string;
    formatCode: string;
    formatCategory?: FormatCategory;
    valueType?: ValueType;
    exampleInput?: number | string;
    titleTagReplacement?: string;
    parentFormat?: string;
    axisFormatCode?: string;
    _autoFormat?: AutoFormatConfig;
}
export interface ColumnUnitSummary {
    min: number;
    max: number;
    median: number;
    maxDecimals: number;
    unitType: 'number' | 'date' | 'string';
}
export interface CurrencyDefinition {
    primaryCode: string;
    currencySymbol: string;
    displayName: string;
    escapeCurrencySymbol?: boolean;
}
export interface DerivedCurrencyFormat {
    derivedSuffix: string;
    valueFormatCode: string;
    exampleInput: number;
    auto?: boolean;
    axisValueFormatCode?: string;
}
export interface ColumnSummary {
    id: string;
    title: string;
    type: 'number' | 'date' | 'string' | 'boolean';
    format?: FormatObject;
    columnUnitSummary?: ColumnUnitSummary;
}
export interface ColumnTypeDescriptor {
    columnType: 'number' | 'date' | 'string' | 'boolean';
}
