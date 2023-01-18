import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../../internal/asset/functionality/table/normalizeData";

import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Accordion from "../../common/Accordion";
import { RowContent } from "./components/RowContent";
import { SubRowContent } from "./components/SubRowContet";

const STR = ({
  tableData,
  setShow,
  setModalContent,
}: {
  tableData: TableData;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
}) => {
  return (
    <div className="flex flex-col w-full">
      {tableData?.table.map((item, index: number) => {
        let cont: JSX.Element | string = "";
        if (item.symbol === EVMOS_SYMBOL) {
          cont = (
            <div className="flex w-full flex-col space-y-5 ">
              <div className="bg-darkGray2 w-full border-b-2 border-b-black pb-5">
                <SubRowContent
                  item={item}
                  setShow={setShow}
                  isIBCBalance={true}
                  setModalContent={setModalContent}
                  feeBalance={tableData.feeBalance}
                />
              </div>
              <div className="bg-darkGray2 w-full ">
                <SubRowContent
                  item={item}
                  setShow={setShow}
                  setModalContent={setModalContent}
                  feeBalance={tableData.feeBalance}
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

export default STR;
