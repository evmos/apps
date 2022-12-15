import { useCallback, useState } from "react";
import Button from "../common/Button";
import KeplrIcon from "../common/images/icons/KeplrIcon";
import MetamaskIcon from "../common/images/icons/MetamaskIcon";
import WalletConnectIcon from "../common/images/icons/WalletConnectIcon";
import ModalAsset from "./modals/ModalAsset";

const arrayBalance = [
  {
    icon: <MetamaskIcon />,
    token: "EVMOS",
    description: "EVMOS",
    ibcBalance: 0,
    ibcBalanceDescription: 0,
    erc20Balance: 0,
    erc20BalanceDescription: 0,
  },
  {
    icon: <KeplrIcon />,
    token: "gWeth",
    description: "Wrapped Ether via Gravity Bridge",
    ibcBalance: 1,
    ibcBalanceDescription: 1,
    erc20Balance: 2,
    erc20BalanceDescription: 2,
  },
  {
    icon: <WalletConnectIcon />,
    token: "gUSDC",
    description: "Wrapped Ether via Gravity Bridge",
    ibcBalance: 1,
    ibcBalanceDescription: 1,
    erc20Balance: 2,
    erc20BalanceDescription: 2,
  },
];

const DataModal = {
  token: "",
  address: "",
  amount: 0,
  title: "",
  network: "",
};

export declare type DataModalType = {
  token: string;
  address: string;
  amount: number;
  title: string;
  network: string;
};

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);

  const [modalValues, setModalValues] = useState(DataModal);

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
          {arrayBalance.map((item, index) => {
            return (
              <tr className="" key={index}>
                <td>
                  <div className="flex items-center space-x-5">
                    {item.icon}
                    <div className="flex flex-col items-start ">
                      <span className="font-bold">{item.token}</span>
                      <span className="text-sm text-darkGray5">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-start uppercase">
                    <span className="font-bold">{item.ibcBalance}</span>
                    <span className="text-sm text-darkGray5">
                      ${item.ibcBalanceDescription}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-start uppercase">
                    <span className="font-bold">
                      {item.erc20Balance}{" "}
                      {item.token.toUpperCase() === "EVMOS" ? "WEVMOS" : ""}
                    </span>
                    <span className="text-sm text-darkGray5">
                      ${item.erc20BalanceDescription}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="space-x-3 flex justify-center">
                    <Button
                      onClick={() => {
                        setShow(true);
                        setModalValues({
                          token: item.token,
                          address: "address",
                          amount: item.ibcBalance,
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
                          token: item.token,
                          address: "address",
                          amount: item.ibcBalance,
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
                          token: item.token,
                          address: "address",
                          amount: item.ibcBalance,
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
