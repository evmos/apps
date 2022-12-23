import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  convertFromAtto,
  formatNumber,
  safeSubstraction,
  truncateNumber,
} from "../../../../internal/asset/style/format";
import { truncateAddress } from "../../../../internal/wallet/style/format";
import ErrorMessage from "./ErrorMessage";
import { BigNumber } from "ethers";

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

type Fee = {
  fee: BigNumber;
  feeDenom: string;
  feeBalance: BigNumber;
  feeDecimals: number;
};

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
  fee: Fee;
  balance: Balance;
  input: Input;
  style: Style;
};

const FromContainer = ({ fee, balance, input, style }: FromProps) => {
  return (
    <>
      <div className="flex justify-between sm:items-center flex-col sm:flex-row">
        <div className="flex items-center space-x-10">
          <span className="font-bold">FROM</span>
          <div className="flex items-center space-x-3">
            <Image src={style.img} width={20} height={20} alt={style.img} />
            <span className="font-bold">{style.text}</span>
          </div>
        </div>
        {style.address && (
          <span className="opacity-80">{truncateAddress(style.address)}</span>
        )}
      </div>
      <div className="pr-5 pl-2 flex items-center space-x-3 bg-white hover:border-black focus-visible:border-black focus-within:border-black border border-darkGray5 rounded-lg">
        <input
          className="w-full p-3 border-none hover:border-none focus-visible:outline-none"
          type="text"
          value={input.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            input.setInputValue(NumericOnly(e.target.value));
            // TODO: should we use safeSubstraction here too?
          }}
        />
        <span className="opacity-80">{style.tokenTo}</span>
        <button
          onClick={() => {
            // TODO: not totally working. check
            if (style.tokenTo?.toUpperCase() !== fee.feeDenom.toUpperCase()) {
              input.setInputValue(
                NumericOnly(convertFromAtto(balance.amount, balance.decimals))
              );
            } else {
              // TODO: same unit
              const val = safeSubstraction(balance.amount, fee.fee);
              input.setInputValue(
                NumericOnly(convertFromAtto(val, balance.decimals))
              );
            }
          }}
          className="border border-black rounded-lg px-2 py-1 opacity-80 font-bold text-black"
        >
          MAX
        </button>
      </div>

      {truncateNumber(input.value) === 0 && (
        <ErrorMessage text="Amount to transfer can not be 0" />
      )}

      {input.confirmClicked && input.value === "" && (
        <ErrorMessage text="Amount can not be empty" />
      )}

      {truncateNumber(input.value) >
        truncateNumber(
          NumericOnly(convertFromAtto(balance.amount, balance.decimals))
        ) && <ErrorMessage text="Amount is bigger that the actual balance" />}
      <div>
        <span className="font-bold">Balance: </span>
        {formatNumber(convertFromAtto(balance.amount, balance.decimals))}{" "}
        {style.tokenTo}
      </div>
      <div>
        <span className="font-bold">Fee denom ({fee.feeDenom}) Balance: </span>
        {formatNumber(convertFromAtto(fee.feeBalance))} {fee.feeDenom}
      </div>
    </>
  );
};

export default FromContainer;
