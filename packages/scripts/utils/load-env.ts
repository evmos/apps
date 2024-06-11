// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { config } from "dotenv";
import path from "path";
import { REPO_ROOT } from "./constants";

export const loadEnv = () => {
  const envFiles = [
    path.join(REPO_ROOT, ".env.local"),
    path.join(REPO_ROOT, ".env"),
    path.join(REPO_ROOT, ".env.development"),
    path.join(REPO_ROOT, ".env.production"),
    path.join(REPO_ROOT, ".env.test"),
  ];
  config({
    path: envFiles,
  });
};

loadEnv();
