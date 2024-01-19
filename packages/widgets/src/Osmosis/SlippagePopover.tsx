// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Popover } from "@headlessui/react";
import { cn } from "helpers";
import { OsmosisCloseIcon } from "@evmosapps/icons/osmosis/OsmosisCloseIcon";
import { OsmosisSettingsIcon } from "@evmosapps/icons/osmosis/OsmosisSettingsIcon";
import { Fragment, useRef, useState } from "react";
import { InfoTooltip } from "./InfoTooltip";
import { InputBox } from "./InputBox";

const slippageConfig = [1, 3, 5];

export const SlippagePopover = ({
  currentSlippage,
  setCurrentSlippage,
}: {
  currentSlippage: number;
  setCurrentSlippage: (slippage: number) => void;
}) => {
  const manualSlippageInputRef = useRef<HTMLInputElement | null>(null);
  const [isManualSlippage, setIsManualSlippage] = useState(false);
  const [manualSlippageStr, setManualSlippageStr] = useState("2.5");

  const manualSlippageError =
    manualSlippageStr < "0" || manualSlippageStr === " ";

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Overlay className="absolute inset-0 z-40 !rounded-3xl bg-osmoverse-1000/80" />
          <div className="relative flex w-full items-center justify-end">
            <h6 className="w-full text-center font-bold text-xl">Swap</h6>
            <Popover.Button as={Fragment}>
              <button
                className="absolute top-0 right-3 z-40 w-fit py-0"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <OsmosisSettingsIcon
                  aria-label="Open swap settings"
                  className={
                    open ? "text-white" : "text-osmoverse-400 hover:text-white"
                  }
                />
              </button>
            </Popover.Button>

            <Popover.Panel
              className="absolute bottom-[-0.5rem] right-0 z-40 w-full max-w-[23.875rem] translate-y-full rounded-2xl bg-osmoverse-800 p-[1.875rem] shadow-md md:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h6 className="text-xl font-semibold">Transaction settings</h6>
                <OsmosisCloseIcon
                  aria-label="close"
                  className="text-osmoverse-400 cursor-pointer"
                  onClick={() => close()}
                />
              </div>
              <div className="mt-2.5 flex items-center">
                <div className="font-inter mr-2 text-osmoverse-200">
                  Slippage tolerance
                </div>
                <InfoTooltip content="Your transaction will revert if the price changes unfavorably by more than this percentage." />
              </div>

              <ul className="mt-3 flex w-full gap-x-3">
                {slippageConfig.map((slippage) => {
                  return (
                    <li
                      key={slippage}
                      className={cn(
                        "flex h-8 w-full cursor-pointer items-center justify-center rounded-lg bg-osmoverse-700",
                        {
                          "border-2 border-wosmongton-200":
                            currentSlippage === slippage,
                        }
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentSlippage(slippage);
                      }}
                    >
                      <button>{slippage.toString()}%</button>
                    </li>
                  );
                })}
                <li
                  className={cn(
                    "flex h-8 w-full cursor-pointer items-center justify-center rounded-lg",
                    isManualSlippage
                      ? "border-2 border-wosmongton-200 text-white-high"
                      : "text-osmoverse-500",
                    isManualSlippage
                      ? manualSlippageError
                        ? "bg-red"
                        : "bg-osmoverse-900"
                      : "bg-osmoverse-900"
                  )}
                  onClick={(e) => {
                    e.preventDefault();

                    if (manualSlippageInputRef.current) {
                      manualSlippageInputRef.current.focus();
                    }
                  }}
                >
                  <InputBox
                    type="number"
                    className="w-fit bg-transparent px-0"
                    inputClassName={`bg-transparent text-center outline-none focus:outline-none ${
                      !isManualSlippage
                        ? "text-osmoverse-500"
                        : "text-white-high"
                    }`}
                    style="no-border"
                    currentValue={manualSlippageStr}
                    setManualValue={setManualSlippageStr}
                    setCurrentValue={setCurrentSlippage}
                    onFocus={() => setIsManualSlippage(true)}
                    inputRef={manualSlippageInputRef}
                    isAutosize
                    autoFocus={isManualSlippage}
                  />
                  <span
                    className={cn("shrink-0", {
                      "text-osmoverse-500": !isManualSlippage,
                    })}
                  >
                    %
                  </span>
                </li>
              </ul>
            </Popover.Panel>
          </div>
        </>
      )}
    </Popover>
  );
};
