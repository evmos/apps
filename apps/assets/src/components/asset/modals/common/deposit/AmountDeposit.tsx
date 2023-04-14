import { MODAL_NOTIFICATIONS } from "evmos-wallet";

import {
  convertFromAtto,
  convertAndFormat,
  createBigNumber,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "helpers";

import DropdownTokensDeposit from "../../../dropdown/DropdownTokensDeposit";
import { SmallButton, ContainerInput, ErrorMessage } from "ui-helpers";
import { ContainerModal } from "../ContainerModal";
import Note from "../Note";
import { TextSmall } from "../TextSmall";
import { AmountDepositProps } from "../types";
import { useState } from "react";

const AmountDeposit = ({
  amountProps,
}: {
  amountProps: AmountDepositProps;
}) => {
  const feeDeposit = "5000";
  const [maxClicked, setMaxClicked] = useState(false);

  const handleOnClickMax = () => {
    if (
      amountProps.token !== undefined &&
      amountProps.fee.feeDenom !== undefined
    ) {
      if (
        amountProps.token.symbol.toUpperCase() !==
        amountProps.fee.feeDenom.toUpperCase()
      ) {
        amountProps.setValue(
          numericOnly(
            convertFromAtto(amountProps.balance, amountProps.token.decimals)
          )
        );
        setMaxClicked(true);
      } else {
        const val = safeSubstraction(amountProps.balance, amountProps.fee.fee);
        amountProps.setValue(
          numericOnly(convertFromAtto(val, amountProps.token.decimals))
        );
        setMaxClicked(true);
      }
    }
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    amountProps.setValue(numericOnly(e.target.value));
  };

  const createAmountLabel = () => {
    // If chain select is a bridge with their own ui, link the bridge page
    if (
      amountProps.chain !== undefined &&
      amountProps.chain.elements[0].handledByExternalUI !== null
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
        amountProps.chain.elements[0].handledByExternalUI !== null)
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
        amountProps.chain.elements[0].handledByExternalUI !== null)
    ) {
      return <></>;
    }
    return (
      <>
        <p className="text-sm font-bold">
          Available Balance:{" "}
          <span className="font-normal opacity-80">
            {convertAndFormat(
              amountProps.balance,
              amountProps.token?.decimals,
              6
            )}{" "}
            {amountProps.token?.symbol}
          </span>
        </p>
      </>
    );
  };

  return (
    <ContainerModal>
      <>
        {createAmountLabel()}

        <ContainerInput>
          <>
            <DropdownTokensDeposit
              placeholder="Select token..."
              data={amountProps?.data}
              setToken={amountProps.setToken}
              setAddress={amountProps.setReceiverAddress}
              setValue={amountProps.setValue}
              setChain={amountProps.setChain}
              token={amountProps.token}
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
                    amountProps.balance,
                    amountProps.token.decimals
                  )
                )
              ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />}
        </div>
        <div className="space-y-2">{createBalanceDiv()}</div>
        {amountProps.fee.fee.eq(createBigNumber(feeDeposit)) &&
          maxClicked &&
          amountProps.token !== undefined && (
            <div className="text-xs font-bold opacity-80">
              {`Clicking on max reserves ${feeDeposit} * 10^-${amountProps.token?.decimals} ${amountProps.token?.symbol} for transaction fees.`}
            </div>
          )}
      </>
    </ContainerModal>
  );
};

export default AmountDeposit;
