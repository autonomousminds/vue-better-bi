import { DataRecord } from '../types';

/**
 * Parses an individual string into a standardized date string format
 */
export declare function standardizeDateString(date: string | unknown): string;
/**
 * Replaces a date column's string values with JS date objects
 */
export declare function convertColumnToDate(data: DataRecord[], column: string): DataRecord[];
/**
 * Replaces a date column's string values with standardized date strings
 */
export declare function standardizeDateColumn(data: DataRecord[], column: string): DataRecord[];
