import Image from "next/image";
import { useState } from "react";
import {
  convertFromAtto,
  createBigNumber,
  formatNumber,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "../../../../../internal/asset/style/format";
import ErrorMessage from "../ErrorMessage";
import { MODAL_NOTIFICATIONS } from "evmos-wallet";
import { FromProps } from "../types";
import ContainerInput from "../ContainerInput";
import SmallButton from "../../../../common/SmallButton";

const FromConvert = ({ fee, balance, input, style }: FromProps) => {
  const feeDeposit = "5000";
  const [maxClicked, setMaxClicked] = useState(false);

  return (
    <>
      <ContainerInput>
        <>
          <Image
            src={style.img}
            width={20}
            height={20}
            alt={style.img}
            className="w-auto"
          />
          <span className="font-bold uppercase">{style.text}</span>
          <input
            className="w-full border-none hover:border-none focus-visible:outline-none text-right"
            type="text"
            placeholder="amount"
            value={input.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              input.setInputValue(numericOnly(e.target.value));
            }}
          />
          <SmallButton
            text="MAX"
            onClick={() => {
              if (style.tokenTo?.toUpperCase() !== fee.feeDenom.toUpperCase()) {
                input.setInputValue(
                  numericOnly(convertFromAtto(balance.amount, balance.decimals))
                );
              } else {
                setMaxClicked(true);
                const val = safeSubstraction(balance.amount, fee.fee);
                input.setInputValue(
                  numericOnly(convertFromAtto(val, balance.decimals))
                );
              }
            }}
          />
        </>
      </ContainerInput>
      {truncateNumber(input.value) === 0 && (
        <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
      )}
      {input.confirmClicked && input.value === "" && (
        <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
      )}
      {truncateNumber(input.value) >
        truncateNumber(
          numericOnly(convertFromAtto(balance.amount, balance.decimals))
        ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorsAmountGt} />}
      <div>
        <p className="font-bold text-sm">
          Available Balance:{" "}
          <span className="font-normal opacity-80">
            {formatNumber(convertFromAtto(balance.amount, balance.decimals))}{" "}
            {style.tokenTo}
          </span>
        </p>
      </div>
      {fee.fee.eq(createBigNumber(feeDeposit)) && maxClicked && (
        <div className="text-xs font-bold opacity-80">
          {`Clicking on max reserves ${feeDeposit} * 10^-${fee.feeDecimals} ${fee.feeDenom} for transaction fees.`}
        </div>
      )}
    </>
  );
};

export default FromConvert;
