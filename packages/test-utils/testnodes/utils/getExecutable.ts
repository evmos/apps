import os from "os";
import path from "path";
import { readdir } from "fs/promises";
const supportedChainsPrefix = ["evmos", "osmo", "cosmos"] as const;
export type SupportedChainsPrefix = (typeof supportedChainsPrefix)[number];
export const getExecutable = async (
  executable: SupportedChainsPrefix | "hermes"
) => {
  const platform = os.platform().toLowerCase();
  const arch = os.arch().toLowerCase();
  const executableFile = (
    await readdir(path.join(process.cwd(), "testnodes/binaries"))
  ).find(
    (dir) =>
      dir.includes(executable) && dir.includes(platform) && dir.includes(arch)
  );

  if (!executableFile) {
    throw new Error(
      `No executable found for ${executable} on ${platform} ${arch} in ${path.join(
        process.cwd(),
        "testnodes/binaries"
      )}`
    );
  }

  return path.join(process.cwd(), "testnodes/binaries", executableFile);
};
