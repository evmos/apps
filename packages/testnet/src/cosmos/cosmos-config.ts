import path from "path";

import chalk from "chalk";
import { BASEDIR } from "../utils/constants";
import { SupportedBinaries } from "../utils/download-binaries";
import { createLogger } from "../utils/logger";
const chainColors = [
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
  prefix: string;
  baseDir?: string;
  baseDenom: string;

  enableLogging?: boolean;
  overwrite?: boolean;
  index?: number;
}) => {
  const portOffset = (rest.index ?? 0) * 10;
  const color =
    chainColors[rest.index ?? 0 % chainColors.length] ?? chalk.white;
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
