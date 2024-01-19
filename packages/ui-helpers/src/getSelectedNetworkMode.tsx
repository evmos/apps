// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const getSelectedNetworkMode = () => {
  if (typeof window === "undefined") return "mainnet";
  return localStorage.getItem("networkMode") || "mainnet";
};

export const setSelectedNetworkMode = (mode: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("networkMode", mode);
};
