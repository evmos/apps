// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Keplr } from "@keplr-wallet/types";
import { raise } from "helpers";
import { waitDocReady } from "../wait-doc-ready";

export function getGlobalKeplrProvider() {
  if (typeof window !== "undefined" && "keplr" in window) {
    return window.keplr as Keplr;
  }
  return null;
}

export async function getKeplrProvider() {
  await waitDocReady();

  return (
    getGlobalKeplrProvider() ?? raise("global Keplr provider not available")
  );
}
