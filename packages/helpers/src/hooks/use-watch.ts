"use client";
import { DependencyList, useEffect } from "react";
import { useEffectEvent } from "./use-effect-event";

/**
 * This works very similarly to `useEffect`. The main difference is that the
 * callback function is always fresh, meaning you don't have to pass what's used it
 * in the dependency list. the Dependency list is used to watch changing items only
 */
export const useWatch = (fn: () => void, watchList: DependencyList) => {
  const fnEvent = useEffectEvent(() => fn());

  // eslint-disable-next-line react-hooks/exhaustive-deps -- No need to verify if watchList is exhaustive here because that's the purpose of this hook
  useEffect(() => fnEvent(), [fnEvent, ...watchList]);
};
