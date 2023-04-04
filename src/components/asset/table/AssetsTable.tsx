import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/Store";
import { ERC20BalanceResponse } from "./types";
import { getAssetsForAddress } from "../../../internal/asset/functionality/fetch";

import dynamic from "next/dynamic";

const ModalAsset = dynamic(() => import("../modals/ModalAsset"));
const MessageTable = dynamic(() => import("./MessageTable"));
const Switch = dynamic(() => import("../utils/Switch"));
const TopBar = dynamic(() => import("./topBar/TopBar"));
const ContentTable = dynamic(() => import("./ContentTable"));

import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import {
  normalizeAssetsData,
  TableData,
} from "../../../internal/asset/functionality/table/normalizeData";
import HeadTable from "./HeadTable";
import { getTotalAssets } from "../../../internal/asset/style/format";
import HeadAssets from "./components/HeadAssets";
import Guide from "./Guide";
import { useStakedEvmos } from "../../../internal/common/api/hooks/useStakedEvmos";
import Navigation from "../../common/navigation/Navigation";
import { EVMOS_PAGE_URL, NAV_TO_MISSION_CONTROL } from "../../common/constants";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const value = useSelector((state: StoreType) => state.wallet.value);

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const { stakedData } = useStakedEvmos();

  const { data, error, isLoading } = useQuery<ERC20BalanceResponse, Error>({
    refetchInterval: 3000,
    queryKey: [
      "assets",
      value.evmosAddressCosmosFormat,
      value.evmosAddressEthFormat,
    ],
    queryFn: () =>
      getAssetsForAddress(
        value.evmosAddressCosmosFormat,
        value.evmosAddressEthFormat
      ),
  });

  const [hideZeroBalance, setHideBalance] = useState(false);
  useEffect(() => {
    const val = localStorage.getItem("zeroBalance");
    if (val === null) {
      setHideBalance(false);
    } else {
      setHideBalance(JSON.parse(val) as boolean);
    }
  }, []);

  const zeroBalance = () => {
    localStorage.setItem("zeroBalance", String(!hideZeroBalance));
    setHideBalance(!hideZeroBalance);
  };

  const normalizedAssetsData = useMemo<TableData>(() => {
    return normalizeAssetsData(data);
  }, [data]);

  const tableData = useMemo(() => {
    return normalizedAssetsData?.table.filter((asset) => {
      if (
        hideZeroBalance === true &&
        asset.erc20Balance.eq(BIG_ZERO) &&
        asset.cosmosBalance.eq(BIG_ZERO)
      ) {
        return false;
      }
      return true;
    });
  }, [normalizedAssetsData, hideZeroBalance]);

  const topProps = {
    evmosPrice: normalizedAssetsData?.table[0]?.coingeckoPrice,
    totalAssets: getTotalAssets(normalizedAssetsData, {
      total: stakedData ? stakedData?.value : "0",
      decimals: normalizedAssetsData?.table[0]?.decimals,
      coingeckoPrice: normalizedAssetsData.table[0]?.coingeckoPrice,
    }),
    setShow: setShow,
    setModalContent: setModalContent,
    tableData: {
      table: normalizedAssetsData.table,
      feeBalance: normalizedAssetsData.feeBalance,
    },
  };

  return (
    <>
      <Navigation href={EVMOS_PAGE_URL} text={NAV_TO_MISSION_CONTROL} />
      <TopBar topProps={topProps} />
      <div className="flex flex-col lg:flex-row mx-5 xl:mx-0 justify-center lg:justify-between">
        <Guide />
        <Switch
          label={"Hide Zero Balance"}
          onChange={() => {
            zeroBalance();
          }}
          checked={hideZeroBalance}
        />
      </div>
      <div className="mt-5 overflow-y-auto max-h-[33vh] sm:max-h-[36vh] lg:max-h-[46vh] xl:scrollbar-hide text-pearl font-[IBM] w-full">
        <table className="w-full">
          {tableData?.length === 0 && <HeadTable />}
          <tbody>
            {isLoading && (
              <MessageTable amountCols={4}>
                <>
                  <span className="loader"></span>
                  <p>Loading...</p>
                </>
              </MessageTable>
            )}
          </tbody>
          {error && !isLoading && tableData?.length === 0 && (
            <tbody>
              <MessageTable amountCols={4}>
                <p>Request failed</p>
              </MessageTable>
            </tbody>
          )}
          {!isLoading && !error && tableData?.length === 0 && (
            <tbody>
              <MessageTable amountCols={4}>
                <p>No results </p>
              </MessageTable>
            </tbody>
          )}
        </table>
        {!isLoading && !error && tableData?.length > 0 && (
          <div className="mx-2 xl:mx-0">
            <HeadAssets />
            <ContentTable
              tableData={{
                table: tableData,
                feeBalance: normalizedAssetsData.feeBalance,
              }}
              setShow={setShow}
              setModalContent={setModalContent}
            />
          </div>
        )}
      </div>
      <ModalAsset
        show={show}
        modalContent={modalContent}
        close={() => {
          setShow(false);
        }}
      />
    </>
  );
};

export default AssetsTable;
