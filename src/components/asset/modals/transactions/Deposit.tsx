import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import { ModalTitle } from "../../../common/Modal";
import { addSnackbar } from "../../../notification/redux/notificationSlice";
import Arrow from "../common/Arrow";
import ErrorMessage from "../common/ErrorMessage";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import { executeDeposit } from "../../../../internal/asset/functionality/transactions/deposit";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { getBalance } from "../../../../internal/asset/functionality/fetch";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";
import {
  getWallet,
  Token,
} from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import { ethToEvmos } from "@evmos/address-converter";
import {
  EVMOS_CHAIN,
  EVMOS_SYMBOL,
} from "../../../../internal/wallet/functionality/networkConfig";
import {
  BALANCE_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
  EXECUTED_NOTIFICATIONS,
} from "../../../../internal/asset/functionality/transactions/errors";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../internal/asset/style/format";
import {
  KEPLR_NOTIFICATIONS,
  METAMASK_NOTIFICATIONS,
} from "../../../../internal/wallet/functionality/errors";
import AddTokenMetamask from "./AddTokenMetamask";

const Deposit = ({
  item,
  feeBalance,
  address,
  setShow,
}: {
  item: TableDataElement;
  feeBalance: BigNumber;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [addressTo, setAddressTo] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const dispatch = useDispatch();

  const [balance, setBalance] = useState(BIG_ZERO);
  const [walletToUse, setWalletToUse] = useState("");
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    async function getData() {
      const wallet = await getKeplrAddressByChain(
        item.chainId,
        item.chainIdentifier
      );
      if (wallet === null) {
        dispatch(
          addSnackbar({
            id: 0,
            text: KEPLR_NOTIFICATIONS.ErrorTitle,
            subtext: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
            type: "error",
          })
        );
        setShow(false);
        return;
      }
      setWalletToUse(wallet);
      const balance = await getBalance(
        wallet,
        item.chainIdentifier.toUpperCase(),
        item.symbol
      );

      if (balance.error === true || balance.data === null) {
        dispatch(
          addSnackbar({
            id: 0,
            text: BALANCE_NOTIFICATIONS.ErrorGetBalanceExtChain,
            subtext: "",
            type: "error",
          })
        );
        setShow(false);
        return;
      }

      setBalance(
        BigNumber.from(balance.data.balance ? balance.data.balance.amount : 0)
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [address, item, dispatch, setShow]);

  const token: Token = {
    erc20Address: item.erc20Address,
    symbol: item.symbol,
    decimals: item.decimals,
    img: item.pngSrc,
  };
  return (
    <>
      <ModalTitle title={`Deposit ${item.symbol}`} />
      <div className="text-darkGray3">
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
          <FromContainer
            fee={{
              fee: BigNumber.from("5000"),
              feeDenom: item.symbol,
              feeBalance: feeBalance,
              feeDecimals: item.decimals,
            }}
            balance={{
              denom: item.symbol,
              amount: balance,
              decimals: item.decimals,
            }}
            input={{ value: inputValue, setInputValue, confirmClicked }}
            style={{
              tokenTo: item.symbol,
              address: walletToUse,
              img: `/tokens/${item.symbol.toLowerCase()}.png`,
              text: item.symbol,
            }}
          />
        </div>
        <Arrow />
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
          <ToContainer token="EVMOS" img={`/tokens/evmos.png`} />
          <div className="space-y-3">
            <div className="pr-5 pl-2 flex items-center space-x-3 bg-white hover:border-black focus-visible:border-black focus-within:border-black border border-darkGray5 rounded-lg">
              <input
                className="w-full p-3 border-none hover:border-none focus-visible:outline-none"
                value={addressTo}
                onChange={(e) => {
                  setAddressTo(e.target.value);
                }}
              />
            </div>
            {confirmClicked && addressTo === "" && (
              <ErrorMessage text="Address can not be empty" />
            )}
            <h6 className="italic text-sm">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
            <AddTokenMetamask token={token} />

            <div className="flex items-center space-x-5 w-full justify-end">
              <span className="uppercase font-bold">Autofill</span>
              <KeplrIcon
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={async () => {
                  const wallet = await getKeplrAddressByChain(
                    EVMOS_CHAIN.cosmosChainId
                  );
                  if (wallet === null) {
                    dispatch(
                      addSnackbar({
                        id: 0,
                        text: KEPLR_NOTIFICATIONS.ErrorTitle,
                        subtext: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                        type: "error",
                      })
                    );
                    setShow(false);
                    return;
                  }
                  setAddressTo(wallet);
                }}
              />
              <MetamaskIcon
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={async () => {
                  const address = await getWallet();
                  if (address === null) {
                    dispatch(
                      addSnackbar({
                        id: 0,
                        text: METAMASK_NOTIFICATIONS.ErrorTitle,
                        subtext: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                        type: "error",
                      })
                    );
                    setShow(false);
                    return;
                  }
                  setAddressTo(address);
                }}
              />
            </div>
          </div>
        </div>
        <ConfirmButton
          disabled={disabled}
          onClick={async () => {
            setConfirmClicked(true);
            if (wallet.osmosisPubkey === null) {
              dispatch(
                addSnackbar({
                  id: 0,
                  text: "Wallet not connected",
                  subtext: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                  type: "error",
                })
              );
              setShow(false);
              return;
            }
            const amount = parseUnits(
              inputValue,
              BigNumber.from(item.decimals)
            );
            if (
              inputValue === undefined ||
              inputValue === null ||
              inputValue === "" ||
              addressTo === undefined ||
              addressTo === null ||
              addressTo === "" ||
              amount.gt(balance)
            ) {
              return;
            }

            const keplrAddress = await getKeplrAddressByChain(item.chainId);
            if (keplrAddress === null) {
              return;
            }

            let addressEvmos = addressTo;
            if (addressTo.startsWith("0x")) {
              addressEvmos = ethToEvmos(addressTo);
            }
            const params: IBCChainParams = {
              sender: keplrAddress,
              receiver: addressEvmos,
              amount: amount.toString(),
              srcChain: item.chainIdentifier,
              dstChain: EVMOS_SYMBOL,
              token: item.symbol,
            };
            setDisabled(true);

            dispatch(
              addSnackbar({
                id: 0,
                text: EXECUTED_NOTIFICATIONS.IBCTransferInformation.text,
                subtext: EXECUTED_NOTIFICATIONS.IBCTransferInformation.subtext,
                type: "default",
              })
            );
            // create, sign and broadcast tx
            const res = await executeDeposit(
              wallet.osmosisPubkey,
              keplrAddress,
              params,
              item.chainIdentifier.toUpperCase(),
              wallet.extensionName,
              item.prefix
            );

            dispatch(
              addSnackbar({
                id: 0,
                text: res.title,
                subtext: res.message,
                type: res.error === true ? "error" : "success",
              })
            );

            // check if tx is executed
            if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
              dispatch(snackbarWaitingBroadcast());
              dispatch(
                await snackbarIncludedInBlock(
                  res.txHash,
                  item.chainIdentifier.toUpperCase()
                )
              );

              dispatch(
                await snackbarExecutedTx(
                  res.txHash,
                  item.chainIdentifier.toUpperCase()
                )
              );
            }

            setShow(false);
          }}
          text="Deposit"
        />
      </div>
    </>
  );
};

export default Deposit;
