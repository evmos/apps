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

import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";
import { useEvmosBalance } from "../../../../internal/staking/functionality/hooks/useEvmosBalance";
import { ModalDelegate } from "../../../../internal/staking/functionality/types";
import { ConfirmButton } from "confirm-button";
import { SmallButton } from "small-button";
import { useUndelegation } from "../hooks/useUndelegations";
import { FEE_STAKING_ACTIONS } from "constants-helper";
import { ErrorMessage } from "error-message";
import { ContainerInput } from "container-input";

export const Undelegate = ({
  item,
  setShow,
  setShowUndelegate,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShowUndelegate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { evmosBalance } = useEvmosBalance();
  const [value, setValue] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const useUndelegateProps = {
    value,
    setShow,
    wallet,
    item,
    setConfirmClicked,
    setDisabled,
  };

  const { handleConfirmButton } = useUndelegation(useUndelegateProps);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="font-bold">Amount to Undelegate</p>
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
                  item.balance !== "" ? BigNumber.from(item.balance) : BIG_ZERO;
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
          ).lte(BIG_ZERO) && (
            <ErrorMessage
              text={MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext}
            />
          )}
        {truncateNumber(value) >
          truncateNumber(
            numericOnly(
              convertFromAtto(
                item.balance !== "" ? BigNumber.from(item.balance) : BIG_ZERO,
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
      <div className="flex justify-end space-x-2">
        <SmallButton
          className="w-fit"
          text="BACK"
          onClick={() => {
            setShowUndelegate(false);
          }}
        />
        <ConfirmButton
          text="Undelegate"
          onClick={handleConfirmButton}
          className="w-fit px-4 text-sm"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
