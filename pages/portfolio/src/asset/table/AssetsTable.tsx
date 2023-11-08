"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { ERC20BalanceResponse } from "./types";

import dynamic from "next/dynamic";

import { MessageTable, Switch } from "ui-helpers";

import HeadTable from "./HeadTable";
import { cn, getTotalAssets } from "helpers";
import HeadAssets from "./components/HeadAssets";
import Guide from "./Guide";

import { BigNumber } from "@ethersproject/bignumber";
import { CLICK_HIDE_ZERO_BALANCE, useTracker } from "tracker";
import {
  TableData,
  normalizeAssetsData,
} from "../../utils/table/normalizeData";
import { useStakedEvmos } from "../../utils/hooks/useStakedEvmos";
import { getAssetsForAddress } from "../../utils/fetch";
import ModalAsset from "../modals/ModalAsset";
import ContentTable from "./ContentTable";
import TopBar from "./topBar/TopBar";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const value = useSelector((state: StoreType) => state.wallet.value);

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const { stakedData } = useStakedEvmos();

  const { data, error, isLoading } = useQuery<ERC20BalanceResponse, Error>({
    refetchInterval: 15_000,
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
      <div className="flex flex-col justify-center lg:flex-row lg:justify-between my-2">
        <Guide />
        <Switch
          label="Hide Zero Balance"
          onChange={() => {
            zeroBalance();
          }}
          checked={hideZeroBalance}
        />
      </div>

      <div className="xl:scrollbar-hide mt-5 w-full font-display text-pearl">
        <HeadAssets />
        <div
          className={cn(
            "[&>*]:bg-darkGray2 gap-y-0.5 flex flex-col",
            "first:[&>*]:rounded-t-2xl last:[&>*]:rounded-b-2xl "
          )}
        >
          {isLoading && (
            <div className="w-full flex items-center justify-center py-28 gap-2">
              <span className="loader"></span>
              <p>Loading...</p>
            </div>
          )}
          {error && !isLoading && tableData?.length === 0 && (
            <div className="w-full flex items-center justify-center py-28">
              <p>Request failed</p>
            </div>
          )}
          {!isLoading && !error && tableData?.length === 0 && (
            <div className="w-full flex items-center justify-center py-28">
              <p>No results </p>
            </div>
          )}

          {!isLoading && !error && tableData?.length > 0 && (
            <ContentTable
              tableData={{
                table: tableData,
                feeBalance: normalizedAssetsData.feeBalance,
              }}
              setShow={setShow}
              setModalContent={setModalContent}
            />
          )}
        </div>
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
