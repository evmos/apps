import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/**/*.tsx"],
  format: ["esm"],
  target: "ES2020",
  dts: true,
  minify: true,
  clean: true,
  external: ["next", "react", "react-dom", "evmos-wallet"],
  ...options,
}));
