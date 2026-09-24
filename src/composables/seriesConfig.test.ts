import { describe, expect, it } from 'vitest';
import { getSeriesConfig } from './useChartConfig';

// Shape of the Kellanova "Value Share 2025 vs SPLY by Country & Category" chart:
// two measures, split by a series column, so each x value has two rows.
const data = [
  { Country: 'KSA', Category: 'RTEC', vs2025: 34.2, vsSply: 33.2 },
  { Country: 'KSA', Category: 'SALTY SNACKS', vs2025: 12.2, vsSply: 13.6 },
  { Country: 'KWT', Category: 'RTEC', vs2025: 64.0, vsSply: 60.9 },
  { Country: 'KWT', Category: 'SALTY SNACKS', vs2025: 14.5, vsSply: 16.1 }
];

describe('getSeriesConfig with series and multiple y columns', () => {
  it('creates one series per (series value, y column) instead of overlapping rows', () => {
    const configs = getSeriesConfig(data, 'Country', ['vs2025', 'vsSply'], 'Category', false, {}, {});

    expect(configs.map((c) => c.name)).toEqual([
      'RTEC - vs2025',
      'SALTY SNACKS - vs2025',
      'RTEC - vsSply',
      'SALTY SNACKS - vsSply'
    ]);
    // Each series has exactly one point per country: no duplicate x values.
    for (const c of configs) {
      expect(c.data.map((p) => (p as unknown[])[0])).toEqual(['KSA', 'KWT']);
    }
    expect(configs[1].data).toEqual([['KSA', 12.2], ['KWT', 14.5]]);
  });
});
