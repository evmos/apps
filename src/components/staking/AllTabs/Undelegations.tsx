import { BigNumber } from "ethers";
import { useMemo } from "react";
import { convertAndFormat } from "../../../internal/asset/style/format";
import { getRemainingTime } from "../../../internal/common/style/format";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import MessageTable from "../../asset/table/MessageTable";
import { Table } from "../../common/table/Table";
import {
  tableStyle,
  tBodyStyle,
  tdBodyStyle,
  tHeadStyle,
  trBodyStyle,
} from "../../common/table/tablesStyles";
import { TdContent } from "../../common/table/TdContent";

const dataHead = ["Name", "Amount to be undelegated", "Remaining time"];

const Undelegations = () => {
  const { undelegations } = useStakingInfo();

  const isLoading = false;
  const error = false;
  const drawDelegations = useMemo(() => {
    return undelegations?.map((item) => {
      return item.entries.map((entry) => {
        return (
          <tr key={item.validator.rank} className={`${trBodyStyle}`}>
            <td className={`${tdBodyStyle} md:hidden text-pearl font-bold`}>
              {item.validator.description.moniker}
            </td>

            <td className={`${tdBodyStyle} md:pl-8 hidden md:table-cell`}>
              <TdContent
                tdProps={{
                  title: dataHead[0],
                  value: item.validator.description.moniker,
                }}
              />
            </td>

            <td className={`${tdBodyStyle}`}>
              <TdContent
                tdProps={{
                  title: dataHead[1],
                  value: convertAndFormat(BigNumber.from(entry.balance)),
                }}
              />
            </td>

            <td className={`${tdBodyStyle}`}>
              <TdContent
                tdProps={{
                  title: dataHead[2],
                  //   TODO: update this value when time pass
                  value: getRemainingTime(entry.completion_time),
                }}
              />
            </td>
          </tr>
        );
      });
    });
  }, [undelegations]);

  const dataForBody = () => {
    if (isLoading) {
      return (
        <MessageTable amountCols={6}>
          <>
            <span className="loader"></span>
            <p>Loading...</p>
          </>
        </MessageTable>
      );
    }
    if (error && !isLoading && undelegations.length === 0) {
      return (
        <MessageTable amountCols={6}>
          <p>Request failed</p>
        </MessageTable>
      );
    }

    if (!error && !isLoading && undelegations.length === 0) {
      return (
        <MessageTable amountCols={6}>
          <p>No results </p>
        </MessageTable>
      );
    }
    return drawDelegations;
  };

  const tableProps = {
    table: {
      style: tableStyle,
    },
    tHead: {
      style: tHeadStyle,
      content: dataHead,
    },
    tBody: {
      style: tBodyStyle,
      content: dataForBody(),
    },
  };

  return (
    // <div className=" mt-5 overflow-y-auto max-h-[50vh] lg:max-h-[50vh] xl:scrollbar-hide text-white font-[IBM] w-full px-2">
    <Table tableProps={tableProps} />
    // </div>
  );
};

export default Undelegations;
