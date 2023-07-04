// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const shared = require("./shared");

/** @type {import('eslint').Linter} */
module.exports = {
  ...shared,
  globals: {
    React: true,
    JSX: true,
  },
  extends: [
    "plugin:react/recommended",
    "next/core-web-vitals",
  ]
};
