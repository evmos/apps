import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import {
  convertAndFormat,
  convertFromAtto,
  getReservedForFeeText,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import Dropdown from "../../dropdown/Dropdown";
import SmallButton from "../../../common/SmallButton";
import ContainerInput from "./ContainerInput";
import { ContainerModal } from "./ContainerModal";
import ErrorMessage from "./ErrorMessage";
import Note from "./Note";
import { TextSmall } from "./TextSmall";

const AmountWithdraw = ({
  data,
  setTokenTo,
  tokenTo,
  value,
  setValue,
  confirmClicked,
  setAddressTo,
}: {
  data: TableData;
  setTokenTo: Dispatch<SetStateAction<TableDataElement | undefined>>;
  tokenTo: TableDataElement | undefined;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
  setAddressTo: Dispatch<SetStateAction<string>>;
}) => {
  const fee = BigNumber.from("4600000000000000");
  const feeDenom = EVMOS_SYMBOL;

  const handleOnClickMax = () => {
    if (tokenTo !== undefined) {
      if (tokenTo.symbol.toUpperCase() !== feeDenom.toUpperCase()) {
        setValue(
          numericOnly(convertFromAtto(tokenTo.erc20Balance, tokenTo.decimals))
        );
      } else {
        const val = safeSubstraction(tokenTo.erc20Balance, fee);
        setValue(numericOnly(convertFromAtto(val, tokenTo.decimals)));
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
              setTokenTo={setTokenTo}
              setAddressTo={setAddressTo}
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
                numericOnly(
                  convertFromAtto(tokenTo.erc20Balance, tokenTo.decimals)
                )
              ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrosAmountGt} />}
        </div>
        <div className="space-y-2">
          {tokenTo !== undefined && tokenTo.handledByExternalUI === null && (
            <>
              <p className="font-bold text-sm">
                Available Balance:{" "}
                <span className="font-normal opacity-80">
                  {convertAndFormat(tokenTo.erc20Balance, tokenTo.decimals)}{" "}
                  {tokenTo.symbol}
                </span>
              </p>
              <Note
                text={getReservedForFeeText(
                  BigNumber.from(fee),
                  EVMOS_SYMBOL,
                  EVMOS_SYMBOL
                )}
              />
            </>
          )}
        </div>
      </>
    </ContainerModal>
  );
};

export default AmountWithdraw;
