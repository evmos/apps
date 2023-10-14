import { spawn as childProcessSpawn } from "node:child_process";

export const spawn = (...args: Parameters<typeof childProcessSpawn>) =>
  new Promise<void>((resolve, reject) => {
    const child = childProcessSpawn(...args);
    child.on("close", (code) => {
      if (code !== 0) {
        reject();
      } else {
        resolve();
      }
    });
  });
