// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/index.tsx"],
  format: ["esm"],
  target: "es2020",
  dts: true,
  minify: false,
  sourcemap: true,
  ...options,
}));
