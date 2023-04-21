// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { convertAndFormat } from "helpers";
import { QuestionMarkIcon } from "icons";
import { Tooltip } from "ui-helpers";

const Tabs = ({
  cosmosBalance,
  erc20Balance,
  decimals,
  isERC20Selected,
  setIsERC20Selected,
  isEvmosToken = false,
}: {
  cosmosBalance: BigNumber;
  erc20Balance: BigNumber;
  decimals: number;
  isERC20Selected: boolean;
  setIsERC20Selected: Dispatch<SetStateAction<boolean>>;
  isEvmosToken?: boolean;
}) => {
  const v10Link =
    "https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10";
  return (
    <div className="flex w-full items-center justify-center rounded border border-darkGray1 bg-pearl font-[IBM] font-bold ">
      <button
        className={`${
          isERC20Selected ? " bg-darkGray1 text-pearl" : "text-darkGray1"
        }
        ${isEvmosToken ? "disabled" : ""}
        flex h-full w-full flex-col items-center border-r border-darkGray1 px-6 py-2`}
        onClick={() => {
          if (!isERC20Selected) {
            setIsERC20Selected(true);
          }
        }}
      >
        <div className="flex items-center space-x-1">
          <span>ERC-20</span>
          <Tooltip
            className="w-24"
            element={<QuestionMarkIcon width={20} height={20} />}
            text={
              <>
                Since{" "}
                <Link
                  className="text-red"
                  href={v10Link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  v10
                </Link>{" "}
                upgrade, all withdraws will pull first from IBC token balance
                before ERC-20.
              </>
            }
          />
        </div>
        <span className="text-xs font-normal">
          {convertAndFormat(erc20Balance, decimals)}
        </span>
      </button>
      <button
        className={`${
          !isERC20Selected ? "bg-darkGray1 text-pearl " : "text-darkGray1"
        } flex h-full w-full flex-col items-center border-r border-darkGray1 px-6 py-2`}
        onClick={() => {
          if (isERC20Selected) {
            setIsERC20Selected(false);
          }
        }}
      >
        <span>IBC</span>
        <span className="text-xs font-normal">
          {convertAndFormat(cosmosBalance, decimals)}
        </span>
      </button>
    </div>
  );
};

export default Tabs;
