import { useCallback, useState } from "react";
import Button from "../common/Button";
import KeplrIcon from "../common/images/icons/KeplrIcon";
import MetamaskIcon from "../common/images/icons/MetamaskIcon";
import WalletConnectIcon from "../common/images/icons/WalletConnectIcon";
import Modal from "../common/Modal";
import ContentModalAssets from "./ContentModalAssets";

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

const AssetsTable = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);
  return (
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
        <Modal title={`Deposit`} show={show} onClose={close}>
          <ContentModalAssets
            token="token"
            address="evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak"
            amount={5}
          />
        </Modal>
        {arrayBalance.map((item, index) => {
          return (
            <tr className="" key={index}>
              <td>
                <div className="flex items-center space-x-5">
                  {item.icon}
                  <div className="flex flex-col items-start ">
                    <span className="">{item.token}</span>
                    <span className="text-sm text-darkGray5">
                      {item.description}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start uppercase">
                  <span className="">{item.ibcBalance}</span>
                  <span className="text-sm text-darkGray5">
                    ${item.ibcBalanceDescription}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start uppercase">
                  <span className="">
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
                  <Button onClick={open}>
                    <span>Deposit</span>
                  </Button>{" "}
                  <Button onClick={() => {}}>
                    <span>Withdraw</span>
                  </Button>{" "}
                  <Button onClick={() => {}}>
                    <span>Convert</span>
                  </Button>{" "}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AssetsTable;
