// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Link } from "@evmosapps/i18n/client";
import { useMemo, useState } from "react";

import { useOsmosisData } from "./useOsmosisData";
import { cn, formatNumber, useWatch } from "helpers";
import { useOsmosisQuote } from "./useOsmosQuote";

import { OsmosisChevronDownIcon } from "@evmosapps/icons/osmosis/OsmosisChevronDownIcon";
import { OsmosisDownArrowIcon } from "@evmosapps/icons/osmosis/OsmosisDownArrowIcon";
import { OsmosisSwapIcon } from "@evmosapps/icons/osmosis/OsmosisSwapIcon";
import { SlippagePopover } from "./SlippagePopover";
import Image from "next/image";
import { useOsmosisPrecompile } from "./useOsmosisPrecompile";
import { parseUnits } from "viem";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { EXPLORER_URL } from "constants-helper";

export default function Osmosis() {
  const { data } = useOsmosisData();

  const {
    swap,
    data: swapHash,
    isPending: swapIsLoading,
    reset: resetSwap,
    errorMessage: swapError,
  } = useOsmosisPrecompile();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [inputTokenDenom, setInputToken] = useState("OSMO");
  const outputTokenDenom = inputTokenDenom === "OSMO" ? "EVMOS" : "OSMO";
  const [currentSlippage, setCurrentSlippage] = useState(1);
  const [swapAmountInputValue, setSwapAmountInputValue] = useState<string>("");
  const swapAmount = parseFloat(swapAmountInputValue || "0");
  const [inputTokenData, outputTokenData] = useMemo(() => {
    if (!data) return [null, null] as const;
    if (inputTokenDenom === "OSMO") {
      return [data.osmosis, data.evmos] as const;
    }
    return [data.evmos, data.osmosis] as const;
  }, [inputTokenDenom, data]);

  const { isFetching: loading, quote: latestQuote } = useOsmosisQuote({
    tokenA: inputTokenDenom,
    tokenB: outputTokenDenom,
    amount: swapAmountInputValue.toString(),
  });

  const number_min_received = useMemo(() => {
    if (loading || !outputTokenData) return 0;
    return parseFloat(
      formatUnits(
        BigInt(latestQuote?.return_amount ?? "0"),
        outputTokenData.exponent
      )
    );
  }, [latestQuote?.return_amount, loading, outputTokenData]);

  const input_amount_received = useMemo(() => {
    if (loading || !inputTokenData) return 0;
    return parseFloat(
      formatUnits(
        BigInt(latestQuote?.input_amount ?? "0"),
        inputTokenData.exponent
      )
    );
  }, [inputTokenData, latestQuote?.input_amount, loading]);

  const minReceivedAfterSlippage =
    number_min_received * (1 - currentSlippage / 100);

  const inputNumberBalance = parseFloat(
    formatUnits(
      BigInt(inputTokenData?.balance ?? 0n),
      inputTokenData?.exponent ?? 0,
      6
    )
  );

  const [isHoveringSwitchButton, setHoveringSwitchButton] = useState(false);
  const [showBalanceLink, setShowBalanceLink] = useState(false);

  const enoughBalance =
    inputNumberBalance >=
    parseFloat(
      swapAmountInputValue.toString() === ""
        ? "0"
        : swapAmountInputValue.toString()
    );

  function swapTokens() {
    try {
      const input = inputTokenData?.erc20Address ?? "";
      const output = outputTokenData?.erc20Address ?? "";
      swap({
        input: input,
        output: output,
        amount: parseUnits(
          swapAmountInputValue.toString(),
          inputTokenData?.exponent ?? 18
        ),
        slippage_tolerance: currentSlippage,
      });

      setShowBalanceLink(true);
    } catch (e) {}
  }
  const enableDetails =
    swapAmount !== 0 &&
    number_min_received !== 0 &&
    input_amount_received !== 0 &&
    !loading;

  useWatch(() => {
    if (loading === false && enableDetails === false) {
      setDetailsOpen(false);
    }
  }, [enableDetails, loading]);
  return (
    <div className="font-poppins relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-osmoverse-850 px-6 py-9 md:gap-6 md:px-3 w-full md:pt-4 md:pb-4">
      <SlippagePopover
        currentSlippage={currentSlippage}
        setCurrentSlippage={setCurrentSlippage}
      />
      <div className="relative flex w-full items-center justify-end"></div>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-osmoverse-900 px-4 py-[22px] transition-all md:rounded-xl md:px-3 md:py-2.5">
          <div className="flex place-content-between items-center transition-opacity">
            <div className="flex font-inter">
              <span className="caption text-xs text-white-full">Available</span>
              <span className="caption ml-1.5 text-xs text-wosmongton-300">
                {inputNumberBalance} {inputTokenData?.coinDenom}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setSwapAmountInputValue(String(inputNumberBalance / 2));
                }}
                className={`flex place-content-center items-center  text-center 
              transition-colors disabled:cursor-default border 
              border-wosmongton-300 hover:border-wosmongton-200 text-wosmongton-300 hover:text-wosmongton-200 
              rounded-md disabled:border-osmoverse-600 disabled:text-osmoverse-400 h-[24px] w-auto text-caption 
              font-semibold tracking-wider py-1 px-1.5 text-xs bg-transparent
              ${inputNumberBalance === 0 && "pointer-events-none opacity-50"}`}
              >
                HALF
              </button>
              <button
                onClick={() => {
                  setSwapAmountInputValue(String(inputNumberBalance));
                }}
                className={`flex place-content-center items-center text-center transition-colors 
                disabled:cursor-default border
                 border-wosmongton-300 hover:border-wosmongton-200
                  text-wosmongton-300 hover:text-wosmongton-200 rounded-md disabled:border-osmoverse-600
                   disabled:text-osmoverse-400 h-[24px] w-auto text-caption font-semibold 
                   tracking-wider py-1 px-1.5 text-xs bg-transparent
                   ${
                     inputNumberBalance === 0 &&
                     "pointer-events-none opacity-50"
                   }`}
              >
                MAX
              </button>
            </div>
          </div>
          <div className="mt-3 flex place-content-between items-center">
            <div className="flex items-center justify-center md:justify-start">
              <div
                className={`flex items-center gap-2 text-left transition-opacity cursor-pointer
                ${
                  !inputTokenData &&
                  "animate-pulse bg-osmoverse-700 [&>*]:invisible h-[50px] rounded-xl"
                } `}
              >
                <div className="mr-1 h-[50px] w-[50px] shrink-0 rounded-full md:h-13 md:w-13">
                  {inputTokenData?.img?.png && (
                    <Image
                      src={inputTokenData.img.png}
                      width={50}
                      height={50}
                      alt="token icon"
                      style={{ color: "transparent" }}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h5 className="text-2xl font-semibold">
                    {inputTokenData?.coinDenom}
                  </h5>
                  <div className="md:caption w-32 text-sm truncate text-osmoverse-400">
                    {inputTokenData?.chain}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-end">
              <input
                value={swapAmountInputValue}
                onKeyDown={(event) => {
                  if (event.key === "-") {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setShowBalanceLink(false);
                  resetSwap();
                  setSwapAmountInputValue(e.target.value);
                }}
                placeholder="0"
                type="number"
                className={`w-full bg-transparent text-2xl font-semibold text-right  placeholder:text-[#ffffff61] focus:outline-none
                ${
                  swapAmountInputValue === ""
                    ? "text-[#ffffff61]"
                    : "text-white-full"
                }`}
              />
              {swapAmount > 0 && inputTokenData?.price && (
                <span className="opacity-50 text-base font-semibold md:caption whitespace-nowrap text-osmoverse-300 transition-opacity">
                  ≈ ${formatNumber(swapAmount * inputTokenData.price, 5)}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setInputToken(outputTokenDenom);
            resetSwap();
            setShowBalanceLink(false);
          }}
          className={cn(
            "absolute left-[45%] top-[220px] z-30 flex items-center transition-all duration-500 ease-bounce md:top-[195px]",
            {
              "h-10 w-10 md:h-8 md:w-8": !isHoveringSwitchButton,
              "h-11 w-11 -translate-x-[2px] md:h-9 md:w-9":
                isHoveringSwitchButton,
            }
          )}
          onMouseEnter={() => {
            setHoveringSwitchButton(true);
          }}
          onMouseLeave={() => {
            setHoveringSwitchButton(false);
          }}
        >
          <div
            className={cn("flex h-full w-full items-center rounded-full", {
              "bg-osmoverse-700": !isHoveringSwitchButton,
              "bg-[#4E477C]": isHoveringSwitchButton,
            })}
          >
            <div className="relative h-full w-full">
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-bounce",
                  {
                    "rotate-180 opacity-0": isHoveringSwitchButton,
                  }
                )}
              >
                <OsmosisDownArrowIcon />
              </div>
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-bounce",
                  {
                    "rotate-180 opacity-100": isHoveringSwitchButton,
                    "opacity-0": !isHoveringSwitchButton,
                  }
                )}
              >
                <OsmosisSwapIcon aria-label="switch" />
              </div>
            </div>
          </div>
        </button>
        <div className="rounded-xl bg-osmoverse-900 px-4 py-[22px] transition-all md:rounded-xl md:px-3 md:py-2.5">
          <div className="flex place-content-between items-center transition-transform">
            <div className="flex items-center justify-center md:justify-start">
              <div
                className={`
                flex items-center gap-2 text-left transition-opacity cursor-pointer
                ${
                  !outputTokenData &&
                  "animate-pulse bg-osmoverse-700 [&>*]:invisible h-[50px] rounded-xl"
                } `}
              >
                <div className="mr-1 h-[50px] w-[50px] shrink-0 rounded-full md:h-13 md:w-13">
                  {outputTokenData?.img?.png && (
                    <Image
                      src={outputTokenData.img.png}
                      width={50}
                      height={50}
                      alt="token icon"
                      style={{ color: "transparent" }}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h5 className="text-2xl font-semibold">
                    {outputTokenData?.coinDenom}
                  </h5>
                  <div className="md:caption text-sm w-32 truncate text-osmoverse-400">
                    {outputTokenData?.chain}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-end">
              <h5
                className={`text-2xl font-semibold whitespace-nowrap text-right transition-opacity
                      ${
                        number_min_received === 0 || swapAmount === 0
                          ? "text-[#ffffff61]"
                          : "text-white-full"
                      }`}
              >
                {swapAmount === 0 ? "0" : formatNumber(number_min_received, 5)}
              </h5>
              {swapAmount > 0 && outputTokenData?.price && (
                <span className="md:caption text-base font-semibold text-osmoverse-300 opacity-100 transition-opacity">
                  ≈ $
                  {formatNumber(number_min_received * outputTokenData.price, 5)}
                </span>
              )}
            </div>
          </div>
        </div>
        {swapError && (
          <div
            style={{ height: "50px" }}
            className={`bg-osmoverse-900 text-sm text-red items-center flex-col justify-center relative overflow-hidden rounded-lg  px-4 transition-all duration-300 ease-inOutBack md:px-3 flex py-[10px]`}
          >
            {swapError}
          </div>
        )}
        {swapHash && (
          <div
            style={{ height: "50px" }}
            className={`bg-osmoverse-900 text-sm items-center flex-col justify-center relative overflow-hidden rounded-lg  px-4 transition-all duration-300 ease-inOutBack md:px-3 flex py-[10px]`}
          >
            <span className="">Transaction Submitted</span>
            <div className="flex gap-3">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                className="text-wosmongton-300 text-xs hover:text-osmoverse-200 transition-colors"
                href={`${EXPLORER_URL}/tx/${swapHash}`}
              >
                View on Escan
              </Link>
              {showBalanceLink && (
                <Link
                  className="text-wosmongton-300 text-xs hover:text-osmoverse-200 transition-colors"
                  href={`/portfolio`}
                >
                  View Balance in Portfolio
                </Link>
              )}
            </div>
          </div>
        )}
        <div
          style={{ height: detailsOpen ? "251px" : "44px" }}
          className={`${
            loading
              ? "font-inter animate-pulse bg-osmoverse-700 [&>*]:invisible"
              : "bg-osmoverse-900"
          } relative overflow-hidden rounded-lg  px-4 transition-all duration-300 ease-inOutBack md:px-3 (py-6 if opened) py-[10px]`}
        >
          <button
            disabled={!enableDetails}
            onClick={() => {
              setDetailsOpen(!detailsOpen);
            }}
            className="flex text-sm w-full place-content-between items-center transition-opacity cursor-pointer disabled:opacity-50"
          >
            {number_min_received !== 0 && input_amount_received !== 0 && (
              <span className="flex gap-1">
                1<span>{inputTokenData?.coinDenom}</span>≈{" "}
                {formatNumber(number_min_received / input_amount_received, 5)}{" "}
                {outputTokenData?.coinDenom}
              </span>
            )}

            {enableDetails && (
              <div className="flex items-center gap-2 transition-opacity ml-auto">
                <OsmosisChevronDownIcon
                  className={cn(
                    "text-osmoverse-400 transition-all",
                    detailsOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </div>
            )}
          </button>
          {enableDetails && (
            <div className="absolute text-xs flex flex-col gap-4 pt-5 transition-opacity w-[358px] md:w-[94%]">
              <div className="flex justify-between gap-1">
                <span>Price Impact</span>
                <span className="text-osmoverse-200">
                  {formatNumber(latestQuote?.price_impact, 4)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Swap Fee (0.2%)</span>
                {outputTokenData?.price && (
                  <span className="text-osmoverse-200">
                    ≈ $
                    {formatNumber(
                      (number_min_received * outputTokenData.price * 0.2) / 100,
                      4
                    )}
                  </span>
                )}
              </div>
              <hr className="text-white/20" />
              <div className="flex justify-between gap-1">
                <span className="max-w-[140px]">Expected Output</span>
                <span className="whitespace-nowrap text-osmoverse-200">
                  ≈ {formatNumber(number_min_received, 5)}{" "}
                  {outputTokenData?.coinDenom}
                </span>
              </div>
              <div className="flex justify-between gap-1">
                <span className="max-w-[140px]">
                  Minimun received after slippage ({currentSlippage}%)
                </span>
                <div className="flex flex-col gap-0.5 text-right text-osmoverse-200">
                  <span className="whitespace-nowrap">
                    {formatNumber(minReceivedAfterSlippage, 5)} OSMO
                  </span>
                  {outputTokenData?.price && (
                    <span>
                      ≈ $
                      {formatNumber(
                        minReceivedAfterSlippage * outputTokenData.price,
                        5
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={swapTokens}
          disabled={
            loading ||
            swapIsLoading ||
            number_min_received === 0 ||
            enoughBalance === false ||
            swapAmount === 0
          }
          className={`${
            loading || swapIsLoading || number_min_received === 0
              ? "opacity-40"
              : ""
          } font-semibold flex w-full place-content-center items-center py-2 text-center transition-colors disabled:cursor-default border-2 border-wosmongton-700 bg-wosmongton-700 hover:border-wosmongton-400 hover:bg-wosmongton-400 rounded-xl disabled:border-2 disabled:border-osmoverse-500 disabled:bg-osmoverse-500 disabled:text-osmoverse-100 h-[56px] px-6 subtitle1 tracking-wide`}
        >
          {loading
            ? "Loading..."
            : !enoughBalance
              ? "Insufficient balance"
              : "Swap"}
        </button>
      </div>
    </div>
  );
}
