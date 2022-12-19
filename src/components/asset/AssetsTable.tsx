import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAssetsForAddress } from "../../internal/asset/functionality/fetch";

import Button from "../common/Button";
import MessageTable from "./MessageTable";
import ModalAsset from "./modals/ModalAsset";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/Store";
import Switch from "./Switch";
import Image from "next/image";
import {
  convertFromAtto,
  formatNumber,
} from "../../internal/asset/style/format";
import { BigNumber } from "ethers";

const DataModal = {
  token: "",
  address: "",
  amount: BigNumber.from("0"),
  title: "",
  network: "",
  decimals: 1,
  fee: BigNumber.from("0"),
  feeDenom: "",
  pubkey: "",
  erc20Balance: BigNumber.from("0"),
};

export type DataModalType = {
  token: string;
  address: string;
  amount: BigNumber;
  title: string;
  network: string;
  decimals: number;
  fee: BigNumber;
  feeDenom: string;
  pubkey: string | null;
  erc20Balance: BigNumber;
};

export type DataBalance = {
  name: string;
  cosmosBalance: BigNumber;
  decimals: number;
  description: string;
  erc20Balance: BigNumber;
  symbol: string;
  tokenName: string;
};

export type DataQuery = {
  name: string;
  cosmosBalance: string;
  decimals: string;
  description: string;
  erc20Balance: string;
  symbol: string;
  tokenName: string;
};

export type BalanceType = {
  balance: DataQuery[];
};

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);

  const [modalValues, setModalValues] = useState<DataModalType>(DataModal);

  const value = useSelector((state: StoreType) => state.wallet.value);

  // for testing
  const [address, setAddress] = useState("");
  const [hexAddress, setHexAddress] = useState("");

  useEffect(() => {
    setAddress(value.evmosAddressCosmosFormat);
    setHexAddress(value.evmosAddressEthFormat);
  }, [value]);

  const { data, error, isLoading } = useQuery<BalanceType, Error>({
    queryKey: ["assets", address, hexAddress],
    queryFn: () => getAssetsForAddress(address, hexAddress),
  });

  const [hideZeroBalance, setHideBalance] = useState(false);

  // console.log(qwe);

  const newData = useMemo<DataBalance[]>(() => {
    const temp: DataBalance[] = [];
    data?.balance.map((item) => {
      temp.push({
        name: item.name,
        cosmosBalance: BigNumber.from(item.cosmosBalance),
        decimals: parseInt(item.decimals, 10),
        description: item.description,
        erc20Balance: BigNumber.from(item.erc20Balance),
        symbol: item.symbol,
        tokenName: item.tokenName,
      });
    });
    return temp;
  }, [data]);

  const tableData = useMemo(() => {
    return newData?.filter((asset) =>
      hideZeroBalance
        ? asset.erc20Balance.eq(BigNumber.from("0")) ||
          asset.cosmosBalance.eq(BigNumber.from("0"))
        : asset
    );
  }, [newData, hideZeroBalance]);

  return (
    <>
      <Switch
        onChange={() => setHideBalance(!hideZeroBalance)}
        checked={hideZeroBalance}
      />
      <table className="text-white w-full font-[IBM]">
        <thead className="uppercase ">
          <tr>
            <th className="text-left px-8 py-4">Asset</th>
            <th className="text-left">IBC Balance</th>
            <th className="text-left">ERC-20 Balance</th>
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

          {error && (
            <MessageTable>
              <>
                {/* add exclamation icon */}
                <p>Request failed</p>
              </>
            </MessageTable>
          )}

          {tableData?.length === 0 && (
            <MessageTable>
              <>
                {/* add exclamation icon */}
                <p>No results </p>
              </>
            </MessageTable>
          )}
          {tableData?.map((item: DataBalance, index: number) => {
            return (
              <tr className="" key={index}>
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
                      {/* wallet ? : "0" */}
                      {formatNumber(
                        convertFromAtto(item.cosmosBalance, item.decimals)
                      )}
                    </span>
                    <span className="text-sm text-darkGray5">
                      {/*TODO: get value from backend  */}$
                      {/* wallet ? : "0" */}
                      {formatNumber(
                        convertFromAtto(item.cosmosBalance, item.decimals)
                      )}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-start uppercase">
                    <span className="font-bold">
                      {/* wallet ? : "0" */}
                      {formatNumber(
                        convertFromAtto(item.erc20Balance, item.decimals)
                      )}
                      {item.symbol.toUpperCase() === "EVMOS" ? " WEVMOS" : ""}
                    </span>
                    <span className="text-sm text-darkGray5">
                      {/*TODO: get value from backend  */}$
                      {/* wallet ? : "0" */}
                      {formatNumber(
                        convertFromAtto(item.erc20Balance, item.decimals)
                      )}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="space-x-3 flex justify-center">
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
                        });
                      }}
                    >
                      <span>Deposit</span>
                    </Button>{" "}
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
                        });
                      }}
                    >
                      <span>Withdraw</span>
                    </Button>
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
                        });
                      }}
                    >
                      <span>Convert</span>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalAsset show={show} modalValues={modalValues} close={close} />
    </>
  );
};

export default AssetsTable;
