const KILOMETERS_PER_MILE = 1.609344;

/** Convert miles to kilometers. */
export function mileToKm(miles: number): number {
  return miles * KILOMETERS_PER_MILE;
}

/** Convert kilometers to miles. */
export function kmToMile(kilometers: number): number {
  return kilometers / KILOMETERS_PER_MILE;
}
