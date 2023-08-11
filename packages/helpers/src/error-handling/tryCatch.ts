import { normalizeError } from "./normalizeError";

export const tryCatch = async <T>(fn: (() => T) | (() => Promise<T>)) => {
  try {
    return [null, await fn()] as const;
  } catch (error) {
    console.error(error);
    return [normalizeError(error), null] as const;
  }
};
