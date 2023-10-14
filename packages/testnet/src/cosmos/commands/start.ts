import { spawn } from "child_process";
import { makePromise } from "../../utils/makePromise";
import { Config } from "../cosmos-config";

export const start = (config: Config, extraFlags: string[] = []) => {
  const proc = spawn(
    config.executable,
    ["start", "--log_format", "json", "--home", config.homeDir, ...extraFlags],

    {
      stdio: ["ignore", "ignore", "pipe"],
    }
  );

  proc.stderr.on("data", (data) => {
    const message = data.toString().split("\n")[0];
    if (message.includes(`"level":`)) return;
    throw new Error(message);
  });

  const { promise, resolve, reject } = makePromise<void>();

  proc.on("close", async (code) => {
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
