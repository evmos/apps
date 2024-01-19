// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, expect, it } from "vitest";
import { parseUrl } from "../parse";

const githubForge = "https://github.com/Forge-Trade/";
const githubEscan = "https://github.com/EscanBE/meeting-square";
const twitterForge = "https://twitter.com/forgeDEX";
const discordGG = "https://discord.gg/gZz7P39E";
const discordOA = "https://discord.com/invite/PFSFKxyXQU";
const telegramEvmos = "http://t.me/EvmosOrg";
const urlForge = "forge.trade";
const urlLava = "http://lavanet.xyz";
const urlMintscan = "https://www.mintscan.io/evmos";
const urlEscan = "https://escan.live/";
const urlOA = "https://www.orbitmarket.io/";
const urlStride = "https://app.stride.zone/";

describe("Test Parse Urls", () => {
  it("get github url parsed", () => {
    const url = parseUrl(githubForge);
    expect(url).toBe("Forge-Trade");
  });

  it("get github url parsed with more information after the name", () => {
    const url = parseUrl(githubEscan);
    expect(url).toBe("EscanBE");
  });

  it("get twitter url parsed", () => {
    const url = parseUrl(twitterForge);
    expect(url).toBe("forgeDEX");
  });

  it("get discord url parsed with random name", () => {
    const url = parseUrl(discordGG);
    expect(url).toBe("gZz7P39E");
  });

  it("get discord url parsed with /invite", () => {
    const url = parseUrl(discordOA);
    expect(url).toBe("PFSFKxyXQU");
  });

  it("get telegram url parsed", () => {
    const url = parseUrl(telegramEvmos);
    expect(url).toBe("EvmosOrg");
  });

  it("get url parsed with only the page name", () => {
    const url = parseUrl(urlForge);
    expect(url).toBe("forge.trade");
  });

  it("get url parsed with http and no www", () => {
    const url = parseUrl(urlLava);
    expect(url).toBe("lavanet.xyz");
  });

  it("get url parsed with https, www and more information after name", () => {
    const url = parseUrl(urlMintscan);
    expect(url).toBe("mintscan.io");
  });

  it("get url parsed with https and no www ", () => {
    const url = parseUrl(urlEscan);
    expect(url).toBe("escan.live");
  });

  it("get url parsed with https and www", () => {
    const url = parseUrl(urlOA);
    expect(url).toBe("orbitmarket.io");
  });

  it("get url parsed with https", () => {
    const url = parseUrl(urlStride);
    expect(url).toBe("app.stride.zone");
  });
});
