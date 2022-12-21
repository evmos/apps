import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction } from "react";
import {
  convertFromAtto,
  formatNumber,
} from "../../../../internal/asset/style/format";

const Tabs = ({
  cosmosBalance,
  erc20Balance,
  decimals,
  selectedERC20,
  setSelectedERC20,
}: {
  cosmosBalance: BigNumber;
  erc20Balance: BigNumber;
  decimals: number;
  selectedERC20: boolean;
  setSelectedERC20: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center w-full border border-darkGray1 bg-pearl justify-center rounded font-bold font-[IBM] ">
      <button
        className={`${
          selectedERC20 ? "text-pearl bg-darkGray1 " : "text-darkGray1"
        }border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col`}
        onClick={() => {
          if (!selectedERC20) {
            setSelectedERC20(!selectedERC20);
          }
        }}
      >
        <span>ERC-20</span>
        <span className="font-normal text-xs">
          {" "}
          {formatNumber(convertFromAtto(erc20Balance, decimals))}
        </span>
      </button>
      <button
        className={`${
          selectedERC20 ? "text-darkGray1" : "text-pearl bg-darkGray1 "
        }border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col`}
        onClick={() => {
          if (selectedERC20) {
            setSelectedERC20(!selectedERC20);
          }
        }}
      >
        <span>IBC</span>
        <span className="font-normal text-xs">
          {formatNumber(convertFromAtto(cosmosBalance, decimals))}
        </span>
      </button>
    </div>
  );
};

export default Tabs;
