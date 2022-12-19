import { BigNumber } from "ethers";
import Image from "next/image";
import { useState } from "react";
import {
  convertFromAtto,
  formatNumber,
  safeSubstraction,
} from "../../../../internal/asset/style/format";
import { truncateAddress } from "../../../../internal/wallet/style/format";

const FromContainer = ({
  token,
  address,
  amount,
  fee,
  decimals,
  feeDenom,
  img,
  text,
}: {
  token: string;
  address: string;
  amount: BigNumber;
  fee: BigNumber;
  decimals: number;
  feeDenom: string;
  img: string;
  text?: string;
}) => {
  const [inputValue, setInputValue] = useState("");
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
          type="number"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            // chequear tmb el amount - fee?
          }}
        />
        <span className="opacity-80">{token}</span>
        <button
          onClick={() => {
            // throw "not implemented"
            if (token.toUpperCase() === feeDenom.toUpperCase()) {
              setInputValue(formatNumber(convertFromAtto(amount, decimals)));
            } else {
              // ponerlo en la misma unidad
              const val = safeSubstraction(amount, fee);
              setInputValue(val.toString());
            }
          }}
          className="border border-black rounded-lg px-2 py-1 opacity-80 font-bold text-black"
        >
          MAX
        </button>
      </div>
      {inputValue === "0" && (
        <p className="text-red text-xs italic pl-2">
          Amount to transfer can not be 0.
        </p>
      )}
      <div>
        <span className="font-bold">Balance: </span>
        {formatNumber(convertFromAtto(amount, decimals))} {token}
      </div>
    </>
  );
};

export default FromContainer;
