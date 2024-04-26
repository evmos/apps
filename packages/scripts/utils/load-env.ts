// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

export const loadEnv = () => {
  const dirname = path.join(fileURLToPath(import.meta.url), "../../../../");
  const envFiles = [
    path.join(dirname, ".env.local"),
    path.join(dirname, ".env"),
    path.join(dirname, ".env.development"),
    path.join(dirname, ".env.production"),
    path.join(dirname, ".env.test"),
  ];
  config({
    path: envFiles,
  });
};

loadEnv();
