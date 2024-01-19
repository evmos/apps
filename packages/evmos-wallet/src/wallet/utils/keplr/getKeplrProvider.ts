// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Keplr } from "@keplr-wallet/types";
import { assertIf, raise } from "helpers";

export function getGlobalKeplrProvider() {
  if (typeof window !== "undefined" && "keplr" in window) {
    return window.keplr as Keplr;
  }
  return null;
}

export async function getKeplrProvider(): Promise<Keplr> {
  let keplr = getGlobalKeplrProvider();
  if (keplr) return keplr;

  assertIf(document.readyState !== "complete", "PROVIDER_NOT_AVAILABLE");

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        keplr = getGlobalKeplrProvider() ?? raise("PROVIDER_NOT_AVAILABLE");

        resolve(keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };
    document.addEventListener("readystatechange", documentStateChange);
  });
}
