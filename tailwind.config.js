/**
 * this tailwind is only used for vscode tailwindcss intellisense
 */

const sharedConfig = require("@evmosapps/config/tailwind/base.js");
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
