import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import {
  numericOnly,
  safeSubstraction,
  convertFromAtto,
  getReservedForFeeText,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import { ModalDelegate } from "../../../../internal/staking/functionality/types";
import { StoreType } from "../../../../redux/Store";
import ContainerInput from "../../../asset/modals/common/ContainerInput";
import ErrorMessage from "../../../asset/modals/common/ErrorMessage";
import ConfirmButton from "../../../common/ConfirmButton";
import SmallButton from "../../../common/SmallButton";
import { useUndelegation } from "../hooks/useUndelegations";

export const Undelegate = ({
  item,
  setShow,
  setShowUndelegate,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShowUndelegate: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const useUndelegateProps = {
    value,
    setShow,
    wallet,
    item,
    setConfirmClicked,
  };

  const { handleConfirmButton } = useUndelegation(useUndelegateProps);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="font-bold">Amount to Undelegate</p>
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
                  BigNumber.from(item.balance),
                  // TODO: amount fee?
                  BigNumber.from("4600000000000000")
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
          truncateNumber(
            numericOnly(convertFromAtto(BigNumber.from(item.balance), 18))
          ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />}
        {/* TODO: fee amount? */}
        <p className="text-sm">
          {getReservedForFeeText(
            BigNumber.from("4600000000000000"),
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
          className="w-fit text-sm px-4"
        />
      </div>
    </div>
  );
};
