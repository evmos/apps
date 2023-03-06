import { useMemo } from "react";
import {
  convertStringFromAtto,
  formatNumber,
  formatPercentage,
} from "../../../internal/asset/style/format";
import { useAllValidators } from "../../../internal/staking/functionality/hooks/useAllValidators";
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

const Validators = () => {
  const { validators } = useAllValidators();

  const isLoading = false;
  const error = false;

  const drawValidators = useMemo(() => {
    return validators.map((item) => {
      return (
        <tr key={item.rank} className={`${trBodyStyle}`}>
          <td className={`${tdBodyStyle} md:hidden text-pearl font-bold`}>
            {item.description.moniker}
          </td>
          <td className={`${tdBodyStyle} md:pl-8`}>
            <TdContent tdProps={{ title: dataHead[0], value: item.rank }} />
          </td>
          <td className={`${tdBodyStyle} hidden md:table-cell`}>
            <TdContent
              tdProps={{ title: dataHead[2], value: item.description.moniker }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[2],
                value: formatNumber(
                  convertStringFromAtto(item.tokens).toFixed(2)
                ),
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            {/* TODO: add delegation staked value
                         value: item.staked */}
            <TdContent tdProps={{ title: dataHead[3], value: "0" }} />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[4],
                value: formatPercentage(
                  item.commission?.commission_rates?.rate
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
  }, [validators]);

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
    if (error && !isLoading && validators.length === 0) {
      return (
        <MessageTable amountCols={6}>
          <p>Request failed</p>
        </MessageTable>
      );
    }

    if (!error && !isLoading && validators.length === 0) {
      return (
        <MessageTable amountCols={6}>
          <p>No results </p>
        </MessageTable>
      );
    }
    return drawValidators;
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

  return <Table tableProps={tableProps} />;
};

export default Validators;
