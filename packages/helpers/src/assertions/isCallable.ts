export function isCallable(fn: unknown): fn is (...args: unknown[]) => unknown {
  return typeof fn === "function";
}
