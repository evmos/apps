// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type ValidatorStateContext = {
  value: boolean;
  handleSetValue: (e: boolean) => void;
};

const ValidatorStateContext = createContext<ValidatorStateContext | null>(null);

export function ValidatorStateWrapper({ children }: { children: JSX.Element }) {
  const [value, setValue] = useState(false);

  const handleSetValue = useCallback((e: boolean) => {
    setValue(e);
  }, []);

  return (
    <ValidatorStateContext.Provider value={{ value, handleSetValue }}>
      {children}
    </ValidatorStateContext.Provider>
  );
}
export function useValidatorContext() {
  return useContext(ValidatorStateContext);
}
