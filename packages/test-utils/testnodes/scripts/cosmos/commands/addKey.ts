import { spawn } from "child_process";
import { makePromise } from "../../../utils/makePromise";
import { Config } from "../cosmos-config";

export const addKey = (
  { executable, homeDir }: Config,
  name: string,
  mneumonic: string
) => {
  // nancyd keys add frida --home /var/folders/z4/gzl9m5fn221_mzc8ybkbhkyw0000gn/T/nancy-1/node-1 --output json --log_format json --keyring-backend test
  const enc = new TextEncoder();

  const mnemonicProc = spawn("echo", [mneumonic], {
    stdio: "pipe",
  });
  const proc = spawn(
    executable,
    [
      "keys",
      "add",
      name,
      "--home",
      homeDir,
      "--log_format",
      "json",
      "--output",
      "json",
      "--keyring-backend",
      "test",
      "--recover",
    ],

    {
      stdio: ["pipe", "pipe", "pipe"],
    }
  );
  mnemonicProc.stdout.on("data", (data) => {
    // console.log("data", data.toString());
    proc.stdin.write(data);
    proc.stdin.end();
  });

  const { promise, resolve, reject } = makePromise<{
    address: string;
    name: string;
    type: string;
    pubkey: string;
  }>();
  proc.on("close", (code) => {
    const accountProc = spawn(
      executable,
      [
        "keys",
        "show",
        name,
        "--home",
        homeDir,
        "--output",
        "json",
        "--keyring-backend",
        "test",
      ],
      {
        stdio: "pipe",
      }
    );

    accountProc.stdout.on("data", (data) => {
      const account = JSON.parse(data.toString());
      resolve(account);
    });

    accountProc.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });

  return {
    ...proc,
    exited: promise,
  };
};
