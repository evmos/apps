import { spawn } from "child_process";
import { makePromise } from "../../../utils/makePromise";
import { Config } from "../cosmos-config";

export const collectGentxs = (config: Config) => {
  const proc = spawn(
    config.executable,
    ["collect-gentxs", "--log_format", "json", "--home", config.homeDir],

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
