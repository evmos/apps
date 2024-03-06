// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { raise } from "helpers";
import { Leap } from "./types/leap";
import { waitDocReady } from "../wait-doc-ready";

export function getGlobalLeapProvider() {
  if (typeof window !== "undefined" && "leap" in window) {
    return window.leap as Leap;
  }
  return null;
}

export async function getLeapProvider() {
  await waitDocReady();

  return getGlobalLeapProvider() ?? raise("global Leap provider not available");
}
