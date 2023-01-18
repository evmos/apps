import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import {
  addAssets,
  addDolarAssets,
  formatNumber,
} from "../../../../internal/asset/style/format";
import { Description } from "./Description";

export const RowContent = ({ item }: { item: TableDataElement }) => {
  return (
    <div className="flex w-full">
      <Description symbol={item.symbol} description={item.description} />
      <div className="flex flex-col items-start uppercase w-[50%]">
        <span className="font-bold">
          {formatNumber(
            addAssets({
              erc20Balance: item.erc20Balance,
              decimals: item.decimals,
              cosmosBalance: item.cosmosBalance,
            })
          )}
        </span>
        <span className="text-sm text-darkGray5">
          {addDolarAssets({
            erc20Balance: item.erc20Balance,
            decimals: item.decimals,
            coingeckoPrice: item.coingeckoPrice,
            cosmosBalance: item.cosmosBalance,
          }).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
