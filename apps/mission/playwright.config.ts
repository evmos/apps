// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { defineConfig } from "@playwright/test";
import { createPlaywrightConfig } from "@evmosapps/test-utils";
import { config } from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
config();

const PORT = Number(process.env.PORT || 3000);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(createPlaywrightConfig(PORT));
