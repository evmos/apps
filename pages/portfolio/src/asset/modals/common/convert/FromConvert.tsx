// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { useState } from "react";

import {
  convertFromAtto,
  createBigNumber,
  formatNumber,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "helpers";

import {
  ErrorMessage,
  ContainerInput,
  SmallButton,
} from "@evmosapps/ui-helpers";
import { MODAL_NOTIFICATIONS } from "@evmosapps/evmos-wallet";
import { FromProps } from "../types";

const FromConvert = ({ fee, balance, input, style }: FromProps) => {
  const feeDeposit = "5000";
  const [maxClicked, setMaxClicked] = useState(false);

  return (
    <>
      <ContainerInput>
        <>
          <Image
            src={style.img}
            width={20}
            height={20}
            alt={style.img}
            className="w-auto"
          />
          <span className="font-bold uppercase">{style.text}</span>
          <input
            className="w-full border-none text-right hover:border-none focus-visible:outline-none"
            type="text"
            placeholder="amount"
            value={input.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              input.setInputValue(numericOnly(e.target.value));
            }}
          />
          <SmallButton
            text="MAX"
            onClick={() => {
              if (style.tokenTo?.toUpperCase() !== fee.feeDenom.toUpperCase()) {
                input.setInputValue(
                  numericOnly(
                    convertFromAtto(balance.amount, balance.decimals),
                  ),
                );
              } else {
                setMaxClicked(true);
                const val = safeSubstraction(balance.amount, fee.fee);
                input.setInputValue(
                  numericOnly(convertFromAtto(val, balance.decimals)),
                );
              }
            }}
          />
        </>
      </ContainerInput>
      {truncateNumber(input.value) === 0 && (
        <ErrorMessage>
          {MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext}
        </ErrorMessage>
      )}
      {input.confirmClicked && input.value === "" && (
        <ErrorMessage>{MODAL_NOTIFICATIONS.ErrorAmountEmpty}</ErrorMessage>
      )}
      {truncateNumber(input.value) >
        truncateNumber(
          numericOnly(convertFromAtto(balance.amount, balance.decimals)),
        ) && <ErrorMessage>{MODAL_NOTIFICATIONS.ErrorsAmountGt}</ErrorMessage>}
      <div>
        <p className="text-sm font-bold">
          Available Balance:{" "}
          <span className="font-normal opacity-80">
            {formatNumber(convertFromAtto(balance.amount, balance.decimals), 6)}{" "}
            {style.tokenTo}
          </span>
        </p>
      </div>
      {fee.fee.eq(createBigNumber(feeDeposit)) && maxClicked && (
        <div className="text-xs font-bold opacity-80">
          {`Clicking on max reserves ${feeDeposit} * 10^-${fee.feeDecimals} ${fee.feeDenom} for transaction fees.`}
        </div>
      )}
    </>
  );
};

export default FromConvert;
