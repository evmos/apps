import { Dispatch, SetStateAction } from "react";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../internal/asset/style/format";

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
    <div className="space-y-5 w-fit mx-auto">
      {tableData?.table.map((item, index: number) => {
        const actionsProps = {
          item: item,
          setShow,
          setModalContent,
          tableData,
        };
        return (
          <div
            className="p-5 bg-darkGray2 rounded-lg space-y-3 w-[350px] sm:w-[450px] md:w-[600px]"
            key={index}
          >
            <Description symbol={item.symbol} description={item.description} />
            <div className="flex">
              <p className="opacity-80 w-full">ERC-20 Balance</p>
              <div className="flex justify-between w-full">
                <p className="font-bold">
                  {convertAndFormat(item.erc20Balance, item.decimals)}
                </p>
                <p>
                  $
                  {amountToDolars(
                    item.erc20Balance,
                    item.decimals,
                    item.coingeckoPrice
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex w-full">
                <p className="opacity-80 w-full">IBC Balance</p>
                <div className="flex justify-between w-full">
                  <p className="font-bold">
                    {convertAndFormat(item.cosmosBalance, item.decimals)}
                  </p>
                  <p>
                    $
                    {amountToDolars(
                      item.cosmosBalance,
                      item.decimals,
                      item.coingeckoPrice
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between flex-col space-y-2">
              <ButtonActions actionsProps={actionsProps} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentCard;
