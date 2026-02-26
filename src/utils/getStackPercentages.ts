/**
 * Transform data for stacked100 charts.
 * Groups by x column, computes each y-value as a proportion of its group total.
 * Returns transformed data with new _pct columns and the updated column names.
 */
export function getStackPercentages(
  data: Record<string, any>[],
  x: string,
  yColumns: string[]
): { data: Record<string, any>[]; yColumns: string[] } {
  // 1. Group rows by x value
  const groups = new Map<any, Record<string, any>[]>();
  for (const row of data) {
    const key = row[x];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(row);
  }

  // 2. For each group, compute total and percentages
  const result: Record<string, any>[] = [];
  for (const [, groupRows] of groups) {
    // Sum all y columns across all rows in this group
    const groupTotal = groupRows.reduce((sum, row) => {
      return sum + yColumns.reduce((s, col) => s + (Number(row[col]) || 0), 0);
    }, 0);

    for (const row of groupRows) {
      const newRow = { ...row };
      for (const col of yColumns) {
        const val = Number(row[col]) || 0;
        newRow[col + '_pct'] = groupTotal === 0 ? 0 : val / groupTotal;
      }
      result.push(newRow);
    }
  }

  return {
    data: result,
    yColumns: yColumns.map(col => col + '_pct')
  };
}
