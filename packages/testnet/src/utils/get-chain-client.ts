// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Config } from "../cosmos/cosmos-config";
import { createCommandClient } from "./command-client";

export const getChainClient = (config: Config) =>
  createCommandClient(config.chainName, [
    "--home",
    config.homeDir,
    "--log_format",
    "json",
  ]);
