// import os from "os";
// import path from "path";
// import { readdir } from "fs/promises";
// import { SupportedBinaries, downloadBinaries } from "./downloadBinaries";

// export const getExecutable = async (executable: SupportedBinaries) => {
//   await downloadBinaries(executable);
//   // const binariesDir = path.join(process.cwd(), "binaries");
//   // const platform = os.platform().toLowerCase();

//   // const arch = os.arch().toLowerCase();
//   // const executableFile = (await readdir(binariesDir)).find(
//   //   (dir) =>
//   //     dir.includes(executable) && dir.includes(platform) && dir.includes(arch)
//   // );

//   // if (!executableFile) {
//   //   throw new Error(
//   //     `No executable found for ${executable} on ${platform} ${arch} in ${path.join(
//   //       process.cwd(),
//   //       "binaries"
//   //     )}`
//   //   );
//   // }

//   return path.join(binariesDir, executableFile);
// };
