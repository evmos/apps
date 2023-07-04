// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const shared = require("./shared");

/** @type {import('eslint').Linter} */
module.exports = {
  ...shared,
  parserOptions: {
    tsconfigRootDir: ".",
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [
    "dist/*",
    "*.d.ts",
    "postcss.config.js",
    "vitest.config.ts",
    "tailwind.config.js"
  ]
};
