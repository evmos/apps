// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { camelCase } from "lodash-es";

type CamelCase<S extends string> =
  S extends `${infer P1} ${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;
type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends {}
    ? KeysToCamelCase<T[K]>
    : T[K];
};

const { entries, fromEntries } = Object;
const normalizeKey = <T extends string>(key: T) =>
  camelCase(key.toLowerCase()) as CamelCase<T>;
export const normalizeObjectKeys = <T extends Record<string, unknown>>(
  obj: T,
) =>
  fromEntries(
    entries(obj).map(([key, value]) => [normalizeKey(key), value]),
  ) as KeysToCamelCase<T>;
