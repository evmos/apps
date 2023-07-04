import { defineConfig } from "@playwright/test";

// @ts-ignore
import { sharedConfig } from "playwright-config-custom";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...sharedConfig,
  webServer: {
    command: "yarn start",
    url: "http://127.0.0.1:3005",
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
    timeout: 300 * 1000,
  },
});
