// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const makePromise = <T>() => {
  let resolve: (value: T) => void = () => {};
  let reject: (reason?: unknown) => void = () => {};

  const promise = new Promise<T>((internalResolve, internalReject) => {
    resolve = internalResolve;
    reject = internalReject;
  });

  return { promise, resolve, reject };
};
