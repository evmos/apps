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
import { useDataTokens } from "../../utils/hooks/useDataTokens";

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
  const { dataTokens: data } = useDataTokens({ tableData: tableData.table });

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
