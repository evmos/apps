import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAssetsForAddress } from "../../internal/asset/functionality/fetch";
import {
  convertFromAtto,
  formatNumber,
} from "../../internal/asset/style/format";
import Button from "../common/Button";
import MessageTable from "./MessageTable";
import ModalAsset from "./modals/ModalAsset";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/Store";
import Switch from "../common/Switch";

const DataModal = {
  token: "",
  address: "",
  amount: 0,
  title: "",
  network: "",
};

export type DataModalType = {
  token: string;
  address: string;
  amount: number;
  title: string;
  network: string;
};

export type DataBalance = {
  name: string;
  cosmosBalance: string;
  decimals: string;
  description: string;
  erc20Balance: string;
  symbol: string;
  tokenName: string;
};

export type BalanceType = {
  balance: DataBalance[];
};
const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);

  const [modalValues, setModalValues] = useState(DataModal);

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

  const tableData = useMemo(() => {
    return data?.balance.filter((asset) =>
      hideZeroBalance
        ? asset.erc20Balance !== "0" || asset.cosmosBalance !== "0"
        : asset
    );
  }, [data, hideZeroBalance]);

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
                <p>All your tokens have 0 balance. </p>
              </>
            </MessageTable>
          )}
          {tableData?.map((item: DataBalance, index: number) => {
            const coinCosmosBalance = BigNumber.from(
              item?.cosmosBalance || "0"
            );
            const convertCosmosBalance = String(
              convertFromAtto(coinCosmosBalance, item.decimals)
            );

            const coinERC20Balance = BigNumber.from(item.erc20Balance || "0");
            const convertERC20Balance = String(
              convertFromAtto(coinERC20Balance, item.decimals)
            );
            return (
              <tr className="" key={index}>
                <td>
                  <div className="flex items-center space-x-5">
                    {/*TODO: add {item.icon} */}
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
                        convertCosmosBalance,
                        undefined,
                        "standard"
                      )}
                    </span>
                    <span className="text-sm text-darkGray5">
                      {/*TODO: get value from backend  */}$
                      {/* wallet ? : "0" */}
                      {formatNumber(Number(convertCosmosBalance))}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-start uppercase">
                    <span className="font-bold">
                      {/* wallet ? : "0" */}

                      {formatNumber(convertERC20Balance, undefined, "standard")}
                      {item.symbol.toUpperCase() === "EVMOS" ? " WEVMOS" : ""}
                    </span>
                    <span className="text-sm text-darkGray5">
                      {/*TODO: get value from backend  */}$
                      {/* wallet ? : "0" */}
                      {formatNumber(Number(convertERC20Balance))}
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
                          amount: Number(item.cosmosBalance),
                          title: "Deposit",
                          network: "EVMOS",
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
                          amount: Number(item.cosmosBalance),
                          title: "Withdraw",
                          network: "EVMOS",
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
                          amount: Number(item.cosmosBalance),
                          title: "Convert",
                          network: "EVMOS",
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
