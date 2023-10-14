import { readFile, writeFile } from "fs/promises";

export const readJson = <T>(path: string) => {
  return readFile(path, "utf8").then((data) => JSON.parse(data) as T);
};

export const writeJson = (path: string, data: {}) => {
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
