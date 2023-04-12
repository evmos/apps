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
} from "../../../../internal/common/helpers/style";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";
import { useEvmosBalance } from "../../../../internal/staking/functionality/hooks/useEvmosBalance";
import { ModalDelegate } from "../../../../internal/staking/functionality/types";
import ConfirmButton from "../../../common/ConfirmButton";
import SmallButton from "../../../common/SmallButton";
import ValidatorsDropdown from "../../dropdown/ValidatorsDropdown";
import { useRedelegation } from "../hooks/useRedelegation";
import { FEE_STAKING_ACTIONS } from "constants-helper";
import ErrorMessage from "../../../common/ErrorMessage";
import ContainerInput from "../../../common/ContainerInput";

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

        <p className="font-bold">Validator to Redelegate</p>
        <ValidatorsDropdown
          setValidator={setValidator}
          setIsValidatorSelected={setIsValidatorSelected}
          validatorName={item.moniker.toLowerCase()}
        />
        {confirmClicked && (validator === "" || !isValidatorSelected) && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorValidatorEmpty} />
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
