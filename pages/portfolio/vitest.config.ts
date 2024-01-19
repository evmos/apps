// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "@evmosapps/config/vitest/base.js";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      // setupFiles: ["vitest.setup.ts"],
    },
  })
);
