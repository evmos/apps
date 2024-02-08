// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { amountToDollars, convertAndFormat } from "helpers";
import { Tooltip } from "@evmosapps/ui-helpers";
import { QuestionMarkIcon } from "@evmosapps/icons/QuestionMarkIcon";
import { Description } from "./Description";
import { SubRowProps } from "./types";
import { useCallback } from "react";

export const SubRowContent = ({ item }: SubRowProps) => {
  const balance = item.erc20Balance;
  const symbol = item.symbol;
  const description = item.description;
  const img = item.pngSrc;

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
    <div className="mr-8 flex w-full lg:mr-0 flex-row">
      <div className="md:w-[5%]"></div>
      {/* symbol - token name - description */}
      <div className="w-[50%] lg:flex">
        <Description
          symbol={symbol}
          description={description}
          imageSrc={img}
          subRow={true}
        />
      </div>
      {/* balance token - balance dollars */}
      <div className="mt-2 flex w-full pl-4 text-right uppercase lg:mt-0 lg:w-[50%] lg:items-center lg:pl-0 lg:text-left">
        {/* md:w-[5%] */}

        <div className="mr-8 flex w-full flex-col lg:mr-0">
          {/* displays erc20 balance */}
          <span className="break-all text-base font-bold">
            {convertAndFormat(balance, item.decimals, 6)}
          </span>

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
