// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { assert, raise } from "helpers";
import { Leap } from "./types/leap";

export function getGlobalLeapProvider() {
  if (typeof window !== "undefined" && "leap" in window) {
    return window.leap as Leap;
  }
  return null;
}

export async function getLeapProvider(): Promise<Leap> {
  let leap = getGlobalLeapProvider();
  if (leap) return leap;

  assert(document.readyState !== "complete", "PROVIDER_NOT_AVAILABLE");

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        leap = getGlobalLeapProvider() ?? raise("PROVIDER_NOT_AVAILABLE");

        resolve(leap);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };
    document.addEventListener("readystatechange", documentStateChange);
  });
}
