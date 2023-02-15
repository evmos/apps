import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/Store";
import { ERC20BalanceResponse } from "./types";
import {
  getAssetsForAddress,
  getTotalStaked,
  TotalStakedResponse,
} from "../../../internal/asset/functionality/fetch";

import dynamic from "next/dynamic";

const ModalAsset = dynamic(() => import("../modals/ModalAsset"));
const MessageTable = dynamic(() => import("./MessageTable"));
const Switch = dynamic(() => import("../utils/Switch"));
const TopBar = dynamic(() => import("./topBar/TopBar"));
const ContentTable = dynamic(() => import("./ContentTable"));
const Banner = dynamic(() => import("../Banner"));

import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import {
  normalizeAssetsData,
  TableData,
} from "../../../internal/asset/functionality/table/normalizeData";
import HeadTable from "./HeadTable";
import {
  convertAndFormat,
  getTotalAssets,
} from "../../../internal/asset/style/format";
import { BigNumber } from "ethers";
import HeadAssets from "./components/HeadAssets";
import LeftArrowIcon from "../../common/images/icons/LeftArrowIcon";
import Link from "next/link";
import Guide from "./Guide";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const value = useSelector((state: StoreType) => state.wallet.value);

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

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

  const totalStakedResults = useQuery<TotalStakedResponse, Error>({
    queryKey: ["totalStaked", value.evmosAddressCosmosFormat],
    queryFn: () => getTotalStaked(value.evmosAddressCosmosFormat),
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

  const totalStaked = useMemo(() => {
    let stakedRes = totalStakedResults?.data?.value;
    if (stakedRes !== "" && stakedRes !== undefined) {
      stakedRes = convertAndFormat(
        BigNumber.from(stakedRes),
        normalizedAssetsData?.table[0]?.decimals
      );
    } else {
      stakedRes = "0";
    }

    return `${stakedRes} EVMOS`;
  }, [totalStakedResults, normalizedAssetsData]);

  const topProps = {
    evmosPrice: normalizedAssetsData?.table[0]?.coingeckoPrice,
    totalStaked: totalStaked,
    totalAssets: getTotalAssets(normalizedAssetsData, {
      total: totalStakedResults?.data ? totalStakedResults?.data?.value : "0",
      decimals: normalizedAssetsData?.table[0]?.decimals,
      coingeckoPrice: normalizedAssetsData.table[0]?.coingeckoPrice,
    }),
    setShow: setShow,
    setModalContent: setModalContent,
    tableData: {
      table: tableData,
      feeBalance: normalizedAssetsData.feeBalance,
    },
  };

  return (
    <>
      <Link
        href="https://app.evmos.org/"
        className="text-white flex items-center space-x-3 mb-2 font-bold mx-5 xl:mx-0 justify-center xl:justify-start hover:opacity-80"
      >
        <LeftArrowIcon width={15} height={15} />
        <p>Back to Mission Control</p>
      </Link>
      <TopBar topProps={topProps} />
      <Banner />
      <div className="flex flex-col lg:flex-row mx-5 xl:mx-0 justify-center lg:justify-between">
        <Guide />
        <Switch
          onChange={() => {
            zeroBalance();
          }}
          checked={hideZeroBalance}
        />
      </div>
      <div className="mt-5 overflow-y-auto max-h-[33vh] lg:max-h-[43vh] xl:scrollbar-hide text-white font-[IBM] w-full">
        <table className="w-full">
          {tableData?.length === 0 && <HeadTable />}
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
