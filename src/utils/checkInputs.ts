/**
 * Validate that data is well-formed and required columns exist.
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function checkInputs(
  data: any,
  requiredColumns: (string | undefined)[],
  optionalColumns?: (string | undefined)[]
): ValidationResult {
  if (data === undefined || data === null) {
    return { valid: false, error: 'No data provided' };
  }

  if (typeof data !== 'object' || !Array.isArray(data)) {
    return { valid: false, error: `Expected data to be an array, got ${typeof data}` };
  }

  if (data.length === 0) {
    return { valid: false, error: 'Dataset is empty' };
  }

  const dataKeys = Object.keys(data[0]);

  const required = requiredColumns.filter((c): c is string => c != null && c !== '');
  for (const col of required) {
    if (!dataKeys.includes(col)) {
      return {
        valid: false,
        error: `Column "${col}" not found in data. Available columns: ${dataKeys.join(', ')}`
      };
    }
  }

  if (optionalColumns) {
    const optional = optionalColumns.filter((c): c is string => c != null && c !== '');
    for (const col of optional) {
      if (!dataKeys.includes(col)) {
        return {
          valid: false,
          error: `Column "${col}" not found in data. Available columns: ${dataKeys.join(', ')}`
        };
      }
    }
  }

  return { valid: true };
}
