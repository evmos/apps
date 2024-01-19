// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export function max(a: bigint, b: bigint): bigint;
export function max(a: number, b: number): number;
export function max(a: number | bigint, b: number | bigint): number | bigint {
  return a > b ? a : b;
}
function min(a: bigint, b: bigint): bigint;
function min(a: number, b: number): number;
function min(a: number | bigint, b: number | bigint): number | bigint {
  return a < b ? a : b;
}

export function clamp(value: bigint, min: number, max: number): bigint;
export function clamp(value: bigint, min: bigint, max?: bigint | null): bigint;
export function clamp(value: number, min: number, max: number): number;
export function clamp(
  value: number | bigint,
  start: number | bigint,
  end: number | bigint | null = Infinity
): number | bigint {
  if (end === null || end === Infinity || typeof end === "undefined")
    return max(value as never, start as never);
  return max(min(value as never, end as never), start as never);
}

/**
 * Disclaimer: This is not intended to be a precise way of multiplying bigints
 * It was also not tested in cases that requires high precision
 * It's intended to be used in cases where we need rough estimations, like gas limits prices and fees,
 * where we may have to deal with floating numbers
 *
 * If you need precise calculation, we may need to either expand this or find a library that handles that
 */
export function multiply(
  a: bigint,
  b: bigint | number | string,
  precision = 18
) {
  try {
    return a * BigInt(b);
  } catch (e) {
    // if it throws, its probably a float
    const precisionMultiplier = 10 ** precision;
    return (
      (a * BigInt(Math.round(Number(b) * precisionMultiplier))) /
      BigInt(precisionMultiplier)
    );
  }
}
