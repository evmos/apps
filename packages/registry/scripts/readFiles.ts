// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { glob } from "glob";
import { readFile } from "fs/promises";

export const readFiles = async <T>(globPattern: string) => {
  const files = await glob(globPattern);
  const contents = await Promise.all(
    files //
      .map((file) => readFile(file, { encoding: "utf-8" }))
  );
  const parsed = contents //
    .map((content) => JSON.parse(content) as T);
  return parsed;
};
