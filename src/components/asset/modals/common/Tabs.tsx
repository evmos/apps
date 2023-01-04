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
  isERC20Selected,
  setIsERC20Selected,
}: {
  cosmosBalance: BigNumber;
  erc20Balance: BigNumber;
  decimals: number;
  isERC20Selected: boolean;
  setIsERC20Selected: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center w-full border border-darkGray1 bg-pearl justify-center rounded font-bold font-[IBM] ">
      <button
        className={`${
          isERC20Selected ? " text-pearl bg-darkGray1" : "text-darkGray1"
        } border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col items-center`}
        onClick={() => {
          if (!isERC20Selected) {
            setIsERC20Selected(true);
          }
        }}
      >
        <span>ERC-20</span>
        <span className="font-normal text-xs">
          {formatNumber(convertFromAtto(erc20Balance, decimals))}
        </span>
      </button>
      <button
        className={`${
          !isERC20Selected ? "text-pearl bg-darkGray1 " : "text-darkGray1"
        } border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col items-center`}
        onClick={() => {
          if (isERC20Selected) {
            setIsERC20Selected(false);
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
