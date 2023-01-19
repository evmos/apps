import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import {
  convertFromAtto,
  formatNumber,
} from "../../../../internal/asset/style/format";
import QuestionMarkIcon from "../../../common/images/icons/QuestionMarkIcon";
import Tooltip from "../../../common/Tooltip";

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
  const v10Link =
    "https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10";
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
        <p className="flex items-center space-x-1">
          <span>ERC-20</span>
          <Tooltip
            className="w-24"
            element={<QuestionMarkIcon width={20} height={20} />}
            text={
              <>
                Since{" "}
                <Link
                  className="text-red"
                  href={v10Link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  v10
                </Link>{" "}
                upgrade, all withdraws will pull first from IBC token balance
                before ERC-20.
              </>
            }
          />
        </p>
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
