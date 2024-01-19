// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { readFile, writeFile, mkdir, rm, readdir } from "fs/promises";
import path from "path";
import { E } from "../error-handling";
import { Log } from "helpers/src/logger";
import { cacheDir } from "./constants";

const notDevWarning = () => {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NODE_ENV !== "test"
  ) {
    throw new Error(
      "Dev Cache functions should not be used in production environments",
    );
  }
};
type CacheEntry<T = unknown> = {
  tags: string[];
  cacheDate: number;
  cacheKey: string;
  data: T;
};

export const writeDevCache = async (
  key: string,
  data: unknown,
  tags: string[],
) => {
  notDevWarning();
  await mkdir(cacheDir, { recursive: true });
  Log("dev-cache-mode").info(
    `Response cached for key '${key}'`,
    `\ncacheDir: ${cacheDir}`,
  );
  return await writeFile(
    path.join(cacheDir, key),
    JSON.stringify({
      tags,
      cacheDate: Date.now(),
      cacheKey: key,
      data,
    }),
  );
};

export const readDevCache = async <T = unknown>(
  key: string,
  revalidate = 3600,
) => {
  notDevWarning();
  const [err, cached] = await E.try(
    () =>
      readFile(path.join(cacheDir, key), "utf8").then(JSON.parse) as Promise<
        CacheEntry<T>
      >,
  );
  if (err) return null;
  return {
    stale: Date.now() - cached.cacheDate > revalidate * 1000,
    ...cached,
  };
};

export const clearDevCache = async () => {
  notDevWarning();
  const [err, res] = await E.try(() => readdir(cacheDir));
  Log("dev-cache-mode").info(`Clearing dev cache`, `\ncacheDir: ${cacheDir}`);
  if (err) {
    Log("dev-cache-mode").info(`Nothing to clear`);
    return;
  }
  await rm(cacheDir, { recursive: true });
  Log("dev-cache-mode").info(`Cleared ${res.length} entries`);
};

export const readCacheEntries = async () => {
  notDevWarning();
  const [err, res] = await E.try(() => readdir(cacheDir));

  if (err) {
    return [];
  }
  const entries = await Promise.all(
    res.map(
      (entry) =>
        readFile(path.join(cacheDir, entry), "utf8").then(
          JSON.parse,
        ) as Promise<CacheEntry<unknown>>,
    ),
  );
  return entries;
};
