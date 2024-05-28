// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/**
 * this tailwind is only used for vscode tailwindcss intellisense
 */

const sharedConfig = require("@evmosapps/ui/config/tailwind.js");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  blocklist: [
    "**/node_modules/**",
    "**/public/**",
    "**/build/**",
    "**/dist/**",
    "**/coverage/**",
    "**/.next/**",
    "**/.netlify/**",
  ],

  content: ["packages/{apps,packages,pages}/**/*.{js,jsx,ts,tsx}"],
};
