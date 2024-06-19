// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "path";

const dir = fileURLToPath(import.meta.url);
export const REPO_ROOT = path.join(dir, "../../../../");

const envFiles = [
  path.join(REPO_ROOT, ".vercel/.env.development.local"),
  path.join(REPO_ROOT, ".env.local"),
  path.join(REPO_ROOT, ".env"),
];

config({
  path: envFiles,
  override: true,
});
export const ensureKeys = (keys: string[]) => {
  keys.forEach((key) => {
    if (!process.env[key])
      throw new Error(
        `'${key}' not defined. Ensure to set it in your .env file`,
      );
  });
};
