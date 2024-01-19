// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
const rootDir = new URL("../../../../", import.meta.url).pathname;

export const BASEDIR = path.join(rootDir, "/.testnet");
export const binariesDir = path.join(BASEDIR, "binaries");
