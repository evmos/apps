// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isObject } from "./isObject";

export const has = <T extends Record<string, unknown>>(
  obj: unknown,
  property: keyof T,
): obj is {
  [key in keyof T]: unknown;
} => isObject(obj) && property in obj;
