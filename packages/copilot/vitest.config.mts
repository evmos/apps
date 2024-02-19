import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "@evmosapps/config/vitest/base.js";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      setupFiles: ["vitest.setup.ts"],
      deps: {
        // >= 0.34
        optimizer: {
          web: {
            include: ["vitest-canvas-mock"],
          },
        },
      },
    },
  }),
);
