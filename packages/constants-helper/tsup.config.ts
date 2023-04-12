import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.ts"],
  format: ["esm"],
  target: "ES2020",
  dts: true,
  minify: true,
  clean: true,
  external: [],
  ...options,
}));
