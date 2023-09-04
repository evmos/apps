// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import dynamic from "next/dynamic";

const ModalAsset = dynamic(() => import("../modals/ModalAsset"));
import { MessageTable, Switch } from "ui-helpers";
const TopBar = dynamic(() => import("./topBar/TopBar"));
const ContentTable = dynamic(() => import("./ContentTable"));

import {
  normalizeAssetsData,
  TableData,
} from "../../../internal/asset/functionality/table/normalizeData";
import HeadTable from "./HeadTable";
import { getTotalAssets } from "helpers";
import HeadAssets from "./components/HeadAssets";
import Guide from "./Guide";
import { useStakedEvmos } from "../../../internal/common/api/hooks/useStakedEvmos";

import { BigNumber } from "@ethersproject/bignumber";
import { CLICK_HIDE_ZERO_BALANCE, useTracker } from "tracker";
import { useAssets } from "./useConnectedAccountAssets";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const value = useSelector((state: StoreType) => state.wallet.value);

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const { stakedData } = useStakedEvmos();

  const { data, error, isLoading } = useAssets();
  console.log(data, error);

  const [hideZeroBalance, setHideBalance] = useState(false);
  useEffect(() => {
    const val = localStorage.getItem("zeroBalance");
    if (val === null) {
      setHideBalance(false);
    } else {
      setHideBalance(JSON.parse(val) as boolean);
    }
  }, []);

  const { handlePreClickAction: handleZeroBalance } = useTracker(
    CLICK_HIDE_ZERO_BALANCE,
    {
      status: !hideZeroBalance,
      wallet: value?.evmosAddressEthFormat,
      provider: value?.extensionName,
    }
  );
  const zeroBalance = () => {
    localStorage.setItem("zeroBalance", String(!hideZeroBalance));
    setHideBalance(!hideZeroBalance);
    handleZeroBalance();
  };

  const normalizedAssetsData = useMemo<TableData>(() => {
    return normalizeAssetsData(data);
  }, [data]);

  const tableData = useMemo(() => {
    return normalizedAssetsData?.table.filter((asset) => {
      if (
        hideZeroBalance === true &&
        asset.erc20Balance.eq(BigNumber.from(0)) &&
        asset.cosmosBalance.eq(BigNumber.from(0))
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
      <TopBar topProps={topProps} />
      <div className="mx-5 flex flex-col justify-center lg:flex-row lg:justify-between xl:mx-0">
        <Guide />
        <Switch
          label="Hide Zero Balance"
          onChange={() => {
            zeroBalance();
          }}
          checked={hideZeroBalance}
        />
      </div>
      <div className="xl:scrollbar-hide mt-5 w-full font-[IBM] text-pearl">
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
          {!!error && !isLoading && tableData?.length === 0 && (
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
