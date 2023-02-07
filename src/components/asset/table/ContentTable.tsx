import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
// import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Accordion from "../../common/Accordion";
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
  feeBalance: BigNumber
) => {
  return (
    <div className="bg-darkGray2 w-full ">
      <SubRowContent
        item={item}
        setShow={setShow}
        setModalContent={setModalContent}
        feeBalance={feeBalance}
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
      if (map.has(e.tokenIdentifier) === true) {
        // if (e.symbol === EVMOS_SYMBOL ) add evmos
        const b = map.get(e.tokenIdentifier);
        if (b === undefined) {
          return;
        }
        b.tokens.push(e);

        b.total = b.total.add(e.erc20Balance);
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
      const firstRowData = v.tokens[0];
      if (v.tokens.length > 1) {
        firstRowData.erc20Balance = v.total;
        content = [];
        v.tokens.map((e) => {
          content?.push(
            createSubRow(e, setShow, setModalContent, tableData.feeBalance)
          );
        });
      }
      ret.push(
        <Accordion
          key={k}
          content={
            content ? (
              <div className="flex w-full flex-col space-y-5 ">{content} </div>
            ) : null
          }
          title={<RowContent item={firstRowData} />}
        />
      );
    });
    return ret;
  }, [data, setModalContent, setShow, tableData.feeBalance]);
  return <div className="flex flex-col w-full">{renderData}</div>;
};

export default ContentTable;
