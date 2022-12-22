import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { DataModal, EmptyDataModal } from "../modals/types";
import { StoreType } from "../../../redux/Store";
import { ERC20BalanceResponse } from "./types";
import { getAssetsForAddress } from "../../../internal/asset/functionality/fetch";

import dynamic from "next/dynamic";

const ModalAsset = dynamic(() => import("../modals/ModalAsset"));
const MessageTable = dynamic(() => import("./MessageTable"));
const Switch = dynamic(() => import("../utils/Switch"));
const Content = dynamic(() => import("./Content"));
const ContentCard = dynamic(() => import("../../card/Content"));

import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import {
  normalizeAssetsData,
  TableData,
} from "../../../internal/asset/functionality/table/normalizeData";
import { useRouter } from "next/router";
import HeadTable from "./HeadTable";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const [modalValues, setModalValues] = useState<DataModal>(EmptyDataModal);
  const [showMobile, setShowMobile] = useState(false);

  const value = useSelector((state: StoreType) => state.wallet.value);

  const { data, error, isLoading } = useQuery<ERC20BalanceResponse, Error>({
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

  const router = useRouter();
  const handleClientWidthChanges = () => {
    if (window.innerWidth <= 1280) {
      setShowMobile(true);
    } else if (window.innerWidth > 1280) {
      setShowMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 1280) {
      setShowMobile(true);
    }
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleClientWidthChanges);

    return () => window.removeEventListener("resize", handleClientWidthChanges);
  }, []);

  return (
    <>
      <Switch
        onChange={() => setHideBalance(!hideZeroBalance)}
        checked={hideZeroBalance}
      />
      <div className="mt-5 overflow-y-auto max-h-[57vh] lg:max-h-[65vh] xl:scrollbar-hide text-white font-[IBM] w-full">
        {!isLoading && !error && tableData?.length > 0 && showMobile && (
          <ContentCard
            tableData={normalizedAssetsData}
            setShow={setShow}
            setModalValues={setModalValues}
          />
        )}
        <table className="w-full">
          {tableData?.length === 0 && !showMobile && <HeadTable />}
          <tbody>
            {isLoading && (
              <MessageTable>
                <>
                  <span className="loader"></span>
                  <p>Loading...</p>
                </>
              </MessageTable>
            )}
          </tbody>
          {error && !isLoading && tableData?.length === 0 && (
            <tbody>
              <MessageTable>
                <p>Request failed</p>
              </MessageTable>
            </tbody>
          )}
          {!isLoading && !error && tableData?.length === 0 && (
            <tbody>
              <MessageTable>
                <p>No results </p>
              </MessageTable>
            </tbody>
          )}
        </table>
        {!isLoading && !error && tableData?.length > 0 && !showMobile && (
          <table className="w-full">
            <HeadTable />
            <Content
              tableData={{
                table: tableData,
                feeBalance: normalizedAssetsData.feeBalance,
              }}
              setShow={setShow}
              setModalValues={setModalValues}
            />
          </table>
        )}
      </div>
      <ModalAsset
        show={show}
        modalValues={modalValues}
        close={() => {
          setShow(false);
        }}
      />
    </>
  );
};

export default AssetsTable;
