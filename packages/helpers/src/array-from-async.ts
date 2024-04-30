// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const arrayFromAsync = async function <T>(
  arrayLike: AsyncGenerator<T, unknown,unknown>,
) {
  const result: T[] = [];
  for await (const item of arrayLike) {
    result.push(item);
  }
  return result;
};
