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
import Dropdown from "../../../common/Dropdown";
import SmallButton from "../../../common/SmallButton";

import { ContainerModal } from "./ContainerModal";
import ErrorMessage from "./ErrorMessage";
import { TextSmall } from "./TextSmall";

const AmountWithdraw = ({
  data,
  setTokenTo,
  tokenTo,
  value,
  setValue,
  confirmClicked,
}: {
  data: TableData;
  setTokenTo: Dispatch<SetStateAction<TableDataElement | undefined>>;
  tokenTo: TableDataElement | undefined;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
}) => {
  const fee = BigNumber.from("4600000000000000");
  const feeDenom = EVMOS_SYMBOL;
  // const [maxClicked, setMaxClicked] = useState(false);

  return (
    <ContainerModal>
      <>
        <TextSmall text="AMOUNT" />
        <div className="pr-5 pl-4 flex items-center space-x-3 bg-white hover:border-darkGray5 focus-visible:border-darkGray5 focus-within:border-darkGray5 border border-darkGray5 rounded">
          <Dropdown
            placeholder="Select token..."
            data={data}
            setTokenTo={setTokenTo}
          />
          <input
            className="w-full p-3 border-none hover:border-none focus-visible:outline-none text-right"
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
              if (tokenTo !== undefined) {
                if (tokenTo.symbol.toUpperCase() !== feeDenom.toUpperCase()) {
                  setValue(
                    numericOnly(
                      convertFromAtto(tokenTo.erc20Balance, tokenTo.decimals)
                    )
                  );
                } else {
                  // setMaxClicked(true);
                  const val = safeSubstraction(tokenTo.erc20Balance, fee);
                  setValue(numericOnly(convertFromAtto(val, tokenTo.decimals)));
                }
              }
            }}
          />
        </div>
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
            truncateNumber(value) >
              truncateNumber(
                numericOnly(
                  convertFromAtto(tokenTo.erc20Balance, tokenTo.decimals)
                )
              ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrosAmountGt} />}
        </div>
        <div className="space-y-2">
          {tokenTo !== undefined && (
            <>
              <p className="font-bold text-sm">
                Available Balance:{" "}
                <span className="font-normal opacity-80">
                  {convertAndFormat(tokenTo.erc20Balance, tokenTo.decimals)}{" "}
                  {tokenTo.symbol}
                </span>
              </p>
              <div className="text-xs opacity-80">
                {getReservedForFeeText(
                  BigNumber.from(fee),
                  EVMOS_SYMBOL,
                  EVMOS_SYMBOL
                )}
              </div>
            </>
          )}
        </div>
      </>
    </ContainerModal>
  );
};

export default AmountWithdraw;
