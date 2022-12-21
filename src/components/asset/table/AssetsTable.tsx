import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { BigNumber } from "@ethersproject/bignumber";
import { DataModal, EmptyDataModal } from "../modals/types";
import { StoreType } from "../../../redux/Store";
import { ERC20BalanceResponse } from "./types";
import { getAssetsForAddress } from "../../../internal/asset/functionality/fetch";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../internal/asset/style/format";
import Link from "next/link";
import { METAMASK_KEY } from "../../../internal/wallet/functionality/wallet";
import dynamic from "next/dynamic";

const ModalAsset = dynamic(() => import("../modals/ModalAsset"));
const MessageTable = dynamic(() => import("./MessageTable"));
const Switch = dynamic(() => import("../utils/Switch"));
const Button = dynamic(() => import("../../common/Button"));
const ExternalLinkIcon = dynamic(
  () => import("../../common/images/icons/ExternalLink")
);
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
          <tbody className="">
            {isLoading && (
              <MessageTable>
                <>
                  <span className="loader"></span>
                  <p>Loading...</p>
                </>
              </MessageTable>
            )}

            {error && !isLoading && tableData?.length === 0 && (
              <MessageTable>
                <>
                  {/* TODO: add exclamation icon */}
                  <p>Request failed</p>
                </>
              </MessageTable>
            )}

            {!isLoading && !error && tableData?.length === 0 && (
              <MessageTable>
                <>
                  <p>No results </p>
                </>
              </MessageTable>
            )}
            {tableData?.map((item, index: number) => {
              return (
                <tr
                  className={`${
                    tableData?.length > 2 ? "asset" : "assetOneItem"
                  }`}
                  key={index}
                >
                  <td>
                    <div className="flex items-center space-x-5">
                      <Image
                        src={`/tokens/${item.symbol.toLocaleLowerCase()}.png`}
                        alt={item.symbol}
                        width={35}
                        height={35}
                      />
                      <div className="flex flex-col items-start ">
                        <span className="font-bold">{item.symbol}</span>
                        <span className="text-sm text-darkGray5">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-start uppercase">
                      <span className="font-bold">
                        {convertAndFormat(item.cosmosBalance, item.decimals)}
                      </span>
                      <span className="text-sm text-darkGray5">
                        {amountToDolars(
                          item.cosmosBalance,
                          item.decimals,
                          item.coingeckoPrice
                        )}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-start uppercase">
                      <span className="font-bold">
                        {convertAndFormat(item.erc20Balance, item.decimals)}
                        {item.symbol.toUpperCase() === "EVMOS" ? " WEVMOS" : ""}
                      </span>
                      <span className="text-sm text-darkGray5">
                        {amountToDolars(
                          item.erc20Balance,
                          item.decimals,
                          item.coingeckoPrice
                        )}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="space-x-3 flex justify-center">
                      {item.handledByExternalUI !== null ? (
                        <Button
                          onClick={() => {
                            // noop, redirect handled by the Link element
                          }}
                        >
                          <div>
                            <Link
                              target="_blank"
                              rel="noreferrer"
                              href={item.handledByExternalUI.url}
                              className="flex flex-row items-center"
                            >
                              <span className="px-2">Deposit</span>
                              <ExternalLinkIcon width={18} height={18} />
                            </Link>
                          </div>
                        </Button>
                      ) : (
                        <Button
                          disabled={value.extensionName === METAMASK_KEY}
                          onClick={() => {
                            setShow(true);
                            setModalValues({
                              token: item.symbol,
                              address: value.evmosAddressCosmosFormat,
                              amount: item.cosmosBalance,
                              title: "Deposit",
                              network: "EVMOS",
                              decimals: item?.decimals,
                              feeDenom: "aevmos",
                              pubkey: value.evmosPubkey,
                              fee: BigNumber.from("1"),
                              erc20Balance: item.erc20Balance,
                              feeBalance: BigNumber.from("1"),
                              networkTo: item.chainIdentifier,
                            });
                          }}
                        >
                          <div className="flex flex-row items-center">
                            <div className="min-w-[9px] min-h-[9px]" />
                            <span className="px-2">Deposit</span>
                            <div className="min-w-[9px] min-h-[9px]" />
                          </div>
                        </Button>
                      )}
                      {item.handledByExternalUI !== null ? (
                        <Button
                          onClick={() => {
                            // noop, redirect handled by the Link element
                          }}
                        >
                          <div>
                            <Link
                              target="_blank"
                              rel="noreferrer"
                              href={item.handledByExternalUI.url}
                              className="flex flex-row items-center"
                            >
                              <span className="px-2">Withdraw</span>
                              <ExternalLinkIcon width={18} height={18} />
                            </Link>
                          </div>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setShow(true);
                            setModalValues({
                              token: item.symbol,
                              address: value.evmosAddressCosmosFormat,
                              amount: item?.cosmosBalance,
                              decimals: item?.decimals,
                              fee: BigNumber.from("1"),
                              feeDenom: "aevmos",
                              title: "Withdraw",
                              network: "EVMOS",
                              pubkey: value.evmosPubkey,
                              erc20Balance: item.erc20Balance,
                              feeBalance: normalizedAssetsData.feeBalance,
                              networkTo: item.chainIdentifier,
                            });
                          }}
                        >
                          <div className="flex flex-row items-center">
                            <div className="min-w-[9px] min-h-[9px]" />
                            <span className="px-2">Withdraw</span>
                            <div className="min-w-[9px] min-h-[9px]" />
                          </div>
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          setShow(true);
                          setModalValues({
                            token: item.symbol,
                            address: value.evmosAddressCosmosFormat,
                            amount: item.cosmosBalance,
                            decimals: item?.decimals,
                            feeDenom: "aevmos",
                            title: "Convert",
                            network: "EVMOS",
                            pubkey: value.evmosPubkey,
                            fee: BigNumber.from("1"),
                            erc20Balance: item.erc20Balance,
                            feeBalance: normalizedAssetsData.feeBalance,
                            networkTo: item.chainIdentifier,
                          });
                        }}
                      >
                        <div className="flex flex-row items-center">
                          <div className="min-w-[9px] min-h-[9px]" />
                          <span className="px-2">Convert</span>
                          <div className="min-w-[9px] min-h-[9px]" />
                        </div>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
