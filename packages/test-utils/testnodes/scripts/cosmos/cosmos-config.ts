import path from "path";
import os from "os";

export const createConfig = ({
  baseDenom,
  baseDir = os.tmpdir(),
  chainId,
  moniker,
  ...rest
}: {
  moniker: string;
  chainId: string;
  executable: string;
  baseDir?: string;
  baseDenom: string;

  enableLogging?: boolean;
  overwrite?: boolean;
  portOffset?: number;
}) => {
  return {
    ...rest,
    chainId,
    moniker,
    baseDenom,
    baseDir,
    homeDir: path.join(baseDir, chainId, moniker),
  };
};
export type Config = ReturnType<typeof createConfig>;
