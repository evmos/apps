// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { hashString } from "../hash/hash-string";
import { readDevCache, writeDevCache } from "./dev-cache-crud";

/**
 * Caches the result of a function in development mode only.
 *
 * To clear the cache, run 'pnpm -w clear-dev-cache'
 *
 * WHY THIS EXISTS???
 *
 * communication with external apis are subject to rate limits,
 * while we usually stay well below the limits for most things in production (because request are mostly done at build time)
 * we can easly hit some of these limits in development mode.
 * Not to mention that many Next caching features are disabled in dev mode.
 * That slows down hot reload and makes development a pain.
 *
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export const devCache = <T extends Function>(
  fn: T,
  options: {
    /**
     * The cache key for the function. Can be a string or a function that generates the cache key based on the function arguments.
     * if not provided, the function name will be used
     */
    tags?: string[];
    /**
     * The cache duration in seconds.
     * @default 60 * 5 // (5 minutes)
     */
    revalidate?: number;
    /**
     * Determines whether to return the cached result while revalidating in the background.
     *
     * Disabled in test mode because vitest stops the process when the test is done, so the revalidation doesn't happen.
     */
    staleWhileRevalidate?: boolean;
  } = {},
): T => {
  if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test")
    return fn;
  let { tags = [], revalidate = 60 * 5, staleWhileRevalidate = true } = options;

  if (process.env.NODE_ENV === "test") {
    staleWhileRevalidate = false;
  }
  const req = async (...args: unknown[]) => {
    tags = [...tags];
    if (tags.length === 0 && fn.name) {
      tags.push(fn.name);
    }

    tags.push(hashString(JSON.stringify(args)));
    tags.push(hashString(fn.toString()));

    const resolvedKey = tags.join("-");
    const cached = await readDevCache(resolvedKey, revalidate);

    const fetchAndCache = async () => {
      const response = (await fn.call(null, ...args)) as unknown;

      await writeDevCache(resolvedKey, response, tags);

      return response;
    };
    if (!cached) return fetchAndCache();

    if (cached.stale) {
      if (staleWhileRevalidate) {
        // revalidate in background
        void fetchAndCache();
        return cached.data;
      }
      return fetchAndCache();
    }

    return cached.data;
  };

  return req as never;
};
