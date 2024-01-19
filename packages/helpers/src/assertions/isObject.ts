// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === "object" && obj !== null;
