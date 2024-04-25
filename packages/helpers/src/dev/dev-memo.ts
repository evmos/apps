// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { readDevCache, writeDevCache } from "./dev-cache-crud";
import { hashString } from "../hash/hash-string";

import { Log } from "helpers/src/logger";
import SuperJSON from "superjson";
import round from "lodash-es/round";
const logger = Log("dev-cache-memo");

const stdoutRgb = (r: number, g: number, b: number) => {
  const open = `\x1b[38;2;${~~r};${~~g};${~~b}m`;
  const reset = "\x1b[0m";
  return (text: string) => `${open}${text}${reset}`;
};

const green = stdoutRgb(13, 188, 121);
const darkYellow = stdoutRgb(193, 156, 0);

export const devMemo = <T extends Function>(
  fn: T,
  { tags = [] as string[], revalidate = 60 * 5 } = {},
): T => {
  if (process.env.ENABLE_DEV_CACHE !== "true" || process.env.NODE_ENV === "production") return fn;
  const fnHash = hashString(fn.toString());
  const keys = [...tags];
  if (fn.name) {
    keys.push(fn.name);
  }
  keys.push(fnHash);
  const fn_ = async (...args: unknown[]) => {
    const argsHash = hashString(SuperJSON.stringify(args));
    const cacheKey = [...keys, argsHash].join("-");
    const now = performance.now();
    const cached = await readDevCache(cacheKey, revalidate);
    if (!cached || cached.stale) {
      const response = (await fn(...args)) as unknown;
      await writeDevCache(cacheKey, response, keys);
      const time = `${round(performance.now() - now, 2)}ms`;

      logger.info(
        "Dev cache:",
        cacheKey,
        cached?.stale
          ? darkYellow(`(cache stale, ${time})`)
          : darkYellow(`(cache miss, ${time})`),
      );
      return response;
    }
    logger.info(
      "Dev Cache:",
      cacheKey,
      green(`(cache hit, ${round(performance.now() - now, 2)}ms)`),
    );
    return cached.data;
  };
  return fn_ as never;
};
