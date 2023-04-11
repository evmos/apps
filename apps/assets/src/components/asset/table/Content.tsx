import { Dispatch, SetStateAction } from "react";
import {
  amountToDollars,
  convertAndFormat,
} from "../../../internal/asset/style/format";
import { TableData } from "../../../internal/asset/functionality/table/normalizeData";
import { Description } from "./components/Description";
import { ButtonActions } from "./components/ButtonActions";

const Content = ({
  tableData,
  setShow,
  setModalContent,
}: {
  tableData: TableData;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
}) => {
  return (
    <tbody>
      {tableData?.table.map((item, index: number) => {
        const actionsProps = {
          item,
          setShow,
          setModalContent,
          tableData,
        };
        return (
          <tr
            className={`${
              tableData?.table.length > 2 ? "asset" : "assetOneItem"
            }`}
            key={index}
          >
            <td>
              <Description
                symbol={item.symbol}
                description={item.description}
              />
            </td>
            <td>
              <div className="flex flex-col items-start uppercase">
                <span className="font-bold">
                  {convertAndFormat(item.erc20Balance, item.decimals)}
                  {item.symbol.toUpperCase() === "EVMOS" ? " WEVMOS" : ""}
                </span>
                <span className="text-sm text-darkGray5">
                  $
                  {amountToDollars(
                    item.erc20Balance,
                    item.decimals,
                    item.coingeckoPrice
                  )}
                </span>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-start uppercase">
                <span className="font-bold">
                  {convertAndFormat(item.cosmosBalance, item.decimals)}
                </span>
                <span className="text-sm text-darkGray5">
                  $
                  {amountToDollars(
                    item.cosmosBalance,
                    item.decimals,
                    item.coingeckoPrice
                  )}
                </span>
              </div>
            </td>

            <td>
              <div className="flex justify-center space-x-3">
                <ButtonActions actionsProps={actionsProps} />
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Content;
