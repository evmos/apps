"use client";
import { useRef, useInsertionEffect, useCallback } from "react";

// The useEffectEvent hook is a shim to the upcoming official React hook with the same name
// the official one is still behind an experimental flag, but this shim mimicks the behavior for most cases
// and the cases it don't, do not affect us that much as we haven't been using things like suspense and concurrent modes (yet)
// This should be a drop in replacement for the official one once it is released

// eslint-disable-next-line @typescript-eslint/ban-types
export function useEffectEvent<T extends (...args: any[]) => unknown>(
  fn: T
): T {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []) as T;
}
