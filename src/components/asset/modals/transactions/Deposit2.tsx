import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import { ModalTitle } from "../../../common/Modal";
import { executeDeposit } from "../../../../internal/asset/functionality/transactions/deposit";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { getBalance } from "../../../../internal/asset/functionality/fetch";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";

import { ethToEvmos } from "@evmos/address-converter";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { BROADCASTED_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../internal/asset/style/format";
import DepositReceiver from "../common/DepositReceiver";
import AmountDeposit from "../common/AmountDeposit";
import DepositSender from "../common/DepositSender";
import {
  snackErrorConnectingKeplr,
  snackErrorGettingBalanceExtChain,
  snackExecuteIBCTransfer,
  snackIBCInformation,
  snackRequestRejected,
} from "../../../../internal/asset/style/snackbars";
import RedirectLink from "../common/RedirectLink";

const Deposit2 = ({
  data,
  feeBalance,
  address,
  setShow,
}: {
  data: TableData;
  feeBalance: BigNumber;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [receiver, setReceiver] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const dispatch = useDispatch();

  const [balance, setBalance] = useState(BIG_ZERO);
  const [walletToUse, setWalletToUse] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [token, setToken] = useState<TableDataElement>();

  useEffect(() => {
    async function getData() {
      if (token !== undefined) {
        const wallet = await getKeplrAddressByChain(
          token.chainId,
          token.chainIdentifier
        );
        if (wallet === null) {
          dispatch(snackErrorConnectingKeplr());
          setShow(false);
          return;
        }
        setWalletToUse(wallet);
        const balance = await getBalance(
          wallet,
          token.chainIdentifier.toUpperCase(),
          token.symbol
        );

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
  }, [address, token, dispatch, setShow]);

  const handleConfirmButton = async () => {
    setConfirmClicked(true);
    if (wallet.osmosisPubkey === null) {
      dispatch(snackRequestRejected());
      setShow(false);
      return;
    }
    if (token === undefined) {
      return;
    }

    const amount = parseUnits(inputValue, BigNumber.from(token.decimals));
    if (
      inputValue === undefined ||
      inputValue === null ||
      inputValue === "" ||
      receiver === undefined ||
      receiver === null ||
      receiver === "" ||
      amount.gt(balance)
    ) {
      return;
    }

    const keplrAddress = await getKeplrAddressByChain(token.chainId);
    if (keplrAddress === null) {
      return;
    }

    let addressEvmos = receiver;
    if (receiver.startsWith("0x")) {
      addressEvmos = ethToEvmos(receiver);
    }
    const params: IBCChainParams = {
      sender: keplrAddress,
      receiver: addressEvmos,
      amount: amount.toString(),
      srcChain: token.chainIdentifier,
      dstChain: EVMOS_SYMBOL,
      token: token.symbol,
    };
    setDisabled(true);

    dispatch(snackIBCInformation());
    // create, sign and broadcast tx
    const res = await executeDeposit(
      wallet.osmosisPubkey,
      keplrAddress,
      params,
      token.chainIdentifier.toUpperCase(),
      wallet.extensionName,
      token.prefix
    );

    dispatch(snackExecuteIBCTransfer(res));
    setShow(false);
    // check if tx is executed
    if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
      dispatch(snackbarWaitingBroadcast());
      dispatch(
        await snackbarIncludedInBlock(
          res.txHash,
          token.chainIdentifier.toUpperCase(),
          res.explorerTxUrl
        )
      );

      dispatch(
        await snackbarExecutedTx(
          res.txHash,
          token.chainIdentifier.toUpperCase()
        )
      );
    }
  };

  return (
    <>
      <ModalTitle title="Deposit Tokens" />
      <div className="text-darkGray3 space-y-3">
        <DepositSender token={token} address={walletToUse} />

        <AmountDeposit
          data={data}
          setTokenTo={setToken}
          tokenTo={token}
          value={inputValue}
          setValue={setInputValue}
          confirmClicked={confirmClicked}
          setAddressTo={setReceiver}
          balance={balance}
          fee={{
            fee: BigNumber.from("5000"),
            feeDenom: token?.symbol,
            feeBalance: feeBalance,
            feeDecimals: token?.decimals,
          }}
        />

        {token === undefined || token.handledByExternalUI === null ? (
          <DepositReceiver
            receiver={receiver}
            setReceiver={setReceiver}
            setShow={setShow}
            confirmClicked={confirmClicked}
            token={token}
          />
        ) : (
          ""
        )}
      </div>
      {token !== undefined && token.handledByExternalUI !== null ? (
        <RedirectLink
          href={token.handledByExternalUI.url}
          text="Deposit from Axelar"
        />
      ) : (
        <ConfirmButton
          disabled={disabled}
          text="DEPOSIT"
          onClick={handleConfirmButton}
        />
      )}
    </>
  );
};

export default Deposit2;
