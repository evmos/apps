import { Log } from "../logger";
import { normalizeError } from "./normalizeError";

export function tryCatch<T extends Promise<unknown>>(
  fn: () => T
): Promise<[null, Awaited<T>] | [Error, null]>;
export function tryCatch<T>(fn: () => T): [null, T] | [Error, null];
export function tryCatch<T>(fn: () => T) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result
        .then((value) => [null, value] as const)
        .catch((error) => [normalizeError(error), null] as const);
    }
    return [null, fn()] as const;
  } catch (error) {
    Log().error(error);
    return [normalizeError(error), null] as const;
  }
}
