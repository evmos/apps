import Image from "next/image";
import { useState } from "react";
import {
  convertFromAtto,
  createBigNumber,
  formatNumber,
  numericOnly,
  safeSubstraction,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import ErrorMessage from "./ErrorMessage";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import { FromProps } from "./types";

const FromContainer2 = ({ fee, balance, input, style }: FromProps) => {
  const feeDeposit = "5000";
  const [maxClicked, setMaxClicked] = useState(false);

  return (
    <>
      <div className="flex justify-between sm:items-center flex-col sm:flex-row"></div>
      <div className="pr-5 pl-4 flex items-center space-x-3 bg-white hover:border-darkGray5 focus-visible:border-darkGray5 focus-within:border-darkGray5 border border-darkGray5 rounded">
        <Image src={style.img} width={20} height={20} alt={style.img} />
        <span className="font-bold uppercase">{style.text}</span>
        <input
          className="w-full p-3 border-none hover:border-none focus-visible:outline-none text-right"
          type="text"
          value={input.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            input.setInputValue(numericOnly(e.target.value));
          }}
        />
        <button
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
          className="border border-black rounded p-1 opacity-80 font-bold text-black text-xs"
        >
          MAX
        </button>
      </div>
      {truncateNumber(input.value) === 0 && (
        <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
      )}
      {input.confirmClicked && input.value === "" && (
        <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
      )}
      {truncateNumber(input.value) >
        truncateNumber(
          numericOnly(convertFromAtto(balance.amount, balance.decimals))
        ) && <ErrorMessage text={MODAL_NOTIFICATIONS.ErrosAmountGt} />}
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

export default FromContainer2;
