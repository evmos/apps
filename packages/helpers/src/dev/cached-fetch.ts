// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { tryCatch } from "../error-handling";
import { readDevCache, writeDevCache } from "./dev-cache-crud";
import { get, snakeCase } from "lodash-es";
import { hashString } from "../hash/hash-string";
import { Log } from "..";

// Custom header used for identifying cache status in the response
const cacheHeader = "evmos-dev-cache";

/**
 * Serialize HTTP headers into a key-value object.
 * @param {Headers} headers - The Headers object to serialize.
 * @returns {Record<string, string>} An object representing the headers.
 */
const serializeHeaders = (headers: Headers) => {
  const obj = new Map<string, string>();
  headers.forEach((v: string, k: string) => {
    obj.set(k, v);
  });
  return Object.fromEntries(obj);
};

const encodeBuffer = (buffer: ArrayBuffer) =>
  Buffer.from(buffer).toString("base64");

const decodeBuffer = (buffer: string) => Buffer.from(buffer, "base64");
const normalizeFetchParams = (input: RequestInfo | URL, init?: RequestInit) =>
  new Request(input, init);
/**
 * Enhanced fetch function with caching for development and test environments.
 * Caches the results of HTTP requests to improve performance during development.
 *
 * @param {RequestInfo | URL} input - The resource URL or RequestInfo object.
 * @param {RequestInit & { devCache?: { revalidate?: number; tags?: string[]; }}} [init] - Custom fetch options with optional cache settings.
 * @returns {Promise<Response>} A promise that resolves to the Response object.
 */

export type CachedRequestInit = RequestInit &
  (
    | {
      devCache?: {
        revalidate?: number;
        tags?: string[];
      };
    }
    | { revalidate?: number; tags?: string[] }
  );
export const cachedFetch = async (
  input: RequestInfo | URL,
  init?: CachedRequestInit,
) => {
  // Bypass caching in non-development environments
  if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test")
    return fetch(input, init);
  const devCache = get(init, "devCache", init) as { revalidate?: number; tags?: string[]}

  const request = normalizeFetchParams(input, init);

  const url = new URL(request.url);

  // Generate cache tags based on URL, HTTP method, and additional provided tags
  const bodyStream = request.clone().body;
  let body = "";
  if (bodyStream) {
    const reader = bodyStream.getReader();
    const decoder = new TextDecoder("utf-8", {});

    let done = false;
    while (!done) {
      const { value, done: doneValue } = await reader.read();
      body += decoder.decode(value, { stream: true });
      done = doneValue;
    }
  }

  const cacheTags = [
    snakeCase(url.host),
    request.method.toUpperCase(),
    body,
    ...(devCache?.tags ?? []),
  ];

  // Add a hash of the URL to the cache tags for uniqueness
  cacheTags.push(hashString(url.toString()));
  const cacheKey = cacheTags.join("-");

  // Attempt to read from cache
  const cached = await readDevCache<{
    url: string;
    method: string;
    statusText: string;
    headers: Record<string, string>;
    status: number;
    response: string;
    storeFormat: "string" | "buffer";
  }>(cacheKey, devCache?.revalidate);

  // Function to perform a fetch request and update cache
  const req = async () => {
    Log("dev-cache-mode").info("Dev Cache MISS:", url.toString());
    const response = await fetch(request);

    // Set custom header to indicate cache miss
    if (!response.ok || response.status < 200 || response.status >= 300) {
      return response;
    }
    const serializedHeaders = serializeHeaders(response.headers);

    // Convert response to text and handle any errors
    const [err, serializedResponse] = await tryCatch(async () => {
      if (serializedHeaders["content-type"]?.startsWith("image/")) {
        return {
          response: encodeBuffer(await response.clone().arrayBuffer()),
          storeFormat: "buffer",
        } as const;
      }
      return {
        response: await response.clone().text(),
        storeFormat: "string",
      } as const;
    });

    if (err) {
      return response;
    }

    // Write response to cache
    await writeDevCache(
      cacheKey,
      {
        url: url.toString(),
        method: request.method,
        headers: serializeHeaders(response.headers),
        statusText: response.statusText,
        status: response.status,
        ...serializedResponse,
      },
      cacheTags,
    );
    return response;
  };

  // Return cached response or perform a request if cache is missing/stale
  if (!cached) {
    return req();
  }

  // Create a response from the cached data
  const response = new Response(
    cached.data.storeFormat === "buffer"
      ? decodeBuffer(cached.data.response)
      : cached.data.response,
    {
      statusText: cached.data.statusText,
      status: cached.data.status,
      headers: cached.data.headers,
    },
  );

  // Handle stale cache by making a new request in the background
  if (cached.stale) {
    response.headers.set(cacheHeader, "STALE");
    void req();
  } else {
    // Indicate a cache hit with a custom header
    response.headers.set(cacheHeader, "HIT");
    Log("dev-cache-mode").info("Dev Cache HIT:", url.toString());
  }

  return response;
};
