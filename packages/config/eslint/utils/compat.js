// @ts-ignore
import { FlatCompat } from "@eslint/eslintrc";
// @ts-ignore
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);
/**
 * This is the repository root directory
 */
export const baseDirectory = path.resolve(__dirname, "../../../../");

export const esCompat = new FlatCompat({
  allConfig: undefined,
  recommendedConfig: js.configs.recommended,
  baseDirectory: __dirname,
});

export const configCompat = /** @type {(config: object) => object[]} */ (
  esCompat.config.bind(esCompat)
);

export const extendsCompat = /** @type {(config: string) => object[]} */ (
  esCompat.extends.bind(esCompat)
);
export const pluginsCompat = /** @type {(config: string) => object[]} */ (
  esCompat.plugins.bind(esCompat)
);
