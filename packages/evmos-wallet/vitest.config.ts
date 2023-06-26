import { defineConfig } from "vitest/config";

// eslint-disable-next-line
// @ts-ignore
import { sharedConfig } from "vitest-config-custom";

// eslint-disable-next-line
export default defineConfig({
  ...sharedConfig,
});
