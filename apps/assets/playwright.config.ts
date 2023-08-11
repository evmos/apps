import { defineConfig } from "@playwright/test";
import { sharedConfig } from "playwright-config-custom";
import { config } from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
config();

const PORT = process.env.PORT || 3002;
const baseURL = `http://localhost:${PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...sharedConfig,
  use: {
    baseURL,
    trace: "retry-with-trace",
  },
  webServer: process.env.CI
    ? {
        command: "yarn start",
        port: PORT as number,
        stdout: "pipe",
        stderr: "pipe",
        timeout: 300 * 1000,
      }
    : undefined,
});
