import { describe, it, expect } from 'vitest';
import { searchNeedles, matchesSearch } from './searchNeedles';

describe('searchNeedles', () => {
  it.each([
    ['Nov 20/25', '2025-11-20'],
    ['nov 20/25', '2025-11-20'],
    ['20 Nov 2025', '2025-11-20'],
    ['November 20, 2025', '2025-11-20'],
    ['2025/11/20', '2025-11-20'],
    ['11/20/2025', '2025-11-20'],
    ['Nov 2025', '2025-11-'],
    ['2025-11', '2025-11-'],
  ])('%s matches the stored form %s', (query, stored) => {
    expect(searchNeedles(query)).toContain(stored);
  });

  it('keeps both readings of an ambiguous numeric date', () => {
    const n = searchNeedles('01/02/2025');
    expect(n).toContain('2025-01-02');
    expect(n).toContain('2025-02-01');
  });

  it('drops thousands separators and lower-cases plain text', () => {
    expect(searchNeedles('1,234.5')).toContain('1234.5');
    expect(searchNeedles('  Alice ')).toEqual(['alice']);
    expect(searchNeedles('   ')).toEqual([]);
  });

  it('rejects impossible dates', () => {
    expect(searchNeedles('Feb 30/25')).toEqual(['feb 30/25']);
  });
});

describe('matchesSearch', () => {
  it('matches a displayed date against a stored ISO timestamp', () => {
    const needles = searchNeedles('Nov 20/25');
    expect(matchesSearch('2025-11-20T08:00:22.716324Z', needles)).toBe(true);
    expect(matchesSearch('2025-11-21T08:00:22.716324Z', needles)).toBe(false);
    expect(matchesSearch(null, needles)).toBe(false);
  });
});


describe('partial dates while typing', () => {
  it.each([
    ['Nov 20', '-11-20'],
    ['nov 20/2', '-11-20'],
    ['Nov 20/202', '-11-20'],
    ['20 Nov', '-11-20'],
    ['11/20', '-11-20'],
    ['20/11', '-11-20'],
  ])('%s narrows to month and day %s', (query, fragment) => {
    expect(searchNeedles(query)).toContain(fragment);
  });

  it('does not widen a complete date or accept an impossible day', () => {
    expect(searchNeedles('Nov 20/25')).not.toContain('-11-20');
    expect(searchNeedles('Nov 40')).not.toContain('-11-40');
  });
});
