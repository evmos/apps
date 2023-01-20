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
const Content = dynamic(() => import("./Content"));
const ContentCard = dynamic(() => import("../mobileView/Content"));
const TopBar = dynamic(() => import("./topBar/TopBar"));
const Banner = dynamic(() => import("../Banner"));

import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import {
  normalizeAssetsData,
  TableData,
} from "../../../internal/asset/functionality/table/normalizeData";
import { useRouter } from "next/router";
import HeadTable from "./HeadTable";
import {
  convertFromAtto,
  formatNumber,
  getTotalAssets,
} from "../../../internal/asset/style/format";
import { BigNumber } from "ethers";
import LeftArrowIcon from "../../common/images/icons/LeftArrowIcon";
import Link from "next/link";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const [showMobile, setShowMobile] = useState(false);

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

  const totalStaked = useMemo(() => {
    let stakedRes = totalStakedResults?.data?.value;
    if (stakedRes !== "" && stakedRes !== undefined) {
      stakedRes = formatNumber(
        convertFromAtto(
          BigNumber.from(stakedRes),
          normalizedAssetsData?.table[0]?.decimals
        )
      );
    } else {
      stakedRes = "0";
    }

    return `${stakedRes} EVMOS`;
  }, [totalStakedResults, normalizedAssetsData]);

  return (
    <>
      <Link
        href="https://app.evmos.org/"
        className="text-white flex items-center space-x-3 mb-2 font-bold mx-5 xl:mx-0 justify-center xl:justify-start"
      >
        <LeftArrowIcon width={15} height={15} />
        <p>Back to Mission Control</p>
      </Link>
      <TopBar
        evmosPrice={normalizedAssetsData?.table[0]?.coingeckoPrice}
        totalStaked={totalStaked}
        totalAssets={getTotalAssets(normalizedAssetsData, {
          total: totalStakedResults?.data
            ? totalStakedResults?.data?.value
            : "0",
          decimals: normalizedAssetsData?.table[0]?.decimals,
          coingeckoPrice: normalizedAssetsData.table[0]?.coingeckoPrice,
        })}
      />
      <Banner />
      <Switch
        onChange={() => setHideBalance(!hideZeroBalance)}
        checked={hideZeroBalance}
      />
      <div className="mt-5 overflow-y-auto max-h-[33vh] lg:max-h-[43vh] xl:scrollbar-hide text-white font-[IBM] w-full">
        {!isLoading && !error && tableData?.length > 0 && showMobile && (
          <ContentCard
            tableData={{
              table: tableData,
              feeBalance: normalizedAssetsData.feeBalance,
            }}
            setShow={setShow}
            setModalContent={setModalContent}
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
              setModalContent={setModalContent}
            />
          </table>
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
