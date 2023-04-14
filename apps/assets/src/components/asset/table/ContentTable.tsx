import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import { addAssets, addDollarAssets, formatNumber } from "helpers";
import { EVMOS_SYMBOL } from "evmos-wallet";
import { Accordion } from "ui-helpers";
import { RowContent } from "./components/RowContent";
import { SubRowContent } from "./components/SubRowContent";
import { ContentTableProps } from "./types";

type accordionData = {
  name: string;
  icon: string;
  total: BigNumber;
  tokens: TableDataElement[];
};

const createSubRow = (
  item: TableDataElement,
  setShow: Dispatch<SetStateAction<boolean>>,
  setModalContent: Dispatch<SetStateAction<JSX.Element>>,
  feeBalance: BigNumber,
  isIBCBalance: boolean
) => {
  return (
    <div
      className="subrow w-full bg-darkGray2"
      key={isIBCBalance ? item.symbol.toLocaleLowerCase() : item.symbol}
    >
      <SubRowContent
        item={item}
        setShow={setShow}
        setModalContent={setModalContent}
        feeBalance={feeBalance}
        isIBCBalance={isIBCBalance}
      />
    </div>
  );
};

const ContentTable = ({
  tableData,
  setShow,
  setModalContent,
}: ContentTableProps) => {
  const data = useMemo(() => {
    const map = new Map<string, accordionData>();
    tableData?.table.map((e) => {
      if (
        e.chainIdentifier === "Stride" &&
        map.has(e.chainIdentifier) === true
      ) {
        const temp = map.get(e.chainIdentifier);
        if (temp === undefined) {
          return;
        }
        temp.tokens.push(e);
        temp.total = temp.total.add(e.erc20Balance);
      } else if (e.chainIdentifier === "Stride") {
        map.set(e.chainIdentifier, {
          name: e.chainIdentifier,
          icon: e.chainIdentifier,
          total: e.erc20Balance,
          tokens: [e],
        });
      } else if (map.has(e.tokenIdentifier) === true) {
        const temp = map.get(e.tokenIdentifier);
        if (temp === undefined) {
          return;
        }
        temp.tokens.push(e);
        temp.total = temp.total.add(e.erc20Balance);
      } else {
        map.set(e.tokenIdentifier, {
          name: e.tokenIdentifier,
          icon: e.tokenIdentifier,
          total: e.erc20Balance,
          tokens: [e],
        });
      }
    });

    return map;
  }, [tableData?.table]);

  const renderData = useMemo(() => {
    const ret: JSX.Element[] = [];

    data.forEach((v, k) => {
      let content: JSX.Element[] | null = null;

      let valueInDollars = 0;
      let valueInTokens = 0;

      content = [];
      v.tokens.map((e) => {
        if (e.symbol === EVMOS_SYMBOL) {
          content?.unshift(
            createSubRow(
              e,
              setShow,
              setModalContent,
              tableData.feeBalance,
              false
            )
          );
          content?.unshift(
            createSubRow(
              e,
              setShow,
              setModalContent,
              tableData.feeBalance,
              true
            )
          );
        } else {
          content?.push(
            createSubRow(
              e,
              setShow,
              setModalContent,
              tableData.feeBalance,
              false
            )
          );
        }
        valueInTokens += addAssets({
          erc20Balance: e.erc20Balance,
          decimals: e.decimals,
          cosmosBalance: e.cosmosBalance,
        });
        valueInDollars += addDollarAssets({
          erc20Balance: e.erc20Balance,
          decimals: e.decimals,
          coingeckoPrice: e.coingeckoPrice,
          cosmosBalance: e.cosmosBalance,
        });
      });

      ret.push(
        <Accordion
          key={k}
          content={
            content ? (
              <div className="flex w-full flex-col space-y-5">{content}</div>
            ) : null
          }
          title={
            <RowContent
              symbol={v.name}
              imgSrc={`/assets/tokenIdentifier/${v.icon.toLocaleLowerCase()}.png`}
              valueInTokens={formatNumber(valueInTokens)}
              valueInDollars={valueInDollars.toFixed(2)}
            />
          }
        />
      );
    });
    return ret;
  }, [data, setModalContent, setShow, tableData.feeBalance]);

  return <div className="flex w-full flex-col">{renderData}</div>;
};

export default ContentTable;
