import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import {
  convertAndFormat,
  convertFromAtto,
  createBigNumber,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import Dropdown from "../../dropdown/Dropdown";
import SmallButton from "../../../common/SmallButton";
import ContainerInput from "./ContainerInput";
import { ContainerModal } from "./ContainerModal";
import ErrorMessage from "./ErrorMessage";
import Note from "./Note";
import { TextSmall } from "./TextSmall";

type Fee = {
  fee: BigNumber;
  feeDenom: string | undefined;
  feeBalance: BigNumber;
  feeDecimals: number | undefined;
};

const AmountDeposit = ({
  data,
  setTokenTo,
  tokenTo,
  value,
  setValue,
  confirmClicked,
  setAddressTo,
  balance,
  fee,
}: {
  data: TableData;
  setTokenTo: Dispatch<SetStateAction<TableDataElement | undefined>>;
  tokenTo: TableDataElement | undefined;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
  setAddressTo: Dispatch<SetStateAction<string>>;
  balance: BigNumber;
  fee: Fee;
}) => {
  const feeDeposit = "5000";
  const [maxClicked, setMaxClicked] = useState(false);

  const handleOnClickMax = () => {
    if (tokenTo !== undefined && fee.feeDenom !== undefined) {
      if (tokenTo.symbol.toUpperCase() !== fee.feeDenom.toUpperCase()) {
        setValue(numericOnly(convertFromAtto(balance, tokenTo.decimals)));
        setMaxClicked(true);
      } else {
        const val = safeSubstraction(balance, fee.fee);
        setValue(numericOnly(convertFromAtto(val, tokenTo.decimals)));
        setMaxClicked(true);
      }
    }
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(numericOnly(e.target.value));
  };
  return (
    <ContainerModal>
      <>
        {tokenTo === undefined || tokenTo.handledByExternalUI === null ? (
          <TextSmall text="AMOUNT" />
        ) : (
          <TextSmall text="SELECT BRIDGE" />
        )}
        {tokenTo !== undefined && tokenTo.handledByExternalUI !== null && (
          <Note
            text="We currently do not offer transfers directly from Ethereum. For now,
        here area few options that will allow you to withdraw from Evmos"
          />
        )}
        <ContainerInput>
          <>
            <Dropdown
              placeholder="Select token..."
              data={data}
              setToken={setTokenTo}
              setAddress={setAddressTo}
              setValue={setValue}
            />

            {tokenTo === undefined || tokenTo.handledByExternalUI === null ? (
              <>
                <input
                  className="w-full  border-none hover:border-none focus-visible:outline-none text-right"
                  type="text"
                  placeholder="amount"
                  value={value}
                  onChange={handleOnChangeInput}
                />
                <SmallButton text="MAX" onClick={handleOnClickMax} />
              </>
            ) : (
              ""
            )}
          </>
        </ContainerInput>
        <div className="flex flex-col">
          {confirmClicked && tokenTo === undefined && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorTokenEmpty} />
          )}
          {truncateNumber(value) === 0 && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
          )}
          {confirmClicked && value === "" && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
          )}
          {tokenTo !== undefined &&
            tokenTo.handledByExternalUI === null &&
            truncateNumber(value) >
              truncateNumber(
                numericOnly(convertFromAtto(balance, tokenTo.decimals))
              ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrosAmountGt} />}
        </div>
        <div className="space-y-2">
          {tokenTo !== undefined && tokenTo.handledByExternalUI === null && (
            <>
              <p className="font-bold text-sm">
                Available Balance:{" "}
                <span className="font-normal opacity-80">
                  {convertAndFormat(balance, tokenTo.decimals)} {tokenTo.symbol}
                </span>
              </p>
            </>
          )}
        </div>
        {fee.fee.eq(createBigNumber(feeDeposit)) &&
          maxClicked &&
          tokenTo !== undefined && (
            <div className="text-xs font-bold opacity-80">
              {`Clicking on max reserves ${feeDeposit} * 10^-${tokenTo?.decimals} ${tokenTo?.symbol} for transaction fees.`}
            </div>
          )}
      </>
    </ContainerModal>
  );
};

export default AmountDeposit;
