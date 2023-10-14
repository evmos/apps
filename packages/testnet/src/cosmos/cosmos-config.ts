import path from "path";
import os from "os";
import { BASEDIR, binariesDir } from "src/utils/constants";
import { SupportedBinaries } from "src/utils/downloadBinaries";
import { createLogger, logger } from "src/utils/logger";
import chalk from "chalk";
const chainColors = [
  // chalk.redBright,
  chalk.yellowBright,
  chalk.magentaBright,
  chalk.blueBright,
  chalk.greenBright,
];
export const createConfig = ({
  baseDenom,
  baseDir = path.join(BASEDIR, "nodes"),
  chainId,
  moniker,
  ...rest
}: {
  chainName: Exclude<SupportedBinaries, "hermes">;
  moniker: string;
  chainId: string;
  // executable: string;
  baseDir?: string;
  baseDenom: string;

  enableLogging?: boolean;
  overwrite?: boolean;
  index?: number;
}) => {
  const portOffset = (rest.index ?? 0) * 10;
  const color = chainColors[rest.index ?? 0 % chainColors.length];
  return {
    ...rest,
    chainId,
    moniker,
    baseDenom,
    baseDir,
    homeDir: path.join(baseDir, chainId, moniker),
    logger: createLogger({
      enabled: !!rest.enableLogging,
      label: rest.chainName,
      color,
    }),

    api: {
      cosmos: 1317 + portOffset,
      grpc: 9090 + portOffset,
      jsonRpc: 8545 + portOffset,
      p2p: 26656 + portOffset,
      rpc: 26657 + portOffset,
    },
  };
};
export type Config = ReturnType<typeof createConfig>;
