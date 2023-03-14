import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import { FEE_STAKING_ACTIONS } from "../../../../internal/asset/Helpers";
import {
  convertAndFormat,
  numericOnly,
  safeSubstraction,
  convertFromAtto,
  getReservedForFeeText,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import { useEvmosBalance } from "../../../../internal/staking/functionality/hooks/useEvmosBalance";
import { ModalDelegate } from "../../../../internal/staking/functionality/types";
import { StoreType } from "../../../../redux/Store";
import ContainerInput from "../../../asset/modals/common/ContainerInput";
import ErrorMessage from "../../../asset/modals/common/ErrorMessage";
import ConfirmButton from "../../../common/ConfirmButton";
import SmallButton from "../../../common/SmallButton";
import { useDelegation } from "../hooks/useDelegation";

export const Delegate = ({
  item,
  setShow,
  setShowDelegate,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShowDelegate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { evmosBalance } = useEvmosBalance();
  const [value, setValue] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const useDelegateProps = {
    value,
    setShow,
    wallet,
    item,
    setConfirmClicked,
    evmosBalance,
    setDisabled,
  };

  const { handleConfirmButton } = useDelegation(useDelegateProps);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="font-bold">Available Balance</p>
        <p>{convertAndFormat(evmosBalance)} EVMOS</p>
      </div>
      <div className="space-y-2">
        <p className="font-bold">Amount to delegate</p>
        <ContainerInput>
          <>
            <input
              className="w-full border-none hover:border-none focus-visible:outline-none text-right"
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
                const val = safeSubstraction(
                  evmosBalance,
                  BigNumber.from(FEE_STAKING_ACTIONS)
                );
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
        {truncateNumber(value) >
          truncateNumber(numericOnly(convertFromAtto(evmosBalance, 18))) && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />
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
            setShowDelegate(false);
          }}
        />
        <ConfirmButton
          text="Delegate"
          onClick={handleConfirmButton}
          className="w-fit text-sm px-4"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
