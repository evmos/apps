import { BigNumber } from "ethers";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
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
import { useAllValidators } from "../../../internal/staking/functionality/hooks/useAllValidators";
import { ValidatorsList } from "../../../internal/staking/functionality/types";
import { StoreType } from "../../../redux/Store";
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
import Staking from "../modals/Staking";

const Modal = dynamic(() => import("../../common/Modal"));
const Button = dynamic(() => import("../../common/Button"));
const MessageTable = dynamic(() => import("../../asset/table/MessageTable"));

const dataHead = ["Rank", "Name", "Voting Power", "Staked", "Commission", ""];

const Validators = () => {
  const { validators } = useAllValidators();
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  const handleOnClick = useCallback((item: ValidatorsList) => {
    setShow(true);
    setModalContent(
      <Staking
        item={{
          moniker: item.validator.description.moniker,
          commissionRate: item.validator.commission.commission_rates.rate,
          balance: item.balance.balance.amount,
          details: item.validator.description.details,
          website: item.validator.description.website,
          validatorAddress: item.validator.operator_address,
        }}
        setShow={setShow}
      />
    );
  }, []);

  const isLoading = false;
  const error = false;
  const { value } = useSearchContext() as SearchContext;
  const [sorting, setSorting] = useState({ column: 0, direction: true });

  const filtered = useMemo(() => {
    // it filters by rank or name
    const filteredData = validators.filter(
      (i) =>
        i.validator.description.moniker
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        i.validator.rank.toString().includes(value)
    );

    if (value !== "") {
      return filteredData;
    }

    return validators;
  }, [validators, value]);

  const drawValidators = useMemo(() => {
    if (filtered && filtered.length === 0) {
      return <></>;
    }
    filtered.sort((a, b) => {
      if (sorting.column === 1) {
        // sort by name
        const temp =
          a.validator.description.moniker.trim().toLowerCase() >
          b.validator.description.moniker.trim().toLowerCase()
            ? 1
            : -1;
        return temp * (sorting.direction ? 1 : -1);
      }
      if (sorting.column === 2) {
        // sort by voting power
        const temp = BigNumber.from(a.validator.tokens).gt(
          BigNumber.from(b.validator.tokens)
        )
          ? 1
          : -1;
        return temp * (sorting.direction ? 1 : -1);
      }
      if (sorting.column === 3) {
        // sort by staked
        const balance1 =
          a.balance.balance.amount === "" ? "0" : a.balance.balance.amount;
        const balance2 =
          b.balance.balance.amount === "" ? "0" : b.balance.balance.amount;

        const temp = BigNumber.from(balance1).gt(BigNumber.from(balance2))
          ? 1
          : -1;

        return temp * (sorting.direction ? 1 : -1);
      }
      if (sorting.column === 4) {
        // sort by commission
        const temp =
          Number(a.validator.commission?.commission_rates?.rate) >
          Number(b.validator.commission?.commission_rates?.rate)
            ? 1
            : -1;

        return temp * (sorting.direction ? 1 : -1);
      }
      // default sort by rank
      const temp = a.validator.rank > b.validator.rank ? 1 : -1;
      return temp * (sorting.direction ? 1 : -1);
    });
    return filtered.map((item) => {
      return (
        <tr key={item.validator.rank} className={`${trBodyStyle}`}>
          <td className={`${tdBodyStyle} md:hidden text-pearl font-bold`}>
            {item.validator.description.moniker}
          </td>
          <td className={`${tdBodyStyle} md:pl-8 firstRow`}>
            <TdContent
              tdProps={{ title: dataHead[0], value: item.validator.rank }}
            />
          </td>
          <td className={`${tdBodyStyle} hidden md:table-cell`}>
            <TdContent
              tdProps={{
                title: dataHead[2],
                value: item.validator.description.moniker,
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[2],
                value: formatNumber(
                  convertStringFromAtto(item.validator.tokens).toFixed(2)
                ),
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[3],
                value:
                  item.balance.balance.amount !== ""
                    ? convertAndFormat(
                        BigNumber.from(item.balance.balance.amount)
                      )
                    : "--",
              }}
            />
          </td>
          <td className={`${tdBodyStyle}`}>
            <TdContent
              tdProps={{
                title: dataHead[4],
                value: formatPercentage(
                  item.validator.commission?.commission_rates?.rate
                ),
              }}
            />
          </td>

          <td className={`${tdBodyStyle}`}>
            <div className="flex md:justify-end">
              <Button
                disabled={!wallet.active}
                onClick={() => {
                  handleOnClick(item);
                }}
              >
                <span className="px-2">Manage</span>
              </Button>
            </div>
          </td>
        </tr>
      );
    });
  }, [filtered, wallet.active, handleOnClick, sorting]);

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
    th: {
      style: thStyle,
    },
    setSorting,
    sorting,
  };

  return (
    <>
      <Table tableProps={tableProps} />
      <Modal
        show={show}
        onClose={() => {
          setShow(false);
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default Validators;
