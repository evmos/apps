export const makePromise = <T>() => {
  let resolve: (value: T) => void = () => {};
  let reject: (reason?: unknown) => void = () => {};

  const promise = new Promise<T>((internalResolve, internalReject) => {
    resolve = internalResolve;
    reject = internalReject;
  });

  return { promise, resolve, reject };
};
