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
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { DelegationsResponse } from "../../../internal/staking/functionality/types";
import { StoreType } from "../../../redux/Store";
import MessageTable from "../../asset/table/MessageTable";
import Button from "../../common/Button";
import { Table } from "../../common/table/Table";
import {
  tableStyle,
  tBodyStyle,
  tdBodyStyle,
  tHeadStyle,
  trBodyStyle,
  thStyle,
} from "../../common/table/tablesStyles";
import { TdContent } from "../../common/table/TdContent";
import { Staking } from "../modals/Staking";
const Modal = dynamic(() => import("../../common/Modal"));

const dataHead = ["Rank", "Name", "Voting Power", "Staked", "Comission", ""];

const Delegations = () => {
  const { delegations } = useStakingInfo();
  const { value } = useSearchContext() as SearchContext;
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
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

  const handleOnClick = useCallback((item: DelegationsResponse) => {
    setShow(true);
    setModalContent(
      <Staking
        item={{
          moniker: item.delegation.validator.description.moniker,
          commissionRate:
            item.delegation.validator.commission.commission_rates.rate,
          balance: item.balance.amount,
          details: item.delegation.validator.description.details,
          website: item.delegation.validator.description.website,
          validatorAddress: item.delegation.validator_address,
        }}
        setShow={setShow}
      />
    );
  }, []);

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
  }, [filtered, wallet.active, handleOnClick]);

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
          <p>You don&apos;t have anything staked at the moment! </p>
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

export default Delegations;
