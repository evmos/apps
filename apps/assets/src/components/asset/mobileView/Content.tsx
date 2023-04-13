import { Dispatch, SetStateAction } from "react";
import { amountToDollars, convertAndFormat } from "helpers";
import { TableData } from "../../../internal/asset/functionality/table/normalizeData";

import { Description } from "../table/components/Description";
import { ButtonActions } from "../table/components/ButtonActions";

const ContentCard = ({
  tableData,
  setShow,
  setModalContent,
}: {
  tableData: TableData;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
}) => {
  return (
    <div className="mx-auto w-fit space-y-5">
      {tableData?.table.map((item, index: number) => {
        const actionsProps = {
          item: item,
          setShow,
          setModalContent,
          tableData,
        };
        return (
          <div
            className="w-[350px] space-y-3 rounded-lg bg-darkGray2 p-5 sm:w-[450px] md:w-[600px]"
            key={index}
          >
            <Description symbol={item.symbol} description={item.description} />
            <div className="flex">
              <p className="w-full opacity-80">ERC-20 Balance</p>
              <div className="flex w-full justify-between">
                <p className="font-bold">
                  {convertAndFormat(item.erc20Balance, item.decimals)}
                </p>
                <p>
                  $
                  {amountToDollars(
                    item.erc20Balance,
                    item.decimals,
                    item.coingeckoPrice
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex w-full">
                <p className="w-full opacity-80">IBC Balance</p>
                <div className="flex w-full justify-between">
                  <p className="font-bold">
                    {convertAndFormat(item.cosmosBalance, item.decimals)}
                  </p>
                  <p>
                    $
                    {amountToDollars(
                      item.cosmosBalance,
                      item.decimals,
                      item.coingeckoPrice
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-2">
              <ButtonActions actionsProps={actionsProps} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentCard;
