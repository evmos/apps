// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { flushSync } from "react-dom";

export const startTransition = (callback: () => void) => {
  if (!document.startViewTransition) callback();
  document.startViewTransition(() => flushSync(callback));
};
