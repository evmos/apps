// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["turbo", "prettier"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
