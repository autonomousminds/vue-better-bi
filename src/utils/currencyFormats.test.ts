import { describe, expect, it } from 'vitest';
import { fmt, getFormatObjectFromString } from './formatting';
import { SUPPORTED_CURRENCIES } from './builtInFormats';

describe('currency formats', () => {
  it('formats ISO currencies by code instead of falling through to ssf', () => {
    expect(fmt(587764.56, 'sar0')).toBe('SAR 587,765');
    expect(fmt(64301.12, 'aed1k')).toBe('AED 64.3k');
    expect(fmt(4564301.12, 'kwd2m')).toBe('KWD 4.56M');
  });

  it('keeps symbol-based formatting for the original currencies', () => {
    expect(fmt(7043.123, 'usd0')).toBe('$7,043');
    expect(fmt(7043.123, 'gbp2')).toBe('£7,043.12');
  });

  it('resolves tags case-insensitively', () => {
    expect(getFormatObjectFromString('SAR0').formatTag).toBe('sar0');
  });

  it('has no duplicate currency codes', () => {
    const codes = SUPPORTED_CURRENCIES.map((c) => c.primaryCode);
    expect(new Set(codes).size).toBe(codes.length);
  });
});
