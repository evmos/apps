// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
import { rm } from "fs/promises";

import { Config, createConfig } from "./cosmos-config";
import { listenToBlocks } from "./listen-to-blocks";
import killPort from "kill-port";
import { stat } from "fs/promises";
import { initializeChain } from "./initialize-chain";
import { getChainClient } from "../utils/get-chain-client";
import { Genesis } from "../types/genesis";
import { updateJson } from "../utils/handlejson";

const killPreviousProcess = async (config: Config) => {
  config.logger.info(`Closing any previous open connections`);
  try {
    await fetch(`http://127.0.0.1:${config.api.rpc}`);
    await killPort(config.api.rpc);
  } catch (e) {}
};
export const createNetwork = async (
  configParameters: Omit<Parameters<typeof createConfig>[0], "executable"> & {
    customizeGenesis?: (genesis: Genesis) => Genesis;
  }
) => {
  const { overwrite, customizeGenesis, chainName } = configParameters;

  const config = createConfig(configParameters);
  const { logger } = config;

  logger.info(`Cleaning up previous testnet`);
  const client = await getChainClient(config);
  await killPreviousProcess(config);
  if (overwrite) await rm(config.homeDir, { recursive: true, force: true });

  try {
    logger.info(`Checking existing chain configuration`);
    await stat(config.homeDir);
    logger.info(`Testnet already exists, using existing testnet`);
  } catch (e) {
    logger.info(`No existing chain configuration found`);
    await initializeChain(config);

    await client(["collect-gentxs"]).exited;

    if (customizeGenesis) {
      await updateJson<Genesis>(
        path.join(config.homeDir, "config/genesis.json"),
        customizeGenesis
      );
    }
  }
  logger.info(`Starting ${chainName} testnet node`);

  const startProc = client([
    "start",
    chainName === "evmos" ? "--json-rpc.enable" : "",
  ]);
  const tendermintBlockEvents = await listenToBlocks(config);
  return {
    config,
    ...startProc,
    ...tendermintBlockEvents,
  };
};
