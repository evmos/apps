import { BigNumber } from "ethers";
import { useMemo } from "react";
import {
  convertAndFormat,
  convertStringFromAtto,
  formatNumber,
  formatPercentage,
} from "../../../internal/asset/style/format";
import {
  SearchContext,
  useSearchContext,
} from "../../../internal/common/context/SearchContext";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import MessageTable from "../../asset/table/MessageTable";
import Button from "../../common/Button";
import { Table } from "../../common/table/Table";
import {
  tableStyle,
  tBodyStyle,
  tdBodyStyle,
  tHeadStyle,
  trBodyStyle,
} from "../../common/table/tablesStyles";
import { TdContent } from "../../common/table/TdContent";

const dataHead = ["Rank", "Name", "Voting Power", "Staked", "Comission", ""];

const Delegations = () => {
  const { delegations } = useStakingInfo();
  const { value } = useSearchContext() as SearchContext;
  const filtered = useMemo(() => {
    // it filters by rank or name
    const filteredData = delegations.filter(
      (i) =>
        i.delegation.validator.description.moniker
          .toLowerCase()
          .includes(value) ||
        i.delegation.validator.rank.toString().includes(value)
    );
    if (value !== "") {
      return filteredData;
    } else {
      return delegations;
    }
  }, [delegations, value]);

  const isLoading = false;
  const error = false;
  const drawDelegations = useMemo(() => {
    return filtered?.map((item) => {
      return (
        <tr key={item.delegation.validator.rank} className={`${trBodyStyle}`}>
          <td className={`${tdBodyStyle} md:hidden text-pearl font-bold`}>
            {item.delegation.validator.description.moniker}
          </td>
          <td className={`${tdBodyStyle} md:pl-8`}>
            <TdContent
              tdProps={{
                title: dataHead[0],
                value: item.delegation.validator.rank,
              }}
            />
          </td>
          <td className={`${tdBodyStyle} hidden md:table-cell`}>
            <TdContent
              tdProps={{
                title: dataHead[2],
                value: item.delegation.validator.description.moniker,
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[2],
                value: formatNumber(
                  convertStringFromAtto(
                    item.delegation.validator.tokens
                  ).toFixed(2)
                ),
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[3],
                value: convertAndFormat(BigNumber.from(item.balance.amount)),
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[4],
                value: formatPercentage(
                  item.delegation.validator.commission?.commission_rates?.rate
                ),
              }}
            />
          </td>

          <td className={`${tdBodyStyle}`}>
            <div className="flex md:justify-end">
              <Button
                onClick={() => {
                  // noop, redirect handled by the Link element
                }}
              >
                <span className="px-2">Manage</span>
              </Button>
            </div>
          </td>
        </tr>
      );
    });
  }, [filtered]);

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
    if (error && !isLoading && delegations.length === 0) {
      return (
        <MessageTable amountCols={6}>
          <p>Request failed</p>
        </MessageTable>
      );
    }

    if (!error && !isLoading && delegations.length === 0) {
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

export default Delegations;
