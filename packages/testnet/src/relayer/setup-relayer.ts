// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
import { get } from "lodash-es";
import chalk from "chalk";
import { createRelayerConfig } from "./create-hermes-config";
import { stringify } from "smol-toml";
import { writeFile, mkdir } from "fs/promises";
import { Config } from "../cosmos/cosmos-config";
import { createCommandClient } from "../utils/command-client";
import { BASEDIR } from "../utils/constants";
import { createLogger } from "../utils/logger";
import { TEST_ACCOUNTS } from "../utils/test-accounts";

// const relayerDir = path.join(process.cwd(), "src/relayer");
const relayerConfigDir = path.join(BASEDIR, "relayer");

const relayerConfigFile = path.join(relayerConfigDir, "config.toml");
const mnemonicFile = path.join(relayerConfigDir, "mnemonic");
const createHermes = () =>
  createCommandClient("hermes", ["--config", relayerConfigFile, "--json"]);

const getChannelsInfo = async (chainId: string) => {
  const hermes = await createHermes();
  const logs = await hermes([
    "query",
    "channels",
    "--show-counterparty",
    "--chain",
    chainId,
  ]).exited;

  for (const log of logs.flatMap((log) => log.split("\n"))) {
    try {
      const parsedLog = JSON.parse(log) as unknown;

      if (get(parsedLog, "result")) {
        return parsedLog as {
          result: {
            chain_id_a: string;
            chain_id_b: string;
            channel_a: string;
            channel_b: string;
            port_a: string;
            port_b: string;
          }[];
          status: string;
        };
      }
    } catch (e) {}
  }
  return null;
};

export const setupRelayer = async (
  chainA: Config,
  chainB: Config,
  {
    enableLogging,
  }: {
    enableLogging?: boolean;
  } = {}
) => {
  const hermes = await createHermes();
  const logger = createLogger({
    enabled: !!enableLogging,
    label: "Relayer",
    color: chalk.yellowBright,
  });
  const relayerConfig = createRelayerConfig([chainA, chainB]);
  try {
    await mkdir(relayerConfigDir, { recursive: true });
    await writeFile(relayerConfigFile, stringify(relayerConfig));
    await writeFile(mnemonicFile, TEST_ACCOUNTS.relayer.mnemonic);
  } catch (e) {}

  logger.info(
    `Setting up relayer between ${chainA.chainName} and ${chainB.chainName}...`
  );
  if (enableLogging) logger.info(`Checking existing connections...`);
  const existingConnections = await getChannelsInfo(chainA.chainId);

  if (existingConnections?.result.length) {
    const connection = existingConnections.result.find(
      (connection) =>
        (connection.chain_id_a === chainA.chainId &&
          connection.chain_id_b === chainB.chainId) ||
        (connection.chain_id_a === chainB.chainId &&
          connection.chain_id_b === chainA.chainId)
    );

    if (enableLogging) logger.info(`Found existing connection`);
    return connection;
  }

  logger.info(`No existing connection found. Creating a new one...`);
  logger.info(
    `This usually takes up to 2 minutes. If it takes longer, please, restart this script.`
  );

  try {
    await hermes([
      "keys",
      "add",
      `--hd-path`,
      "m/44'/60'/0'/0/0",
      "--chain",
      chainA.chainId,
      "--mnemonic-file",
      mnemonicFile,
    ]).exited;
  } catch (e) {}

  try {
    await hermes([
      "keys",
      "add",
      "--chain",
      chainB.chainId,
      "--mnemonic-file",
      mnemonicFile,
    ]).exited;
  } catch (e) {}

  await hermes([
    "create",
    "channel",
    "--a-chain",
    chainA.chainId,

    "--b-chain",
    chainB.chainId,
    "--a-port",
    "transfer",
    "--b-port",
    "transfer",
    "--new-client-connection",
    "--yes",
  ]).exited;

  logger.info(`Relayer setup completed`);

  const connection = (await getChannelsInfo(chainA.chainId))?.result?.find(
    (connection) =>
      (connection.chain_id_a === chainA.chainId &&
        connection.chain_id_b === chainB.chainId) ||
      (connection.chain_id_a === chainB.chainId &&
        connection.chain_id_b === chainA.chainId)
  );
  if (!connection) {
    throw new Error(`Failed to setup relayer`);
  }
  return connection;
};

export const startRelayer = async ({
  enableLogging,
}: {
  enableLogging?: boolean;
} = {}) => {
  const logger = createLogger({
    enabled: !!enableLogging,
    label: "Relayer",
    color: chalk.yellowBright,
  });

  logger.info(`Starting relayer...`);

  const hermes = await createHermes();
  const proc = hermes(["start"]);

  logger.info(`Relayer started`);

  return proc;
};
