export function max(a: bigint, b: bigint): bigint;
export function max(a: number, b: number): number;
export function max(a: number | bigint, b: number | bigint): number | bigint {
  return a > b ? a : b;
}
export function min(a: bigint, b: bigint): bigint;
export function min(a: number, b: number): number;
export function min(a: number | bigint, b: number | bigint): number | bigint {
  return a < b ? a : b;
}

export function clamp(value: bigint, min: bigint, max: bigint): bigint;
export function clamp(value: number, min: number, max: number): number;
export function clamp(
  value: number | bigint,
  start: number | bigint,
  end: number | bigint
): number | bigint {
  return max(min(value as never, end as never), start as never);
}
