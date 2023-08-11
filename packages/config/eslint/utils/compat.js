import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";

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
