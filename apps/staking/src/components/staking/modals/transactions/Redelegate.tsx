// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { MODAL_NOTIFICATIONS, StoreType } from "evmos-wallet";

import {
  convertFromAtto,
  getReservedForFeeText,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "helpers";

import { useEvmosBalance } from "../../../../internal/staking/functionality/hooks/useEvmosBalance";
import { ModalDelegate } from "../../../../internal/staking/functionality/types";
import ValidatorsDropdown from "../../dropdown/ValidatorsDropdown";
import { useRedelegation } from "../hooks/useRedelegation";
import { FEE_STAKING_ACTIONS } from "constants-helper";
import {
  ContainerInput,
  ErrorMessage,
  SmallButton,
  ConfirmButton,
} from "ui-helpers";

export const Redelegate = ({
  item,
  setShow,
  setShowRedelegate,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShowRedelegate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { evmosBalance } = useEvmosBalance();
  const [value, setValue] = useState("");
  const [validator, setValidator] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [isValidatorSelected, setIsValidatorSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const useRedelegateProps = {
    value,
    setShow,
    wallet,
    item,
    setConfirmClicked,
    setDisabled,
    validatorDst: validator,
    evmosBalance,
  };

  const { handleConfirmButton } = useRedelegation(useRedelegateProps);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="font-bold">Amount to Redelegate</p>
        <ContainerInput>
          <>
            <input
              className="w-full border-none text-right hover:border-none focus-visible:outline-none"
              type="text"
              placeholder="amount"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(numericOnly(e.target.value));
              }}
            />
            <SmallButton
              text="MAX"
              onClick={() => {
                const val =
                  item.balance !== ""
                    ? BigNumber.from(item.balance)
                    : BigNumber.from(0);
                setValue(numericOnly(convertFromAtto(val, 18)));
              }}
            />
          </>
        </ContainerInput>
        {truncateNumber(value) === 0 && (
          <ErrorMessage>
            {MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext}
          </ErrorMessage>
        )}
        {confirmClicked && value === "" && (
          <ErrorMessage>{MODAL_NOTIFICATIONS.ErrorAmountEmpty}</ErrorMessage>
        )}
        {confirmClicked &&
          safeSubstraction(
            evmosBalance.eq(BigNumber.from(-1))
              ? BigNumber.from(0)
              : evmosBalance,
            BigNumber.from(FEE_STAKING_ACTIONS)
          ).lte(BigNumber.from(0)) && (
            <ErrorMessage>
              {MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext}
            </ErrorMessage>
          )}
        {truncateNumber(value) >
          truncateNumber(
            numericOnly(
              convertFromAtto(
                item.balance !== ""
                  ? BigNumber.from(item.balance)
                  : BigNumber.from(0),
                18
              )
            )
          ) && (
          <ErrorMessage>{MODAL_NOTIFICATIONS.ErrorsAmountGt}</ErrorMessage>
        )}

        <p className="font-bold">Validator to Redelegate</p>
        <ValidatorsDropdown
          setValidator={setValidator}
          setIsValidatorSelected={setIsValidatorSelected}
          validatorName={item.moniker.toLowerCase()}
        />
        {confirmClicked && (validator === "" || !isValidatorSelected) && (
          <ErrorMessage>{MODAL_NOTIFICATIONS.ErrorValidatorEmpty}</ErrorMessage>
        )}
        <p className="text-sm">
          {getReservedForFeeText(
            BigNumber.from(FEE_STAKING_ACTIONS),
            "EVMOS",
            "EVMOS"
          )}
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <SmallButton
          className="w-fit"
          text="BACK"
          onClick={() => {
            setShowRedelegate(false);
          }}
        />
        <ConfirmButton
          text="Redelegate"
          onClick={handleConfirmButton}
          className="w-fit px-4 text-sm"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
