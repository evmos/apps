import { spawn } from "child_process";
import { makePromise } from "../../utils/makePromise";
import { Config } from "../cosmos-config";

export const gentx = (config: Config, key: string, stakeAmount: string) => {
  const proc = spawn(
    config.executable,
    [
      "gentx",
      key,
      stakeAmount,
      "--log_format",
      "json",
      "--output",
      "json",
      "--home",
      config.homeDir,
      "--chain-id",
      config.chainId,
      "--moniker",
      config.moniker,
      "--keyring-backend",
      "test",
      "--yes",
    ],

    {
      stdio: "pipe",
    }
  );

  const { promise, resolve, reject } = makePromise<void>();
  proc.on("close", (code) => {
    if (code !== 0) {
      reject();
    } else {
      resolve();
    }
  });

  return {
    ...proc,
    exited: promise,
  };
};
