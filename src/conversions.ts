const KILOMETERS_PER_MILE = 1.609344;

/** Converts a distance in miles to kilometers. */
export function mileToKm(miles: number): number {
  return miles * KILOMETERS_PER_MILE;
}

/** Converts a distance in kilometers to miles. */
export function kmToMile(kilometers: number): number {
  return kilometers / KILOMETERS_PER_MILE;
}
