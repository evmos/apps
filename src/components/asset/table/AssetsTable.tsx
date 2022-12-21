import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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

import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import {
  normalizeAssetsData,
  TableData,
} from "../../../internal/asset/functionality/table/normalizeData";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const [modalValues, setModalValues] = useState<DataModal>(EmptyDataModal);

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
  return (
    <>
      <Switch
        onChange={() => setHideBalance(!hideZeroBalance)}
        checked={hideZeroBalance}
      />
      <div className="mt-10 overflow-y-auto max-h-full md:max-h-[70vh] xl:scrollbar-hide">
        <table className="text-white w-full font-[IBM]">
          <thead className="uppercase ">
            <tr>
              <th className="text-left px-8 py-4 min-w-[350px]">Asset</th>
              <th className="text-left min-w-[200px]">IBC Balance</th>
              <th className="text-left min-w-[200px]">ERC-20 Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody className=""> */}
          <tbody>
            {isLoading && (
              <MessageTable>
                <>
                  {" "}
                  <span className="loader"></span>
                  <p>Loading...</p>
                </>
              </MessageTable>
            )}
          </tbody>
          {error && !isLoading && tableData?.length === 0 && (
            <tbody>
              <MessageTable>
                {/* TODO: add exclamation icon */}
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

          {!isLoading && !error && tableData?.length > 0 && (
            <Content
              tableData={normalizedAssetsData}
              setShow={setShow}
              setModalValues={setModalValues}
            />
          )}
        </table>
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
