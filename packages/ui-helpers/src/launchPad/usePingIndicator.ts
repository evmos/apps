"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useCallback, useEffect, useState } from "react";

const FIRST_CLICK_LAUNCHER_PAD = "firstClickLauncherPad";

const setFirstClickLauncherPad = (value: string) => {
  window.localStorage.setItem(FIRST_CLICK_LAUNCHER_PAD, value);
};

export const getFirstClickLauncherPad = () => {
  return window.localStorage.getItem(FIRST_CLICK_LAUNCHER_PAD);
};

export const usePingIndicator = () => {
  const [showPing, setIsOpenPing] = useState(false);

  const handlePingIndicator = useCallback(() => {
    if (getFirstClickLauncherPad() === null) {
      setFirstClickLauncherPad("true");
      setTimeout(() => {
        setIsOpenPing(false);
      }, 30000);
    }
  }, []);

  useEffect(() => {
    const firstClickLauncherPad = getFirstClickLauncherPad();
    if (firstClickLauncherPad === null) {
      setIsOpenPing(true);
    }
  }, [showPing]);

  return { showPing, handlePingIndicator };
};
