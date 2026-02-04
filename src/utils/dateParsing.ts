/**
 * Date parsing utilities
 * 
 */

import type { DataRecord } from '../types';

/**
 * Parses an individual string into a standardized date string format
 */
export function standardizeDateString(date: string | unknown): string {
  if (date && typeof date === 'string') {
    let normalizedDate = date;
    const dateSplit = normalizedDate.split(' ');

    // If date doesn't contain timestamp, add one at midnight (avoids timezone interpretation issue)
    if (!normalizedDate.includes(':')) {
      normalizedDate = normalizedDate + 'T00:00:00';
    }

    // Remove any character groups beyond 2 (date and time):
    if (dateSplit.length > 2) {
      normalizedDate = dateSplit[0] + ' ' + dateSplit[1];
    }

    // Replace microseconds if needed:
    const re = /\.([^\s]+)/;
    normalizedDate = normalizedDate.replace(re, '');

    // Remove "Z" to avoid timezone interpretation issue:
    normalizedDate = normalizedDate.replace('Z', '');

    // Replace spaces with "T" to conform to ECMA standard:
    normalizedDate = normalizedDate.replace(' ', 'T');

    return normalizedDate;
  }

  return String(date);
}

/**
 * Replaces a date column's string values with JS date objects
 */
export function convertColumnToDate(
  data: DataRecord[],
  column: string
): DataRecord[] {
  return data.map((d) => ({
    ...d,
    [column]: d[column] ? new Date(standardizeDateString(d[column])) : null
  }));
}

/**
 * Replaces a date column's string values with standardized date strings
 */
export function standardizeDateColumn(
  data: DataRecord[],
  column: string
): DataRecord[] {
  return data.map((d) => ({
    ...d,
    [column]: standardizeDateString(d[column])
  }));
}
