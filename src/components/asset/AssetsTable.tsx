import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getAssetsForAddress } from "../../internal/asset/functionality/fetch";
import Button from "../common/Button";
import MessageTable from "./MessageTable";
import ModalAsset from "./modals/ModalAsset";

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
  decimals: number;
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

  // for testing
  const address = "evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65";
  const hexAddress = "0xaF3219826Cb708463B3AA3B73c6640A21497AE49";

  const { data, error, isLoading } = useQuery<BalanceType, Error>({
    queryKey: ["assets", address, hexAddress],
    queryFn: () => getAssetsForAddress(address, hexAddress),
  });

  return (
    <>
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
          {data?.balance.map((item: DataBalance, index: number) => {
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
                      {Number(item.cosmosBalance) / item.decimals}
                    </span>
                    <span className="text-sm text-darkGray5">
                      {/*TODO: calculate value */}${item.cosmosBalance}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-start uppercase">
                    <span className="font-bold">
                      {item.erc20Balance}{" "}
                      {item.symbol.toUpperCase() === "EVMOS" ? "WEVMOS" : ""}
                    </span>
                    <span className="text-sm text-darkGray5">
                      {/*TODO: calculate value */}${item.erc20Balance}
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
                          address: "address",
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
                          address: "address",
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
                          address: "address",
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
