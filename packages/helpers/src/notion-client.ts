import "server-only";
import { Client } from "@notionhq/client";
import path from "path";
import { sha256 } from "@noble/hashes/sha256";
import fs from "fs/promises";
import { E, Log } from "helpers";
import { cache } from "react";

const cacheDir = path.join(process.cwd(), ".notion-cache");
const cacheTime = 1000 * 30; // 30 seconds
const logger = Log("notion");

const revalidate = async (
  cacheKey: string,
  fetcher: () => Promise<Response>
) => {
  const response = await fetcher();
  const cachePath = path.join(cacheDir, cacheKey);
  await E.try(() => fs.mkdir(path.dirname(cachePath), { recursive: true }));
  await fs.writeFile(
    cachePath,
    JSON.stringify({
      content: await response.clone().text(),
      timestamp: Date.now(),
    })
  );

  return response;
};

const readCache = cache(async (key: string) => {
  const fileCachePath = path.join(cacheDir, key);

  const cached = await fs.readFile(fileCachePath, "utf-8");
  const parsed = JSON.parse(cached) as unknown;
  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("content" in parsed) ||
    !("timestamp" in parsed)
  ) {
    throw new Error("Invalid cache");
  }
  const { content, timestamp } = parsed;
  if (typeof content !== "string" || typeof timestamp !== "number") {
    throw new Error("Invalid cache");
  }
  const isStale = Date.now() - timestamp > cacheTime;
  logger.info(
    [
      "---",
      "Notion cache:",
      `Cache: ${isStale ? "STALE" : "HIT"}`,
      `Cache File: ${key}`,
      "",
      key,
      "---",
    ].join("\n")
  );
  return {
    content,
    timestamp,
    isStale,
  };
});
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch:
    process.env.NODE_ENV !== "development"
      ? fetch
      : cache(async (...args: Parameters<typeof fetch>) => {
          if (process.env.NODE_ENV !== "development") return fetch(...args);

          const key = [
            `Method ${args[1]?.method}`,
            `URL: ${String(args[0])}`,
            `Body ${String(args[1]?.body)}`,
          ].join("\n");
          const hashedKey = Buffer.from(sha256(key)).toString("hex");

          const [, cachedResponse] = await E.try(() => readCache(hashedKey));

          if (!cachedResponse) {
            return await revalidate(hashedKey, () => fetch(...args));
          }

          if (cachedResponse.isStale)
            /**
             * We don't want to wait for revalidation to finish. Let's use the current cached value until the new one is ready.
             * This could cause some race conditions in case we have multiple hot reload requests at the same time, but a hard refresh should fix it,
             * so it should be fine for dev mode
             *
             * works in a similar way to stale-while-revalidate strategy
             */
            void revalidate(hashedKey, () => fetch(...args));

          return new Response(cachedResponse.content, {
            status: 200,

            headers: {
              "Content-Type": "application/json",
            },
          });
        }),
});
