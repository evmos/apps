// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import download from "download";
import path from "path";
import { stat } from "fs/promises";
import { tmpdir } from "os";

export const downloadRelease = async (
  tag: `v${number}.${number}.${number}`,
) => {
  const workerIndex = process.env.TEST_WORKER_INDEX || "0";

  const zipUrl = `https://github.com/chainapsis/keplr-wallet/releases/download/${tag}/keplr-extension-manifest-v3-${tag}.zip`;
  const zipPath = path.join(tmpdir(), workerIndex, `./.temp/keplrs-${tag}`);
  try {
    await stat(zipPath);
  } catch (e) {
    await download(zipUrl, zipPath, { extract: true });
  }
  return zipPath;
};
