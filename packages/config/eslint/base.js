import { esCompat, baseDirectory } from "./utils/compat.js";

// plugins
import prettier from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import noSecrets from "eslint-plugin-no-secrets";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export const tsLintConfig = {
  files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
  plugins: {
    "@typescript-eslint": tsPlugin,
  },
  rules: {
    ...tsPlugin.configs["eslint-recommended"].overrides[0].rules,
    ...tsPlugin.configs["recommended"].rules,
    ...tsPlugin.configs["recommended-requiring-type-checking"].rules,
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
        extendDefaults: true,
      },
    ],
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { modules: true },
      tsconfigRootDir: baseDirectory,
      project: [
        "./tsconfig.json",
        "./packages/*/tsconfig.json",
        "./apps/*/tsconfig.json",
      ],
    },
  },
};

const lintConfig = [
  {
    plugins: {
      prettier,
      sonarjs,
      "no-secrets": noSecrets,
    },
    rules: {
      "no-unused-vars": "error",
      "security/detect-object-injection": "off",
      "no-secrets/no-secrets": ["error", { tolerance: 4.1 }],
      "sonarjs/prefer-single-boolean-return": "off",
      "sonarjs/prefer-immediate-return": "off",
    },
  },
  ...esCompat.plugins("vitest"),

  ...esCompat.extends("turbo"),
  {
    ignores: [
      "**/dist/**/*",
      "**/node_modules/**/*",
      "**/.next/**/*",
      "**/next-env.d.ts",
    ],
  },
  ...esCompat.config({
    extends: ["next"],
    overrides: [
      {
        files: ["*.js", "*.mjs", "*.cjs", "*.jsx"],
        parser: "espree",
      },
    ],
    settings: {
      next: {
        rootDir: `${baseDirectory}/apps/*/`,
      },
    },
  }),
  tsLintConfig,
];

export default lintConfig;
