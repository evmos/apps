import { defineConfig } from "vitest/config";
const { sharedConfig } = require("vitest-config-custom");

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    setupFiles: ["vitest.setup.ts"],
  },
});
