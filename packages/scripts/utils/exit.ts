// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Log } from "helpers/src/logger";

export const exit = (message: string): never => {
  Log().error(message);
  process.exit(1);
};
