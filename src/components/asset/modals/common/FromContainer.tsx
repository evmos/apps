import { BigNumber } from "@ethersproject/bignumber";
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

const NumericOnly = (value: string) => {
  //angka only
  const reg = /^[0-9.]+$/;
  const preval = value;
  if (value === "" || reg.test(value)) {
    return value;
  } else {
    value = preval.substring(0, preval.length - 1);
    return value;
  }
};

const FromContainer = ({
  token,
  address,
  amount,
  fee,
  decimals,
  feeDenom,
  img,
  text,
  value,
  tokenTo,
  setInputValue,
  feeBalance,
  confirmClicked,
}: {
  token: string;
  address: string;
  amount: BigNumber;
  fee: BigNumber;
  decimals: number;
  feeDenom: string;
  img: string;
  text?: string;
  value: string;
  tokenTo?: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  feeBalance: BigNumber;
  confirmClicked?: boolean;
}) => {
  return (
    <>
      <div className="flex justify-between sm:items-center flex-col sm:flex-row">
        <div className="flex items-center space-x-10">
          <span className="font-bold">FROM</span>
          <div className="flex items-center space-x-3">
            <Image src={img} width={20} height={20} alt={img} />
            <span className="font-bold">{text ? text : token}</span>
          </div>
        </div>
        {address && (
          <span className="opacity-80">{truncateAddress(address)}</span>
        )}
      </div>
      <div className="pr-5 pl-2 flex items-center space-x-3 bg-white hover:border-black focus-visible:border-black focus-within:border-black border border-darkGray5 rounded-lg">
        <input
          className="w-full p-3 border-none hover:border-none focus-visible:outline-none"
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(NumericOnly(e.target.value));
            // TODO: should we use safeSubstraction here too?
          }}
        />
        <span className="opacity-80">{tokenTo}</span>
        <button
          onClick={() => {
            // TODO: not totally working. check
            if (tokenTo?.toUpperCase() !== feeDenom.toUpperCase()) {
              setInputValue(NumericOnly(convertFromAtto(amount, decimals)));
            } else {
              // TODO: same unit
              const val = safeSubstraction(amount, fee);
              setInputValue(NumericOnly(convertFromAtto(val, decimals)));
            }
          }}
          className="border border-black rounded-lg px-2 py-1 opacity-80 font-bold text-black"
        >
          MAX
        </button>
      </div>

      {truncateNumber(value) === 0 && (
        <ErrorMessage text="Amount to transfer can not be 0" />
      )}

      {confirmClicked && value === "" && (
        <ErrorMessage text="Amount can not be empty" />
      )}

      {truncateNumber(value) >
        truncateNumber(NumericOnly(convertFromAtto(amount, decimals))) && (
        <ErrorMessage text="Amount is bigger that the actual balance" />
      )}
      <div>
        <span className="font-bold">Balance: </span>
        {formatNumber(convertFromAtto(amount, decimals))} {tokenTo}
      </div>
      <div>
        <span className="font-bold">Fee denom ({feeDenom}) Balance: </span>
        {formatNumber(convertFromAtto(feeBalance))} {feeDenom}
      </div>
    </>
  );
};

export default FromContainer;
