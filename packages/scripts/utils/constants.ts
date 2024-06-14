// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
import { fileURLToPath } from "url";

export const REPO_ROOT = path.join(
  fileURLToPath(import.meta.url),
  "../../../../",
);