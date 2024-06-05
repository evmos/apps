// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { cn } from "helpers";
import { useChainId, useConfig, useSwitchChain } from "wagmi";
import { Chain } from "viem";

export const NetworkModeSelector = () => {
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const config = useConfig();

  return (
    <div className="border-2 border-red-300 rounded-md m-4 flex max-w-sm mx-auto">
      {config.chains.map((chain) => {
        const networkType = (
          chain as Chain & {
            networkType: string;
          }
        ).networkType;

        return (
          <button
            data-testid={`network-mode-selector-${networkType}`}
            key={networkType}
            onClick={() => {
              switchChain({ chainId: chain.id });
            }}
            className={cn(
              "py-2 px-3 uppercase font-bold grow dark:text-heading-dark text-xxs",
              {
                "bg-red-300": chain.id === chainId,
              },
            )}
          >
            {networkType}
          </button>
        );
      })}
    </div>
  );
};
