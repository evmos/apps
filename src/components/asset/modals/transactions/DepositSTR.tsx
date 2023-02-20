import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import ConfirmButton from "../../../common/ConfirmButton";
import { ModalTitle } from "../../../common/Modal";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import {
  getBalance,
  getEvmosBalanceForDeposit,
} from "../../../../internal/asset/functionality/fetch";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";
import DepositReceiver from "../common/deposit/DepositReceiver";
import AmountDeposit from "../common/deposit/AmountDeposit";
import DepositSender from "../common/deposit/DepositSender";
import {
  snackErrorConnectingKeplr,
  snackErrorGettingBalanceExtChain,
} from "../../../../internal/asset/style/snackbars";
import RedirectLink from "../common/RedirectLink";
import { ButtonActionsProps } from "./types";
import { useDeposit } from "./hooks/useDeposit";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { getChainIds } from "../../../../internal/asset/style/format";

export type DepositElement = {
  chain: string;
  elements: TableDataElement[];
};

const DepositSTR = ({
  data,
  feeBalance,
  address,
  setShow,
}: ButtonActionsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [balance, setBalance] = useState(BIG_ZERO);
  const [walletToUse, setWalletToUse] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState<TableDataElement>();
  const [chain, setChain] = useState<TableDataElement>();

  const depositData = useMemo(() => {
    const temp = new Array<DepositElement>();
    let evmos: TableDataElement;
    data.table.map((item) => {
      if (item.chainIdentifier === "Evmos") {
        evmos = item;
        return;
      }
      const element = temp.find((e) => {
        if (e.chain === item.chainIdentifier) {
          return true;
        }
        return false;
      });

      if (element !== undefined) {
        element.elements.push(item);
      } else {
        temp.push({ chain: item.chainIdentifier, elements: [item] });
      }
    });

    temp.map((e) => {
      if (e.chain !== "Evmos") {
        e.elements.push(evmos);
      }
    });

    temp.sort((a, b) => {
      return a.chain.toLowerCase() > b.chain.toLowerCase() ? 1 : -1;
    });
    console.log(temp);

    return temp;
  }, [data]);

  const dispatch = useDispatch();

  const useDepositProps = {
    setConfirmClicked,
    setShow,
    token,
    inputValue,
    receiverAddress,
    setDisabled,
    balance,
    chain,
  };

  const { handleConfirmButton } = useDeposit(useDepositProps);

  const chainIds = getChainIds(token, chain);

  useEffect(() => {
    async function getData() {
      if (chain === undefined) {
        setWalletToUse("");
      }
      if (token !== undefined && chainIds.chainId !== undefined) {
        const wallet = await getKeplrAddressByChain(
          chainIds.chainId,
          chainIds.chainIdentifier
        );
        if (wallet === null) {
          dispatch(snackErrorConnectingKeplr());
          setShow(false);
          return;
        }
        setWalletToUse(wallet);
        let balance;
        if (
          token.symbol === EVMOS_SYMBOL &&
          chainIds.chainIdentifier !== undefined
        ) {
          balance = await getEvmosBalanceForDeposit(
            wallet,
            chainIds.chainIdentifier.toUpperCase(),
            token.symbol
          );
        } else {
          balance = await getBalance(
            wallet,
            token.chainIdentifier.toUpperCase(),
            token.symbol
          );
        }

        if (balance.error === true || balance.data === null) {
          dispatch(snackErrorGettingBalanceExtChain());
          setShow(false);
          return;
        }

        setBalance(
          BigNumber.from(balance.data.balance ? balance.data.balance.amount : 0)
        );
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [
    address,
    token,
    dispatch,
    setShow,
    chainIds.chainId,
    chainIds.chainIdentifier,
    chain,
  ]);

  const amountProps = {
    data: data,
    setToken: setToken,
    token: token,
    value: inputValue,
    setValue: setInputValue,
    confirmClicked: confirmClicked,
    setReceiverAddress: setReceiverAddress,
    balance: balance,
    fee: {
      fee: BigNumber.from("5000"),
      feeDenom: token?.symbol,
      feeBalance: feeBalance,
      feeDecimals: token?.decimals,
    },
    setChain: setChain,
    chain: chain,
  };

  const depositContent = () => {
    return (
      <>
        <DepositReceiver
          receiver={receiverAddress}
          setReceiver={setReceiverAddress}
          setShow={setShow}
          confirmClicked={confirmClicked}
          token={token}
        />
        <ConfirmButton
          disabled={disabled}
          text="DEPOSIT"
          onClick={handleConfirmButton}
        />
      </>
    );
  };

  const depositDiv = () => {
    // No token selected, display deposit and confirm button
    if (token === undefined) {
      return depositContent();
    }

    // If chain is from axelar, return redirect component
    if (chain !== undefined && chain.handledByExternalUI !== null) {
      return (
        <RedirectLink
          href={chain.handledByExternalUI.url}
          text="Deposit from Axelar"
        />
      );
    }
    // If token is from axelar, return redirect component
    if (token !== undefined && token.handledByExternalUI !== null) {
      return (
        <RedirectLink
          href={token.handledByExternalUI.url}
          text="Deposit from Axelar"
        />
      );
    }

    return depositContent();
  };

  return (
    <>
      <ModalTitle title="Deposit Tokens" />
      <div className="text-darkGray3 space-y-3">
        <DepositSender
          token={token}
          address={walletToUse}
          dropChainProps={{
            placeholder: "Select chain...",
            data: depositData,
            token: token,
            chain: chain,
            setChain: setChain,
            setAddress: setReceiverAddress,
          }}
        />

        <AmountDeposit amountProps={amountProps} />
        {depositDiv()}
      </div>
    </>
  );
};

export default DepositSTR;
