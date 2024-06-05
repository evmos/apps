// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Config } from "./cosmos-config";
import { updateConfigFiles } from "./update-config-files";
import { addGenesisAccountsFromList } from "./add-genesis-accounts-from-list";
import { Genesis } from "../types/genesis";
import { getChainClient } from "../utils/get-chain-client";
import { updateJson } from "../utils/handlejson";
import { getAllAccounts } from "../utils/add-account";

export const initializeChain = async (config: Config) => {
  const { baseDenom, chainId, moniker, chainName, logger } = config;

  const client = await getChainClient(config);

  logger.info("Initializing chain configuration");
  await client(["init", moniker, "--chain-id", chainId, "-o"]).exited;

  logger.info(`Setting up initial accounts`);

  const allAccounts = await getAllAccounts();
  await addGenesisAccountsFromList(config, allAccounts);

  const gentxCommand = ["gentx"];
  try {
    await client([...gentxCommand, "--help"]).exited;
  } catch (e) {
    gentxCommand.unshift("genesis");
  }
  logger.info(`Creating genesis files for ${chainName} testnet`);
  await client([
    ...gentxCommand,
    TEST_ACCOUNTS.thevalidator.key,
    `1000000000000000000${baseDenom}`,
    "--keyring-backend",
    "test",
    "--chain-id",
    chainId,
    "--yes",
  ]).exited;
  await updateJson<Genesis>(
    path.join(config.homeDir, "config/genesis.json"),
    (genesis) => {
      if (chainName === "evmos") {
        genesis.consensus_params.block.max_gas = "1844674407370955161";
      }

      return JSON.parse(
        JSON.stringify(genesis, null, 2).replace(/"stake"/g, `"${baseDenom}"`),
      ) as Genesis;
    },
  );

  logger.info(`Updating configuration files`);
  await updateConfigFiles(config);
};
