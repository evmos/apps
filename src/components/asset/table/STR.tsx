import { TableData } from "../../../internal/asset/functionality/table/normalizeData";

import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Accordion from "../../common/Accordion";
import { RowContent } from "./components/RowContent";
import { SubRowContent } from "./components/SubRowContet";

export const STR = ({ tableData }: { tableData: TableData }) => {
  return (
    <div className="flex flex-col w-full">
      {tableData?.table.map((item, index: number) => {
        let cont: JSX.Element | string = "";
        if (item.symbol === EVMOS_SYMBOL) {
          cont = (
            <div className="flex w-full flex-col space-y-5 ">
              <div className="bg-darkGray2 w-full border-b-2 border-b-black pb-5">
                <SubRowContent
                  item={{
                    symbol: item.symbol,
                    description: item.description,
                    balance: item.cosmosBalance,
                    decimals: item.decimals,
                    coingeckoPrice: item.coingeckoPrice,
                  }}
                />
              </div>
              <div className="bg-darkGray2 w-full ">
                <SubRowContent
                  item={{
                    symbol: item.symbol,
                    description: item.description,
                    balance: item.erc20Balance,
                    decimals: item.decimals,
                    coingeckoPrice: item.coingeckoPrice,
                    isERC20Balance: true,
                  }}
                />
              </div>
            </div>
          );
        }
        return (
          <Accordion
            className={``}
            key={index}
            title={<RowContent item={item} />}
            content={cont}
          />
        );
      })}
    </div>
  );
};
