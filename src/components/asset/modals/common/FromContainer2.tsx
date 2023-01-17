import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  convertFromAtto,
  formatNumber,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import ErrorMessage from "./ErrorMessage";
import { BigNumber } from "ethers";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";

const NumericOnly = (value: string) => {
  const reg = /^[0-9.]+$/;
  const preval = value;
  if (value === "" || reg.test(value)) {
    return value;
  } else {
    value = preval.substring(0, preval.length - 1);
    return value;
  }
};

// type Fee = {
//   fee: BigNumber;
//   feeDenom: string;
//   feeBalance: BigNumber;
//   feeDecimals: number;
// };

type Balance = {
  denom: string;
  amount: BigNumber;
  decimals: number;
};

type Input = {
  value: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
};

type Style = {
  tokenTo: string;
  address: string;
  img: string;
  text: string;
};

type FromProps = {
  // fee: Fee;
  balance: Balance;
  input: Input;
  style: Style;
};

const FromContainer2 = ({ balance, input, style }: FromProps) => {
  // fees
  console.log(style);
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
            input.setInputValue(NumericOnly(e.target.value));
          }}
        />
      </div>
      {truncateNumber(input.value) === 0 && (
        <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext} />
      )}
      {input.confirmClicked && input.value === "" && (
        <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAmountEmpty} />
      )}
      {truncateNumber(input.value) >
        truncateNumber(
          NumericOnly(convertFromAtto(balance.amount, balance.decimals))
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
    </>
  );
};

export default FromContainer2;
