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
import ValidatorsDropdown from "../../dropdown/ValidatorsDropdown";
import { useRedelegation } from "../hooks/useRedelegation";

export const Redelegate = ({
  item,
  setShow,
  setShowRedelegate,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShowRedelegate: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  const [validator, setValidator] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [isValidatorSelected, setIsValidatorSelected] = useState(false);
  const useRedelegateProps = {
    value,
    setShow,
    wallet,
    item,
    setConfirmClicked,
  };

  const { handleConfirmButton } = useRedelegation(useRedelegateProps);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="font-bold">Amount to Redelegate</p>
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

        <p className="font-bold">Validator to Redelegate</p>
        <ValidatorsDropdown
          setValidator={setValidator}
          setIsValidatorSelected={setIsValidatorSelected}
        />
        {confirmClicked && (validator === "" || !isValidatorSelected) && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorValidatorEmpty} />
        )}
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
            setShowRedelegate(false);
          }}
        />
        <ConfirmButton
          text="Redelegate"
          onClick={handleConfirmButton}
          className="w-fit text-sm px-4"
          disabled={confirmClicked}
        />
      </div>
    </div>
  );
};
