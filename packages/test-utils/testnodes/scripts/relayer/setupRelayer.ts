import path from "path";
import { getExecutable } from "testnodes/utils/getExecutable";
import { spawn } from "child_process";
import { logger } from "testnodes/utils/logger";
export const asyncSpawn = (command: string, args: string[]) =>
  new Promise<void>((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: "inherit",
    });
    proc.on("close", (code) => {
      if (code !== 0) {
        reject();
      } else {
        resolve();
      }
    });
  });
export const setupRelayer = async (
  chainA: string,
  chainB: string,
  {
    enableLogging,
  }: {
    enableLogging?: boolean;
  } = {}
) => {
  if (enableLogging) {
    logger.info(
      `[RELAYER] Setting up relayer between ${chainA} and ${chainB}...`
    );
    logger.info(
      `[RELAYER] This usually takes up to 2 minutes. If it takes longer, please, restart this script.`
    );
  }

  const hermes = await getExecutable("hermes");

  await asyncSpawn(hermes, [
    "--config",
    path.join(process.cwd(), "testnodes/scripts/relayer/config.toml"),
    "keys",
    "delete",
    "--all",
    "--chain",
    chainA,
  ]);

  await asyncSpawn(hermes, [
    "--config",
    path.join(process.cwd(), "testnodes/scripts/relayer/config.toml"),
    "keys",
    "delete",
    "--all",
    "--chain",
    chainB,
  ]);

  await asyncSpawn(hermes, [
    "--config",
    path.join(process.cwd(), "testnodes/scripts/relayer/config.toml"),

    "keys",
    "add",
    `--hd-path`,
    "m/44'/60'/0'/0/0",
    "--chain",
    chainA,
    "--mnemonic-file",
    path.join(process.cwd(), "testnodes/scripts/relayer/mnemonic"),
  ]);

  await asyncSpawn(hermes, [
    "--config",
    path.join(process.cwd(), "testnodes/scripts/relayer/config.toml"),

    "keys",
    "add",
    "--chain",
    chainB,
    "--mnemonic-file",
    path.join(process.cwd(), "testnodes/scripts/relayer/mnemonic"),
  ]);

  await asyncSpawn(hermes, [
    "--config",
    path.join(process.cwd(), "testnodes/scripts/relayer/config.toml"),

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
  ]);

  if (enableLogging) {
    logger.info(`[RELAYER] Relayer setup completed`);
  }
};

export const startRelayer = async ({
  enableLogging,
}: {
  enableLogging?: boolean;
} = {}) => {
  if (enableLogging) {
    logger.info(`[RELAYER] Starting relayer...`);
  }

  const hermes = await getExecutable("hermes");

  const proc = spawn(
    hermes,
    [
      "--config",
      path.join(process.cwd(), "testnodes/scripts/relayer/config.toml"),
      "start",
    ],
    {
      stdio: "inherit",
    }
  );

  if (enableLogging) {
    logger.info(`[RELAYER] Relayer started`);
  }
  return proc;
};
