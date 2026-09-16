import { describe, expect, it } from 'vitest';

import { kmToMile, mileToKm } from './conversions';

describe('mileToKm', () => {
  it('converts miles to kilometers', () => {
    expect(mileToKm(1)).toBe(1.609344);
    expect(mileToKm(2.5)).toBe(4.02336);
  });

  it('returns zero for zero miles', () => {
    expect(mileToKm(0)).toBe(0);
  });
});

describe('kmToMile', () => {
  it('converts kilometers to miles', () => {
    expect(kmToMile(1.609344)).toBe(1);
    expect(kmToMile(4.02336)).toBe(2.5);
  });

  it('returns zero for zero kilometers', () => {
    expect(kmToMile(0)).toBe(0);
  });
});

describe('conversion round trips', () => {
  it('converts miles to kilometers and back without changing the value', () => {
    expect(kmToMile(mileToKm(42))).toBeCloseTo(42, 12);
  });

  it('converts kilometers to miles and back without changing the value', () => {
    expect(mileToKm(kmToMile(42))).toBeCloseTo(42, 12);
  });
});
