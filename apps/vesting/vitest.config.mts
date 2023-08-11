import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "@evmos-apps/config/vitest/base";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      setupFiles: ["vitest.setup.ts"],
    },
  })
);
