import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useMemo } from "react";
import { EVMOSIBCBalances } from "../../../internal/asset/functionality/fetch";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import {
  addAssets,
  addDolarAssets,
  amountToDolars,
  formatNumber,
  NumberConvertAndFormat,
} from "../../../internal/asset/style/format";
import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Accordion from "../../common/Accordion";
import { RowContent } from "./components/RowContent";
import { SubRowContent } from "./components/SubRowContent";
import SubRowContentEvmos from "./components/SubRowContentEvmos";
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
      className="bg-darkGray2 w-full "
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

const createSubRowEvmos = (value: EVMOSIBCBalances) => {
  return (
    <div className="bg-darkGray2 w-full" key={value.chain}>
      <SubRowContentEvmos values={value} />
    </div>
  );
};

const ContentTable = ({
  tableData,
  setShow,
  setModalContent,
  evmosIBCBalancesData,
}: ContentTableProps) => {
  const data = useMemo(() => {
    const map = new Map<string, accordionData>();
    tableData?.table.map((e) => {
      if (map.has(e.tokenIdentifier) === true) {
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
      let amountEvmos = BIG_ZERO;
      v.tokens.map((e) => {
        if (e.symbol === EVMOS_SYMBOL) {
          evmosIBCBalancesData?.values?.map((item) => {
            item.coingeckoPrice = e.coingeckoPrice;
            content?.push(createSubRowEvmos(item));
            amountEvmos = amountEvmos.add(BigNumber.from(item.evmosBalance));
          });
        }
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
        valueInDollars += addDolarAssets({
          erc20Balance: e.erc20Balance,
          decimals: e.decimals,
          coingeckoPrice: e.coingeckoPrice,
          cosmosBalance: e.cosmosBalance,
        });

        valueInTokens =
          NumberConvertAndFormat(amountEvmos, e.decimals) + valueInTokens;

        valueInDollars =
          parseFloat(
            amountToDolars(amountEvmos, e.decimals, e.coingeckoPrice)
          ) + valueInDollars;
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
  }, [
    data,
    setModalContent,
    setShow,
    tableData.feeBalance,
    evmosIBCBalancesData,
  ]);

  return <div className="flex flex-col w-full">{renderData}</div>;
};

export default ContentTable;
