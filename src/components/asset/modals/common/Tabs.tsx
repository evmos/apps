import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import {
  convertFromAtto,
  formatNumber,
} from "../../../../internal/asset/style/format";

const Tabs = ({
  cosmosBalance,
  erc20Balance,
  decimals,
  selected,
  setSelected,
}: {
  cosmosBalance: BigNumber;
  erc20Balance: BigNumber;
  decimals: number;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center w-full border border-darkGray1 bg-pearl justify-center rounded font-bold font-[IBM] ">
      <button
        className={`${
          selected ? "text-pearl bg-darkGray1 " : "text-darkGray1"
        }border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col`}
        onClick={() => {
          if (!selected) {
            setSelected(!selected);
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
          selected ? "text-darkGray1" : "text-pearl bg-darkGray1 "
        }border-r border-darkGray1 w-full h-full px-6 py-2 flex flex-col`}
        onClick={() => {
          if (selected) {
            setSelected(!selected);
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
