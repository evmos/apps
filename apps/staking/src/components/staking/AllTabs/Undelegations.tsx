import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import {
  SearchContext,
  useSearchContext,
} from "../../../internal/common/context/SearchContext";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { Table } from "../../common/table/Table";
import {
  tableStyle,
  tBodyStyle,
  tdBodyStyle,
  tHeadStyle,
  thStyle,
  trBodyStyle,
} from "../../common/table/tablesStyles";
import { TdContent } from "../../common/table/TdContent";
import {
  convertAndFormat,
  getRemainingTime,
} from "../../../internal/common/helpers/style";
import dynamic from "next/dynamic";

const MessageTable = dynamic(() => import("../../common/table/MessageTable"));

const dataHead = ["Name", "Amount to be undelegated", "Remaining time"];

type undelegationData = {
  rank: number;
  moniker: string;
  balance: string;
  completionTime: string;
};

const Undelegations = () => {
  const { undelegations } = useStakingInfo();

  const { value } = useSearchContext() as SearchContext;
  const filtered = useMemo(() => {
    // it filters by name
    const filteredData = undelegations.filter((i) =>
      i.validator.description.moniker.toLowerCase().includes(value)
    );
    if (value !== "") {
      return filteredData;
    } else {
      return undelegations;
    }
  }, [undelegations, value]);
  const [sorting, setSorting] = useState({ column: 0, direction: true });
  const isLoading = false;
  const error = false;
  const drawDelegations = useMemo(() => {
    if (filtered && filtered.length === 0) {
      return <></>;
    }
    filtered.sort((a, b) => {
      // default sort by rank
      const temp = a.validator.rank > b.validator.rank ? 1 : -1;
      return temp * (sorting.direction ? 1 : -1);
    });

    const tableData: undelegationData[] = [];
    filtered?.map((item) => {
      item.entries.map((entry) => {
        tableData.push({
          rank: item.validator.rank,
          moniker: item.validator.description.moniker,
          balance: entry.balance,
          completionTime: entry.completion_time,
        });
      });
    });

    tableData?.sort((a, b) => {
      if (sorting.column === 2) {
        // sorty by remaining time
        const temp =
          new Date(a.completionTime) > new Date(b.completionTime) ? 1 : -1;
        return temp * (sorting.direction ? 1 : -1);
      }
      //  sort by amount to be undelegated
      const temp = BigNumber.from(a.balance).gt(BigNumber.from(b.balance))
        ? 1
        : -1;
      return temp * (sorting.direction ? 1 : -1);
    });

    return tableData?.map((item, index) => {
      return (
        <tr key={index} className={`${trBodyStyle}`}>
          <td className={`${tdBodyStyle} font-bold text-pearl md:hidden`}>
            {item.moniker}
          </td>
          <td
            className={`${tdBodyStyle} firstRow hidden md:table-cell md:pl-8`}
          >
            <TdContent
              tdProps={{
                title: dataHead[0],
                value: item.moniker,
              }}
            />
          </td>

          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[1],
                value: `${convertAndFormat(
                  BigNumber.from(item.balance)
                )} EVMOS`,
              }}
            />
          </td>

          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[2],
                //   TODO: update this value when time pass
                value: getRemainingTime(item.completionTime),
              }}
            />
          </td>
        </tr>
      );
    });
  }, [filtered, sorting]);

  const dataForBody = () => {
    if (isLoading) {
      return (
        <MessageTable amountCols={3}>
          <>
            <span className="loader"></span>
            <p>Loading...</p>
          </>
        </MessageTable>
      );
    }
    if (error && !isLoading && undelegations.length === 0) {
      return (
        <MessageTable amountCols={3}>
          <p>Request failed</p>
        </MessageTable>
      );
    }

    if (!error && !isLoading && undelegations.length === 0) {
      return (
        <MessageTable amountCols={3}>
          <p>You don&apos;t have anything undelegated at the moment! </p>
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
    th: {
      style: thStyle,
    },
    setSorting,
    sorting,
  };

  return <Table tableProps={tableProps} />;
};

export default Undelegations;
