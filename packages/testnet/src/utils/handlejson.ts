// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const readJson = <T>(path: string) => {
  return readFile(path, "utf8").then((data) => JSON.parse(data) as T);
};

export const writeJson = async (path: string, data: {}) => {
  await mkdir(join(path, "../"), { recursive: true });
  return writeFile(path, JSON.stringify(data));
};

export const updateJson = async <T extends {}>(
  path: string,
  updater: (json: T) => T
) => {
  const json = (await readJson(path)) as T;

  const updated = updater(json);
  await writeJson(path, updated);
};
