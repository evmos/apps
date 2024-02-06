// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import { amountToDollars, convertAndFormat } from "helpers";
import { EVMOS_SYMBOL } from "@evmosapps/evmos-wallet";
import { Tooltip } from "@evmosapps/ui-helpers";
import { QuestionMarkIcon } from "@evmosapps/icons/QuestionMarkIcon";
import { Description } from "./Description";
import { SubRowProps } from "./types";
import { useCallback } from "react";
export const SubRowContent = ({ item, isIBCBalance = false }: SubRowProps) => {
  let balance = item.erc20Balance;
  const symbol = item.symbol;
  const description = item.description;
  const img = item.pngSrc;

  if (isIBCBalance) {
    balance = item.cosmosBalance;
  }

  const createV10Tooltip = () => {
    return (
      <div
        className={`text-xs capitalize ${
          item.cosmosBalance.eq(BigNumber.from("0")) ||
          item.symbol === EVMOS_SYMBOL
            ? "hidden"
            : ""
        }`}
      >
        <Tooltip
          className="w-24"
          element={<QuestionMarkIcon width={16} height={16} />}
          text={
            <>
              Since{" "}
              <Link
                className="text-red-300"
                href={v10Link}
                rel="noopener noreferrer"
                target="_blank"
              >
                v10
              </Link>{" "}
              upgrade, all withdraws will pull first from IBC token balance
              before ERC-20. Deposits are autoconverted to ERC-20
            </>
          }
        />
      </div>
    );
  };
  const v10Link =
    "https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10";

  const createCoingeckoAlert = useCallback(() => {
    return (
      <Tooltip
        className="w-28 text-xs normal-case"
        element={<QuestionMarkIcon width={16} height={16} />}
        text="This value is calculated based on the Stride redemption rate."
      />
    );
  }, []);

  return (
    <div className="mr-8 flex w-full flex-col lg:mr-0 lg:flex-row">
      <div className="md:w-[5%]"></div>
      {/* symbol - token name - description */}
      <div className="hidden w-[50%] lg:flex">
        <Description
          symbol={symbol}
          description={description}
          imageSrc={img}
          subRow={true}
        />
      </div>
      {/* mobile view for description and convert */}
      <div className="flex items-center lg:hidden">
        <Description
          symbol={symbol}
          description={description}
          imageSrc={img}
          subRow={true}
        />
      </div>
      <div className="mt-2 flex w-full pl-4 text-right uppercase lg:mt-0 lg:w-[50%] lg:items-center lg:pl-0 lg:text-left">
        <div className=" mx-2.5 lg:mx-0"></div>
        {/* md:w-[5%] */}
        <p className="w-full text-left text-sm capitalize text-darkGray5 lg:hidden ">
          Total Balance
        </p>

        <div className="mr-8 flex w-full flex-col lg:mr-0">
          {/* displays erc20 balance */}
          <span className="break-all text-base font-bold">
            {convertAndFormat(balance, item.decimals, 6)}
          </span>
          {/* displays ibc balance */}
          <div
            className={` ${
              item.cosmosBalance.eq(BigNumber.from("0")) ||
              item.symbol === EVMOS_SYMBOL
                ? "hidden"
                : ""
            } flex items-center justify-end font-bold lg:justify-start`}
          >
            <div className="block pr-1 lg:hidden">{createV10Tooltip()}</div>
            <Tooltip
              className="capitalize"
              element={
                <p className="break-all text-sm opacity-80">
                  {convertAndFormat(item.cosmosBalance, item.decimals)}{" "}
                </p>
              }
              text="IBC Balance"
            />
            <div className="hidden pl-1 lg:block">{createV10Tooltip()}</div>
          </div>

          {/* displays erc20 tokens in dollars */}
          {/* stevmos uses evmos price until they add it on coingecko. 
          TODO: remove tooltips once stevmos is added to coingecko */}
          <div className="flex items-center justify-end font-bold lg:justify-start">
            {item.symbol.toLowerCase() === "stevmos" && (
              <div className="block pr-1 lg:hidden">
                {createCoingeckoAlert()}
              </div>
            )}

            <span className="text-xs text-darkGray5">
              ${amountToDollars(balance, item.decimals, item.coingeckoPrice)}
            </span>

            {item.symbol.toLowerCase() === "stevmos" && (
              <div className="hidden pl-1 lg:block">
                {createCoingeckoAlert()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
