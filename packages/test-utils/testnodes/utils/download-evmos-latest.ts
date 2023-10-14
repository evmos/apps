import download from "download";
import os from "os";
import path from "path";
import { stat } from "fs/promises";
import { Octokit } from "octokit";
import { memoize } from "lodash-es";
import { TMP_DIR } from "./constants";

const octokit = new Octokit({
  auth: "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",
});

export const downloadEvmosLatest = memoize(async () => {
  console.log("Downloading latest Evmos release");
  const releases = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: "evmos",
      repo: "evmos",
    }
  );

  const platform = os.platform().toLowerCase();
  const arch = os.arch().toLowerCase();
  const release = releases.data.assets.find(
    ({ name }) =>
      name.toLowerCase().includes(platform) && name.toLowerCase().includes(arch)
  );
  if (!release) {
    throw new Error(`No release found for ${platform} ${arch}`);
  }
  const dir = path.join(TMP_DIR, release.name.replace(".tar.gz", ""));
  try {
    await stat(dir);
  } catch (e) {
    await download(release.browser_download_url, dir, { extract: true });
  }
  return dir;
});

export const getEvmosd = async () => {
  const releaseDir = await downloadEvmosLatest();
  const executable = path.join(releaseDir, "bin/evmosd");
  return executable;
};
