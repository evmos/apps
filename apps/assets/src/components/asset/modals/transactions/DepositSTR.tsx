// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { ConfirmButton, ModalTitle } from "ui-helpers";
import {
  getBalance,
  getEvmosBalanceForDeposit,
} from "../../../../internal/asset/functionality/fetch";
import DepositReceiver from "../common/deposit/DepositReceiver";
import AmountDeposit from "../common/deposit/AmountDeposit";
import DepositSender from "../common/deposit/DepositSender";
import RedirectLink from "../common/RedirectLink";
import { ButtonActionsProps } from "./types";
import { useDeposit } from "./hooks/useDeposit";
import {
  getKeplrAddressByChain,
  snackErrorConnectingKeplr,
  snackErrorGettingBalanceExtChain,
  EVMOS_SYMBOL,
} from "evmos-wallet";
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
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [walletToUse, setWalletToUse] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState<TableDataElement>();
  const [chain, setChain] = useState<DepositElement>();

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

  useEffect(() => {
    async function getData() {
      if (chain === undefined) {
        setWalletToUse("");
      }
      if (chain !== undefined) {
        const wallet = await getKeplrAddressByChain(
          chain.elements[0].chainId,
          chain.elements[0].chainIdentifier
        );
        if (wallet === null) {
          dispatch(snackErrorConnectingKeplr());
          setShow(false);
          return;
        }
        setWalletToUse(wallet);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [address, token, dispatch, setShow, chain]);

  const tokenData = useMemo(() => {
    const tokens = depositData.find((e) => {
      return e.chain === chain?.chain;
    });

    return tokens?.elements;
  }, [depositData, chain]);

  useEffect(() => {
    async function getData() {
      let balance;
      if (token !== undefined) {
        if (token.symbol === EVMOS_SYMBOL && chain !== undefined) {
          balance = await getEvmosBalanceForDeposit(
            walletToUse,
            chain.chain.toUpperCase(),
            token.symbol
          );
        } else {
          balance = await getBalance(
            walletToUse,
            token.chainIdentifier.toUpperCase(),
            token.symbol
          );
        }
      }
      if (balance?.error === true || balance?.data === null) {
        dispatch(snackErrorGettingBalanceExtChain());
        setShow(false);
        return;
      }

      setBalance(
        BigNumber.from(balance?.data.balance ? balance.data.balance.amount : 0)
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [chain, token, walletToUse, dispatch, setShow]);

  const amountProps = {
    data: tokenData,
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
    // If chain is from axelar, return redirect component
    if (chain !== undefined && chain.elements[0].handledByExternalUI !== null) {
      return (
        <RedirectLink
          href={chain.elements[0].handledByExternalUI.url}
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
      <div className="space-y-3 text-darkGray3">
        <DepositSender
          address={walletToUse}
          dropChainProps={{
            placeholder: "Select chain...",
            data: depositData,
            token: token,
            chain: chain,
            setChain: setChain,
            setAddress: setReceiverAddress,
            setToken: setToken,
          }}
        />

        <AmountDeposit amountProps={amountProps} />
        {depositDiv()}
      </div>
    </>
  );
};

export default DepositSTR;
