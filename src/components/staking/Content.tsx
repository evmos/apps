import MessageTable from "../asset/table/MessageTable";
import Button from "../common/Button";
import { Table } from "../common/table/Table";
import {
  tableStyle,
  tBodyStyle,
  tdBodyStyle,
  tHeadStyle,
  trBodyStyle,
} from "../common/table/tablesStyles";
import { TdContent } from "../common/table/TdContent";

const dataHead = ["Rank", "Name", "Voting Power", "Staked", "Comission", ""];

const Content = () => {
  // TODO: delete and use the validators response
  const dataBody = [
    {
      rank: "9",
      name: "Hanchon.live",
      votingPower: "3,526,485.15 EVMOS",
      staked: "0.08",
      commission: "5%",
    },
    {
      rank: "10",
      name: "Hanchon.live",
      votingPower: "3,526,485.15 EVMOS",
      staked: "0.08",
      commission: "5%",
    },
  ];

  const isLoading = false;
  const error = false;

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
    if (error && !isLoading && dataBody.length === 0) {
      return (
        <MessageTable amountCols={6}>
          <p>Request failed</p>
        </MessageTable>
      );
    }

    if (!error && !isLoading && dataBody.length == 0) {
      return (
        <MessageTable amountCols={6}>
          <p>No results </p>
        </MessageTable>
      );
    }

    return dataBody.map((item) => {
      return (
        <>
          <tr key={item.rank} className={`${trBodyStyle}`}>
            <td className={`${tdBodyStyle} md:hidden text-pearl font-bold`}>
              {item.name}
            </td>
            <td className={`${tdBodyStyle} md:pl-8`}>
              <TdContent tdProps={{ title: dataHead[0], value: item.rank }} />
            </td>
            <td className={`${tdBodyStyle} hidden md:table-cell`}>
              {item.name}
            </td>
            <td className={`${tdBodyStyle}`}>
              <TdContent
                tdProps={{ title: dataHead[2], value: item.votingPower }}
              />
            </td>
            <td className={`${tdBodyStyle}`}>
              <TdContent tdProps={{ title: dataHead[3], value: item.staked }} />
            </td>
            <td className={`${tdBodyStyle}`}>
              <TdContent
                tdProps={{ title: dataHead[4], value: item.commission }}
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
        </>
      );
    });
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
    <div className=" mt-5 overflow-y-auto max-h-[50vh] lg:max-h-[50vh] xl:scrollbar-hide text-white font-[IBM] w-full px-2">
      <Table tableProps={tableProps} />
    </div>
  );
};

export default Content;
