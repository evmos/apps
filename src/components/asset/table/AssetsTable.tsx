import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import MessageTable from "./MessageTable";
import { useSelector } from "react-redux";
import Image from "next/image";
import { BigNumber } from "ethers";
import { DataModal, EmptyDataModal } from "../modals/types";
import { StoreType } from "../../../redux/Store";
import { ERC20BalanceResponse, TableData } from "./types";
import { getAssetsForAddress } from "../../../internal/asset/functionality/fetch";
import Switch from "../utils/Switch";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../internal/asset/style/format";
import Button from "../../common/Button";
import ModalAsset from "../modals/ModalAsset";
import ExternalLinkIcon from "../../common/images/icons/ExternalLink";

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);

  const [modalValues, setModalValues] = useState<DataModal>(EmptyDataModal);

  const value = useSelector((state: StoreType) => state.wallet.value);

  // for testing
  const [address, setAddress] = useState("");
  const [hexAddress, setHexAddress] = useState("");

  useEffect(() => {
    setAddress(value.evmosAddressCosmosFormat);
    setHexAddress(value.evmosAddressEthFormat);
  }, [value]);

  const { data, error, isLoading } = useQuery<ERC20BalanceResponse, Error>({
    queryKey: ["assets", address, hexAddress],
    queryFn: () => getAssetsForAddress(address, hexAddress),
  });

  const [hideZeroBalance, setHideBalance] = useState(false);

  const newData = useMemo<TableData>(() => {
    const temp: TableData = { table: [], feeBalance: BigNumber.from(0) };

    data?.balance.map((item) => {
      let external = null;
      if (
        item.handledByExternalUI !== null &&
        item.handledByExternalUI.length > 0
      ) {
        external = item.handledByExternalUI[0];
      }
      if (item.tokenName.toUpperCase() === "EVMOS") {
        temp.feeBalance = BigNumber.from(item.cosmosBalance);
      }
      temp.table.push({
        name: item.name,
        cosmosBalance: BigNumber.from(item.cosmosBalance),
        decimals: parseInt(item.decimals, 10),
        description: item.description,
        erc20Balance: BigNumber.from(item.erc20Balance),
        symbol: item.symbol,
        tokenName: item.tokenName,
        chainId: item.chainId,
        chainIdentifier: item.chainIdentifier,
        handledByExternalUI: external,
        coingeckoPrice: Number(item.coingeckoPrice),
      });
    });
    return temp;
  }, [data]);

  const tableData = useMemo(() => {
    return newData?.table.filter((asset) => {
      if (
        hideZeroBalance === true &&
        asset.erc20Balance.eq(BigNumber.from("0")) &&
        asset.cosmosBalance.eq(BigNumber.from("0"))
      ) {
        return false;
      }
      return true;
    });
  }, [newData, hideZeroBalance]);

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
                  {/* add exclamation icon */}
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
                            if (item.handledByExternalUI !== null) {
                              console.log(item.handledByExternalUI.url);
                            }
                          }}
                        >
                          <div className="flex flex-row items-center">
                            <span className="px-2">Deposit</span>
                            <ExternalLinkIcon width={18} height={18} />
                          </div>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setShow(true);
                            setModalValues({
                              token: item.symbol,
                              address: address,
                              amount: item.cosmosBalance,
                              title: "Deposit",
                              network: "EVMOS",
                              decimals: item?.decimals,
                              feeDenom: "aevmos",
                              pubkey: value.evmosPubkey,
                              fee: BigNumber.from("1"),
                              erc20Balance: item.erc20Balance,
                              feeBalance: BigNumber.from("1"),
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
                            if (item.handledByExternalUI !== null) {
                              console.log(item.handledByExternalUI.url);
                            }
                          }}
                        >
                          <div className="flex flex-row items-center">
                            <span className="px-2">Withdraw</span>
                            <ExternalLinkIcon width={18} height={18} />
                          </div>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setShow(true);
                            setModalValues({
                              token: item.symbol,
                              address: address,
                              amount: item?.cosmosBalance,
                              decimals: item?.decimals,
                              fee: BigNumber.from("1"),
                              feeDenom: "aevmos",
                              title: "Withdraw",
                              network: "EVMOS",
                              pubkey: value.evmosPubkey,
                              erc20Balance: item.erc20Balance,
                              feeBalance: BigNumber.from("1"),
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
                      {item.handledByExternalUI !== null ? (
                        <Button
                          onClick={() => {
                            if (item.handledByExternalUI !== null) {
                              console.log(item.handledByExternalUI.url);
                            }
                          }}
                        >
                          <div className="flex flex-row items-center">
                            <span className="px-2">Withdraw</span>
                            <ExternalLinkIcon width={18} height={18} />
                          </div>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setShow(true);
                            setModalValues({
                              token: item.symbol,
                              address: address,
                              amount: item.cosmosBalance,
                              decimals: item?.decimals,
                              feeDenom: "aevmos",
                              title: "Convert",
                              network: "EVMOS",
                              pubkey: value.evmosPubkey,
                              fee: BigNumber.from("1"),
                              erc20Balance: item.erc20Balance,
                              feeBalance: newData.feeBalance,
                            });
                          }}
                        >
                          <div className="flex flex-row items-center">
                            <div className="min-w-[9px] min-h-[9px]" />
                            <span className="px-2">Convert</span>
                            <div className="min-w-[9px] min-h-[9px]" />
                          </div>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalAsset show={show} modalValues={modalValues} close={close} />
    </>
  );
};

export default AssetsTable;
