import { defineConfig } from "@playwright/test";

// @ts-ignore
import { sharedConfig } from "playwright-config-custom";

const PORT = process.env.PORT || 3005;
const baseURL = `http://localhost:${PORT}`;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...sharedConfig,
  use: {
    baseURL,
    trace: "retry-with-trace",
  },
  webServer: {
    command: "yarn start",
    port: PORT,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
    timeout: 300 * 1000,
  },
});
