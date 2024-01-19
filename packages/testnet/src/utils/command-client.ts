// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { spawn } from "child_process";
import { makePromise } from "./make-promise";
import {
  SupportedBinaries,
  downloadBinaries as getBinaries,
} from "./download-binaries";
export const createCommandClient = async (
  binaries: SupportedBinaries,
  presistentArgs: string[] = [],
) => {
  const executablePromise = await getBinaries(binaries);
  return (args: string[], stdin?: string) => {
    const proc = spawn(executablePromise, [...presistentArgs, ...args], {
      stdio: "pipe",
    });
    if (stdin) {
      const stdinProc = spawn("echo", [stdin], {
        stdio: "pipe",
      });
      const pipeFn = (data: unknown) => {
        proc.stdin.write(data);
        proc.stdin.end();
        stdinProc.stdout.off("data", pipeFn);
      };
      stdinProc.stdout.on("data", pipeFn);
    }
    const logs: string[] = [];

    const subscriptions = new Set<
      (data: string, source: "stderr" | "stdout") => void
    >();

    const broadcast = (data: string, source: "stderr" | "stdout") => {
      logs.push(data);
      subscriptions.forEach((cb) => cb(data, source));
    };
    proc.stdout.on("data", (data) => {
      broadcast(String(data), "stdout");
    });

    proc.stderr.on("data", (data) => {
      broadcast(String(data), "stderr");
    });

    const { promise, resolve, reject } = makePromise<string[]>();

    proc.on("close", (code) => {
      if (code !== 0) {
        reject(logs);
      } else {
        resolve(logs);
      }
    });

    return {
      ...proc,

      exited: promise,
      subscribe: (cb: (data: string, source: "stderr" | "stdout") => void) => {
        subscriptions.add(cb);
      },
    };
  };
};
