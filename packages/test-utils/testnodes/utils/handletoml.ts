import { readFile, writeFile } from "fs/promises";
import { get } from "lodash-es";

export const updateToml = async (
  tomlPath: string,
  updates: Record<string, {}>
) => {
  const toml = await readFile(tomlPath, "utf8");
  let path: string[] = [];
  const updated = toml
    .split("\n")
    .map((line) => {
      const [key] = line.match(/^ *([-\w\[\]]+)/) ?? [];

      if (!key) return line;
      if (key.startsWith("[")) {
        path = key.slice(1, -1).split(".");
        return line;
      }

      const value = get(updates, [...path, key]);

      if (typeof value === "undefined") return line;
      if (typeof value === "string") return `${key} = "${value}"`;
      if (typeof value === "number") return `${key} = ${value}`;
      if (typeof value === "boolean") return `${key} = ${value}`;
      if (typeof value === "object") {
        return `${key} = ${JSON.stringify(value)}`;
      }

      return line;
    })
    .join("\n");
  return writeFile(tomlPath, updated);
};
