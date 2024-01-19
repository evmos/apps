// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// @ts-ignore
import { FlatCompat } from "@eslint/eslintrc";
// @ts-ignore
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
/**
 * This is the repository root directory
 */
export const baseDirectory = path.resolve(__dirname, "../../../../");

const esCompat = new FlatCompat({
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
