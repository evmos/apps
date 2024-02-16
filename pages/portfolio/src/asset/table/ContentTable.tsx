// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction, useMemo } from "react";

import { amountToDollars, convertFromAtto, formatNumber } from "helpers";
import { Accordion } from "@evmosapps/ui-helpers";
import { RowContent } from "./components/RowContent";
import { SubRowContent } from "./components/SubRowContent";
import { ContentTableProps } from "./types";
import { TableDataElement } from "../../utils/table/normalizeData";

type accordionData = {
  name: string;
  icon: string;
  total: BigNumber;
  tokens: TableDataElement[];
  img: string;
};

const createSubRow = (
  item: TableDataElement,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setModalContent: Dispatch<SetStateAction<JSX.Element>>,
  feeBalance: BigNumber,
) => {
  return (
    <div className="subrow w-full" key={item.symbol}>
      <SubRowContent
        item={item}
        setIsOpen={setIsOpen}
        setModalContent={setModalContent}
        feeBalance={feeBalance}
      />
    </div>
  );
};

const ContentTable = ({
  tableData,
  setIsOpen,
  setModalContent,
}: ContentTableProps) => {
  const data = useMemo(() => {
    // TODO: We'll use the Evmos price for stEvmos until they add it on Coingecko
    const map = new Map<string, accordionData>();
    tableData?.table.map((e) => {
      if (
        (e.chainIdentifier === "Stride" &&
          map.has(e.chainIdentifier) === true) ||
        (e.chainIdentifier === "Quicksilver" &&
          map.has(e.chainIdentifier) === true)
      ) {
        const temp = map.get(e.chainIdentifier);
        if (temp === undefined) {
          return;
        }
        temp.tokens.push(e);
        temp.total = temp.total.add(e.erc20Balance);
      } else if (
        e.chainIdentifier === "Stride" ||
        e.chainIdentifier === "Quicksilver"
      ) {
        map.set(e.chainIdentifier, {
          name: e.chainIdentifier,
          icon: e.chainIdentifier,
          total: e.erc20Balance,
          img: e.pngSrc,
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
          img: e.pngSrc,
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
        content?.push(
          createSubRow(e, setIsOpen, setModalContent, tableData.feeBalance),
        );

        valueInTokens += Number(convertFromAtto(e.erc20Balance, e.decimals));

        valueInDollars += parseFloat(
          amountToDollars(e.erc20Balance, e.decimals, e.coingeckoPrice),
        );
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
              imgSrc={`/tokenIdentifier/${v.icon
                .toLowerCase()
                .replace(/\s/g, "")}.png`}
              valueInTokens={formatNumber(valueInTokens, 6)}
              valueInDollars={valueInDollars.toFixed(2)}
            />
          }
        />,
      );
    });
    return ret;
  }, [data, setModalContent, setIsOpen, tableData.feeBalance]);

  return renderData;
};

export default ContentTable;
