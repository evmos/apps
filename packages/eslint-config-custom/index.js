// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

module.exports = {
  extends: ["turbo", "prettier"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
