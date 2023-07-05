// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/** @type {import('eslint').Linter} */
module.exports = {
  extends: [
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:security/recommended",
    "plugin:sonarjs/recommended",
    "plugin:vitest/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "prettier",
    "sonarjs",
    "no-secrets",
    "vitest",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: ".",
    project: ["./tsconfig.json"],
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "no-secrets/no-secrets": ["error", { tolerance: 4.1 }],
    "sonarjs/prefer-single-boolean-return": "off",
    "sonarjs/prefer-immediate-return": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
