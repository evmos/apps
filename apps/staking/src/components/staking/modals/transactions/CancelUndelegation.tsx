// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
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
import { FEE_STAKING_ACTIONS } from "constants-helper";
import {
  ContainerInput,
  ErrorMessage,
  SmallButton,
  ConfirmButton,
} from "ui-helpers";
import { useCancelUndelegations } from "../hooks/useCancelUndelegations";
import { undelegationData } from "../../AllTabs/Undelegations";

export const CancelUndelegation = ({
  item,
  setShow,
}: {
  item: undelegationData;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const { evmosBalance } = useEvmosBalance();
  const [value, setValue] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const useCancelUndelegationsProps = {
    value,
    setShow,
    wallet,
    item,
    setConfirmClicked,
    setDisabled,
    evmosBalance,
  };

  const { handleConfirmButton } = useCancelUndelegations(
    useCancelUndelegationsProps
  );
  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">
        Cancel Undelegation for {item.moniker}
      </p>
      <div className="space-y-2">
        <p className="font-bold">Amount</p>
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
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
        )}
        {confirmClicked && value === "" && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
        )}
        {confirmClicked &&
          safeSubstraction(
            evmosBalance,
            BigNumber.from(FEE_STAKING_ACTIONS)
          ).lte(BigNumber.from(0)) && (
            <ErrorMessage
              text={MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext}
            />
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
          ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />}

        <p className="text-sm">
          {getReservedForFeeText(
            BigNumber.from(FEE_STAKING_ACTIONS),
            "EVMOS",
            "EVMOS"
          )}
        </p>
      </div>
      <p className="text-sm font-bold">
        Are you sure? You can&apos;t revert this decision.
      </p>
      <div className="flex justify-end space-x-2">
        <ConfirmButton
          text="Cancel Undelegation"
          onClick={handleConfirmButton}
          className="w-full px-4 text-sm"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
