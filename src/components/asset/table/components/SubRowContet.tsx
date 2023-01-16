import { BigNumber } from "ethers";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { Description } from "./Description";

type subRowType = {
  symbol: string;
  description: string;
  balance: BigNumber;
  decimals: number;
  coingeckoPrice: number;
  isERC20Balance?: boolean;
};

export const SubRowContent = ({ item }: { item: subRowType }) => {
  return (
    <div className="flex w-full">
      <div className="w-[5%]"></div>
      <Description
        symbol={
          item.isERC20Balance && item.symbol === EVMOS_SYMBOL
            ? "WEVMOS"
            : item.symbol
        }
        description={item.description}
        subRow={true}
      />
      <div className="flex flex-col items-start uppercase w-[50%]">
        <span className="font-bold">
          {convertAndFormat(item.balance, item.decimals)}
        </span>
        <span className="text-sm text-darkGray5">
          {amountToDolars(item.balance, item.decimals, item.coingeckoPrice)}
        </span>
      </div>
    </div>
  );
};
