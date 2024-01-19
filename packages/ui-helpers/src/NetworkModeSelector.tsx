// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { cn } from "helpers";
import { useEffect, useState } from "react";
import {
  getSelectedNetworkMode,
  setSelectedNetworkMode,
} from "./getSelectedNetworkMode";

const modes = ["mainnet", "testnet", "localtestnet"];

export const NetworkModeSelector = () => {
  const [mode, setMode] = useState<null | string>(null);

  useEffect(() => {
    setMode(getSelectedNetworkMode());
  }, [setMode]);

  if (!mode) return null;
  return (
    <div className="border-2 border-red-300 rounded-md m-4 flex">
      {modes.map((net) => (
        <button
          data-testid={`network-mode-selector-${net}`}
          key={net}
          onClick={() => {
            setMode(net);
            setSelectedNetworkMode(net);
            window.location.reload();
          }}
          className={cn(
            "text-white py-2 px-3 uppercase text-xxs font-bold grow ",
            {
              "bg-red-300": net === mode,
            },
          )}
        >
          {net}
        </button>
      ))}
    </div>
  );
};
