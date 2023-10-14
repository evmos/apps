import { spawn } from "child_process";
import { makePromise } from "../../utils/makePromise";
import { Config } from "../cosmos-config";

export const addGenesisAccount = (
  config: Config,
  key: string,
  stakeAmount: string
) => {
  // nancyd add-genesis-account frida 100000000000frida --log_format json --output json --home /var/folders/z4/gzl9m5fn221_mzc8ybkbhkyw0000gn/T/nancy-1/node-1
  const proc = spawn(
    config.executable,
    [
      "add-genesis-account",
      key,
      stakeAmount,
      "--log_format",
      "json",
      "--output",
      "json",
      "--home",
      config.homeDir,
      "--keyring-backend",
      "test",
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
