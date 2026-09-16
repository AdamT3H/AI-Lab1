import { describe, expect, it } from 'vitest';

import { kmToMile, mileToKm } from './distance';

describe('mileToKm', () => {
  it('converts miles to kilometers using the standard conversion factor', () => {
    expect(mileToKm(1)).toBe(1.609344);
    expect(mileToKm(5)).toBe(8.04672);
  });

  it('handles zero and negative distances', () => {
    expect(mileToKm(0)).toBe(0);
    expect(mileToKm(-2)).toBe(-3.218688);
  });
});

describe('kmToMile', () => {
  it('converts kilometers to miles using the standard conversion factor', () => {
    expect(kmToMile(1.609344)).toBe(1);
    expect(kmToMile(8.04672)).toBe(5);
  });

  it('handles zero and negative distances', () => {
    expect(kmToMile(0)).toBe(0);
    expect(kmToMile(-3.218688)).toBe(-2);
  });
});
