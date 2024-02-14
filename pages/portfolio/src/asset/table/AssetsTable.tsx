// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Modal, Switch } from "@evmosapps/ui-helpers";
import { cn, getTotalAssets } from "helpers";
import HeadAssets from "./components/HeadAssets";
import Guide from "./Guide";
import { BigNumber } from "@ethersproject/bignumber";
import { CLICK_HIDE_ZERO_BALANCE, sendEvent } from "tracker";
import {
  TableData,
  normalizeAssetsData,
} from "../../utils/table/normalizeData";
import { useStakedEvmos } from "../../utils/hooks/useStakedEvmos";

import ContentTable from "./ContentTable";
import TopBar from "./topBar/TopBar";

import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useAccount } from "wagmi";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";

const AssetsTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { address } = useAccount();
  const chainRef = useEvmosChainRef();
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  const staked = useStakedEvmos();
  const { data, error, isLoading } = useTrpcQuery((t) =>
    t.legacy.erc20ModuleBalance({
      address,
      chainRef,
    }),
  );

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
    sendEvent(CLICK_HIDE_ZERO_BALANCE);
  };

  const normalizedAssetsData = useMemo<TableData>(() => {
    return normalizeAssetsData(data);
  }, [data]);

  const tableData = useMemo(() => {
    return normalizedAssetsData?.table.filter((asset) => {
      if (
        hideZeroBalance === true &&
        asset.erc20Balance.eq(BigNumber.from(0))
      ) {
        return false;
      }
      return true;
    });
  }, [normalizedAssetsData, hideZeroBalance]);

  const topProps = {
    evmosPrice: normalizedAssetsData?.table[0]?.coingeckoPrice ?? 0,
    totalAssets: getTotalAssets(normalizedAssetsData, {
      total: staked.data?.toString() ?? "0",
      decimals: normalizedAssetsData?.table[0]?.decimals ?? 0,
      coingeckoPrice: normalizedAssetsData.table[0]?.coingeckoPrice ?? 0,
    }),
    setIsOpen: setIsOpen,
    setModalContent: setModalContent,
    tableData: {
      table: normalizedAssetsData.table,
      feeBalance: normalizedAssetsData.feeBalance,
    },
  };

  return (
    <>
      <Suspense>
        <TopBar topProps={topProps} />
      </Suspense>
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
      <div className="xl:scrollbar-hide mt-5 w-full text-pearl">
        <HeadAssets />
        <div
          className={cn(
            "[&>*]:bg-darkGray2 gap-y-0.5 flex flex-col",
            "first:[&>*]:rounded-t-2xl last:[&>*]:rounded-b-2xl ",
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
              setIsOpen={setIsOpen}
              setModalContent={setModalContent}
            />
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
    </>
  );
};

export default AssetsTable;
