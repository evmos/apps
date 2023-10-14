import { Octokit } from "octokit";
import download from "download";
import os from "os";
import { binariesDir } from "./constants";
import path from "path";
import { stat, chmod } from "fs/promises";
import { memoize } from "lodash-es";
const octokit = new Octokit({
  auth: "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",
});

export type SupportedBinaries = "evmos" | "cosmos" | "hermes";
const REPO_MAP: Record<
  SupportedBinaries,
  {
    owner: string;
    repo: string;
  }
> = {
  evmos: {
    owner: "evmos",
    repo: "evmos",
  },
  cosmos: {
    owner: "cosmos",
    repo: "gaia",
  },
  hermes: {
    owner: "informalsystems",
    repo: "hermes",
  },
};
const getLatestReleases = async (binary: SupportedBinaries) => {
  const releases = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    REPO_MAP[binary]
  );

  return releases.data;
};

export const downloadBinaries = memoize(async (binary: SupportedBinaries) => {
  const { assets, tag_name } = await getLatestReleases(binary);

  const platform = os.platform().toLowerCase();
  const arch = os.arch().toLowerCase();
  const release = assets.find(({ name }) => {
    if (!name.toLowerCase().includes(platform)) return false;
    if (arch === "arm64") {
      return (
        name.toLowerCase().includes("arm64") ||
        name.toLowerCase().includes("aarch64")
      );
    }
    return name.toLowerCase().includes(arch);
  });

  if (!release) {
    throw new Error(`No release found for ${platform} ${arch}`);
  }
  const outputDir = path.join(binariesDir, binary, tag_name);
  try {
    await stat(outputDir);
  } catch (e) {
    await download(release.browser_download_url, outputDir, {
      extract: true,
    });
  }

  let filepath = path.basename(release.browser_download_url);
  if (binary === "evmos") {
    filepath = "bin/evmosd";
  } else if (binary === "hermes") {
    filepath = "hermes";
  }
  const executable = path.join(outputDir, filepath);
  await chmod(executable, 0o755);
  return executable;
});
// -rw-r--r--
// -rwxr-xr-x
