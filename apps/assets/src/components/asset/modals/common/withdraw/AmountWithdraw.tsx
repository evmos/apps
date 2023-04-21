// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";

import {
  convertFromAtto,
  convertAndFormat,
  getReservedForFeeText,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "helpers";

import DropdownTokens from "../../../dropdown/DropdownTokens";
import { SmallButton, ContainerInput, ErrorMessage } from "ui-helpers";
import { ContainerModal } from "../ContainerModal";
import Note from "../Note";
import { TextSmall } from "../TextSmall";
import { AmountWithdrawProps } from "../types";
import { FEE_WITHDRAW } from "constants-helper";
import { MODAL_NOTIFICATIONS, EVMOS_SYMBOL } from "evmos-wallet";

const AmountWithdraw = ({
  amountProps,
}: {
  amountProps: AmountWithdrawProps;
}) => {
  const feeDenom = EVMOS_SYMBOL;

  const handleOnClickMax = () => {
    if (amountProps.token !== undefined) {
      // evmos keeps using cosmosBalance
      let balance = amountProps.token.erc20Balance;
      if (amountProps.token.symbol === EVMOS_SYMBOL) {
        balance = amountProps.token.cosmosBalance;
      }
      if (amountProps.token.symbol.toUpperCase() !== feeDenom.toUpperCase()) {
        amountProps.setValue(
          numericOnly(convertFromAtto(balance, amountProps.token.decimals))
        );
      } else {
        const val = safeSubstraction(balance, BigNumber.from(FEE_WITHDRAW));
        amountProps.setValue(
          numericOnly(convertFromAtto(val, amountProps.token.decimals))
        );
      }
    }
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    amountProps.setValue(numericOnly(e.target.value));
  };

  const createAmountLabel = () => {
    // No token selected, display amount label
    if (amountProps.token === undefined) {
      return <TextSmall text="AMOUNT" />;
    }

    // If token selected or chain select is a bridge with their own ui, link the bridge page
    if (
      amountProps.token.handledByExternalUI !== null ||
      (amountProps.chain !== undefined &&
        amountProps.chain.handledByExternalUI !== null)
    ) {
      return (
        <>
          <TextSmall text="SELECT BRIDGE" />
          <Note
            text="We currently do not offer transfers directly from Ethereum. For now,
      here are a few options that will allow you to withdraw from Evmos"
          />
        </>
      );
    }

    // By default display the amount label
    return <TextSmall text="AMOUNT" />;
  };

  const createAmountInput = () => {
    // If token or chain are from axelar, return empty component
    if (
      (amountProps.token !== undefined &&
        amountProps.token.handledByExternalUI !== null) ||
      (amountProps.chain !== undefined &&
        amountProps.chain.handledByExternalUI !== null)
    ) {
      return <></>;
    }

    // Return amount input
    return (
      <>
        <input
          className="w-full border-none text-right hover:border-none focus-visible:outline-none"
          type="text"
          placeholder="amount"
          value={amountProps.value}
          onChange={handleOnChangeInput}
        />
        <SmallButton text="MAX" onClick={handleOnClickMax} />
      </>
    );
  };

  const createBalanceDiv = () => {
    // If token or chain are from axelar, return empty component
    if (amountProps.token === undefined) {
      return <></>;
    }

    if (
      (amountProps.token !== undefined &&
        amountProps.token.handledByExternalUI !== null) ||
      (amountProps.chain !== undefined &&
        amountProps.chain.handledByExternalUI !== null)
    ) {
      return <></>;
    }
    return (
      <>
        <p className="text-sm font-bold">
          Available Balance:{" "}
          <span className="font-normal opacity-80">
            {convertAndFormat(
              // evmos keeps using cosmosBalance
              amountProps.token.symbol === EVMOS_SYMBOL
                ? amountProps.token.cosmosBalance
                : amountProps.token.erc20Balance,
              amountProps.token.decimals,
              6
            )}{" "}
            {amountProps.token.symbol}
          </span>
        </p>
        <Note
          text={getReservedForFeeText(
            BigNumber.from(FEE_WITHDRAW),
            EVMOS_SYMBOL,
            EVMOS_SYMBOL
          )}
        />
      </>
    );
  };
  return (
    <ContainerModal>
      <>
        {createAmountLabel()}
        <ContainerInput>
          <>
            <DropdownTokens
              placeholder="Select token..."
              data={amountProps.data.table}
              setToken={amountProps.setToken}
              setAddress={amountProps.setReceiverAddress}
              setValue={amountProps.setValue}
              setChain={amountProps.setChain}
            />
            {createAmountInput()}
          </>
        </ContainerInput>
        <div className="flex flex-col">
          {amountProps.confirmClicked && amountProps.token === undefined && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorTokenEmpty} />
          )}
          {truncateNumber(amountProps.value) === 0 && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
          )}
          {amountProps.confirmClicked && amountProps.value === "" && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
          )}
          {amountProps.token !== undefined &&
            amountProps.token.handledByExternalUI === null &&
            truncateNumber(amountProps.value) >
              truncateNumber(
                numericOnly(
                  convertFromAtto(
                    // evmos keeps using cosmosBalance
                    amountProps.token.symbol === EVMOS_SYMBOL
                      ? amountProps.token.cosmosBalance
                      : amountProps.token.erc20Balance,
                    amountProps.token.decimals
                  )
                )
              ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />}
        </div>
        <div className="space-y-2">{createBalanceDiv()} </div>
      </>
    </ContainerModal>
  );
};

export default AmountWithdraw;
