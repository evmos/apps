// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const waitDocReady = () =>
  new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("document is not available"));
      return;
    }

    if (document.readyState === "complete") {
      resolve();
      return;
    }
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        resolve();
      }
    });
  });
