import { spawn } from "child_process";
import path from "path";
import { rm } from "fs/promises";
import chalk from "chalk";
import {
  SupportedChainsPrefix,
  getExecutable,
} from "testnodes/utils/getExecutable";
import { updateJson } from "testnodes/utils/handlejson";
import { Genesis } from "testnodes/genesis";

import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Config, createConfig } from "./cosmos/cosmos-config";
import { init } from "./cosmos/commands/init";
import { addKey } from "./cosmos/commands/addKey";
import { addGenesisAccount } from "./cosmos/commands/addGenesisAccount";
import { gentx } from "./cosmos/commands/gentx";
import { collectGentxs } from "./cosmos/commands/collectGentxs";
import { start } from "./cosmos/commands/start";
import { listenToBlocks } from "./cosmos/listenToBlocks";
import { updateConfigFiles } from "./cosmos/updateConfigFiles";
import { setupRelayer, startRelayer } from "./relayer/setupRelayer";
import { logger } from "testnodes/utils/logger";
import Table from "cli-table";
import killPort from "kill-port";
import { stat } from "fs/promises";
const createChain = async (chain: SupportedChainsPrefix, config: Config) => {
  const { enableLogging, baseDenom, chainId } = config;
  await init(config).exited;
  const accounts = await addGenesisAccountsFromList(
    config,
    Object.values(TEST_ACCOUNTS)
  );

  if (enableLogging)
    logger.info(`[${chainId}] Creating genesis file for ${chainId} testnet`);
  await gentx(
    config,
    TEST_ACCOUNTS.thevalidator.key,
    `1000000000000000000${baseDenom}`
  ).exited;

  if (enableLogging)
    logger.info(`[${chainId}] Updating genesis file for ${chainId} testnet`);
  await updateJson<Genesis>(
    path.join(config.homeDir, "config/genesis.json"),
    (genesis) => {
      if (chain === "evmos") {
        genesis.consensus_params.block.max_gas = "1844674407370955161";
      }
      return genesis;
    }
  );
  await updateConfigFiles(config);
};
const addGenesisAccountsFromList = async (
  config: Config,
  accounts: {
    key: string;
    initialBalance: bigint;
    mneumonic: string;
  }[]
) => {
  const createdAccounts: {
    address: string;
    name: string;
    type: string;
    pubkey: string;
    mneumonic: string;
  }[] = [];
  for (const account of accounts) {
    const registeredAccount = await addKey(
      config,
      account.key,
      account.mneumonic
    ).exited;
    createdAccounts.push({
      ...registeredAccount,
      mneumonic: account.mneumonic,
    });
    await addGenesisAccount(
      config,
      account.key,
      `${account.initialBalance}${config.baseDenom}`
    ).exited;
  }

  return createdAccounts;
};
const initializeChain = async (
  chain: SupportedChainsPrefix,
  configParameters: Omit<Parameters<typeof createConfig>[0], "executable">
) => {
  const { enableLogging, overwrite } = configParameters;
  if (enableLogging) logger.info(`[${chain}] Creating Local ${chain} testnet`);
  const executable = await getExecutable(chain);
  const config = createConfig({
    executable,

    ...configParameters,
  });

  if (enableLogging) logger.info(`[${chain}] Cleaning up previous testnet`);
  try {
    await fetch(`http://127.0.0.1:${(config.portOffset ?? 0) * 10 + 26657}`);
    await killPort((config.portOffset ?? 0) * 10 + 26657);
  } catch (e) {}

  if (overwrite) await rm(config.homeDir, { recursive: true, force: true });

  try {
    await stat(config.homeDir);
    if (enableLogging)
      logger.info(`[${chain}] Testnet already exists, using existing testnet`);
  } catch (e) {
    if (enableLogging) logger.info(`[${chain}] Initializing ${chain} testnet`);
    await createChain(chain, config);
  }

  // await init(config).exited;

  // const { thevalidator } = TEST_ACCOUNTS;
  // const { baseDenom } = config;
  // const accounts = await addGenesisAccountsFromList(
  //   config,
  //   Object.values(TEST_ACCOUNTS)
  // );

  // if (enableLogging)
  //   logger.info(`[${chain}] Creating genesis file for ${chain} testnet`);
  // await gentx(config, thevalidator.key, `1000000000000000000${baseDenom}`)
  //   .exited;

  // if (enableLogging)
  //   logger.info(`[${chain}] Updating genesis file for ${chain} testnet`);
  // await updateJson<Genesis>(
  //   path.join(config.homeDir, "config/genesis.json"),
  //   (genesis) => {
  //     if (chain === "evmos") {
  //       genesis.consensus_params.block.max_gas = "1844674407370955161";
  //     }
  //     return genesis;
  //   }
  // );

  // if (enableLogging)
  //   logger.info(`[${chain}] Collecting gentxs for ${chain} testnet`);
  // await collectGentxs(config).exited;

  // if (enableLogging)
  //   logger.info(`[${chain}] Updating config files for ${chain} testnet`);
  // const ports = await updateConfigFiles(config);

  // if (enableLogging) {
  //   logger.info(`[${chain}] Successfully started ${chain} testnet node`, {});
  //   const table = new Table({
  //     head: [`${chain.toUpperCase()} APIS`, "URL"],

  //     rows: Object.entries(ports).map(([key, value]) => [
  //       key,
  //       `http://localhost:${value}`,
  //     ]),
  //   });

  //   console.log(table.toString());
  //   const label = chalk.bold.whiteBright;
  //   console.log(chalk.greenBright.bold(`Accounts`));
  if (enableLogging) logger.info(`[${chain}] Starting ${chain} testnet node`);
  const startProc = start(config);

  const tendermintBlockEvents = await listenToBlocks(config);
  return {
    config,
    ...startProc,
    ...tendermintBlockEvents,
  };
};

export const createEvmosTestnet = ({ enableLogging }: TestnetOptions = {}) =>
  initializeChain("evmos", {
    moniker: "evmos-testnode",
    chainId: "evmoslocal_9000-10",
    baseDenom: "aevmos",
    enableLogging,
  });

export const createCosmosTestnet = ({ enableLogging }: TestnetOptions = {}) =>
  initializeChain("cosmos", {
    moniker: "cosmos-testnode",
    chainId: "cosmolocal-10",
    baseDenom: "uatom",
    portOffset: 1,
    enableLogging,
  });

export const setupTestnet = async (options: TestnetOptions = {}) => {
  const cosmoshub = await createCosmosTestnet(options);
  const evmos = await createEvmosTestnet(options);
  const { enableLogging } = options;
  if (enableLogging)
    logger.info("Let's wait a few blocks to make sure everything is synced");
  await Promise.all([
    cosmoshub.waitForBlockHeight(3n),
    evmos.waitForBlockHeight(3n),
  ]);

  await setupRelayer(evmos.config.chainId, cosmoshub.config.chainId, options);

  await startRelayer(options);
  return {
    cosmoshub,
    evmos,
  };
};

type TestnetOptions = {
  enableLogging?: boolean;
  overwrite?: boolean;
};
