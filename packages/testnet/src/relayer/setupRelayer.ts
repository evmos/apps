import path from "path";
import { spawn } from "child_process";
// import { logger } from "src/utils/logger";
import { downloadBinaries } from "src/utils/downloadBinaries";
import { get, isPlainObject } from "lodash-es";
import { createClient } from "viem/_types/clients/createClient";
import { createCommandClient } from "src/utils/command-client";
import { createLogger } from "src/utils/logger";
import chalk, { Chalk } from "chalk";

const relayerDir = path.join(process.cwd(), "src/relayer");

const createHermes = () =>
  createCommandClient("hermes", [
    "--config",
    path.join(relayerDir, "config.toml"),
    "--json",
  ]);

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
      const parsedLog = JSON.parse(log);

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
  chainA: string,
  chainB: string,
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

  logger.info(`Setting up relayer between ${chainA} and ${chainB}...`);
  if (enableLogging) logger.info(`Checking existing connections...`);
  let existingConnections = await getChannelsInfo(chainA);

  if (existingConnections?.result.length) {
    const connection = existingConnections.result.find(
      (connection) =>
        (connection.chain_id_a === chainA &&
          connection.chain_id_b === chainB) ||
        (connection.chain_id_a === chainB && connection.chain_id_b === chainA)
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
      chainA,
      "--mnemonic-file",
      path.join(relayerDir, "mnemonic"),
    ]).exited;
  } catch (e) {}

  try {
    await hermes([
      "keys",
      "add",
      "--chain",
      chainB,
      "--mnemonic-file",
      path.join(relayerDir, "mnemonic"),
    ]).exited;
  } catch (e) {}

  await hermes([
    "create",
    "channel",
    "--a-chain",
    chainA,

    "--b-chain",
    chainB,
    "--a-port",
    "transfer",
    "--b-port",
    "transfer",
    "--new-client-connection",
    "--yes",
  ]).exited;

  logger.info(`Relayer setup completed`);

  const connection = (await getChannelsInfo(chainA))?.result?.find(
    (connection) =>
      (connection.chain_id_a === chainA && connection.chain_id_b === chainB) ||
      (connection.chain_id_a === chainB && connection.chain_id_b === chainA)
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
