// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
import { fileURLToPath } from "node:url";

export const cacheDir = path.join(
  fileURLToPath(import.meta.url),
  "../../../../../node_modules/.cache/evmosapps",
);
