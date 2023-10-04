import { Octokit } from "octokit";
import download from "download";
import os from "os";
import path from "path";
import { stat } from "fs/promises";
import { spawn } from "node:child_process";
const octokit = new Octokit({});

const downloadEvmosLatest = async () => {
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
  const dir = path.join(os.tmpdir(), release.name.replace(".tar.gz", ""));
  try {
    await stat(dir);
  } catch (e) {
    await download(release.browser_download_url, dir, { extract: true });
  }
  return dir;
};

const releaseDir = await downloadEvmosLatest();
const evmosd = path.join(releaseDir, "bin/evmosd");

spawn(evmosd, ["--help"], { stdio: "inherit" });
