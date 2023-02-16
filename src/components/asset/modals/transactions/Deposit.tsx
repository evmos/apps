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
import {
  getBalance,
  getEvmosBalanceForDeposit,
} from "../../../../internal/asset/functionality/fetch";
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
  WALLET_NOTIFICATIONS,
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
import {
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
} from "../../../notification/types";

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

  // TODO: We'll work on this once we start with
  // single token representation
  // This function only supports OSMOSIS - EVMOS case.
  let chainId = item.chainId;
  let chainIdentifier = item.chainIdentifier;
  if (item.symbol === EVMOS_SYMBOL) {
    chainId = "osmosis-1";
    chainIdentifier = "OSMOSIS";
  }
  useEffect(() => {
    async function getData() {
      const walletKeplr = await getKeplrAddressByChain(
        chainId,
        chainIdentifier
      );
      if (walletKeplr === null) {
        dispatch(
          addSnackbar({
            id: 0,
            content: {
              type: SNACKBAR_CONTENT_TYPES.TEXT,
              title: KEPLR_NOTIFICATIONS.ErrorTitle,
              text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
            },
            type: SNACKBAR_TYPES.ERROR,
          })
        );
        setShow(false);
        return;
      }
      setWalletToUse(walletKeplr);
      let balance;
      if (item.symbol === EVMOS_SYMBOL) {
        balance = await getEvmosBalanceForDeposit(
          walletKeplr,
          chainIdentifier.toUpperCase(),
          item.symbol
        );
      } else {
        balance = await getBalance(
          walletKeplr,
          item.chainIdentifier.toUpperCase(),
          item.symbol
        );
      }

      if (balance.error === true || balance.data === null) {
        dispatch(
          addSnackbar({
            id: 0,
            content: {
              type: SNACKBAR_CONTENT_TYPES.TEXT,
              title: BALANCE_NOTIFICATIONS.ErrorGetBalanceExtChain,
            },

            type: SNACKBAR_TYPES.ERROR,
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
  }, [address, item, dispatch, setShow, chainId, chainIdentifier]);

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
              img:
                item.symbol === EVMOS_SYMBOL
                  ? "/assets/tokens/osmo.png"
                  : `/assets/tokens/${item.symbol.toLowerCase()}.png`,
              text: item.symbol === EVMOS_SYMBOL ? "OSMO" : item.symbol,
            }}
          />
        </div>
        <Arrow />
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
          <ToContainer token="EVMOS" img={`/assets/tokens/evmos.png`} />
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
            <h6 className="italic text-sm font-bold">
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
                        content: {
                          type: SNACKBAR_CONTENT_TYPES.TEXT,
                          title: KEPLR_NOTIFICATIONS.ErrorTitle,
                          text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                        },
                        type: SNACKBAR_TYPES.ERROR,
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
                        content: {
                          type: SNACKBAR_CONTENT_TYPES.TEXT,
                          title: METAMASK_NOTIFICATIONS.ErrorTitle,
                          text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                        },
                        type: SNACKBAR_TYPES.ERROR,
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
                  content: {
                    type: SNACKBAR_CONTENT_TYPES.TEXT,
                    title: WALLET_NOTIFICATIONS.ErrorTitle,
                    text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                  },
                  type: SNACKBAR_TYPES.ERROR,
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
            const keplrAddress = await getKeplrAddressByChain(chainId);
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
              srcChain: chainIdentifier,
              dstChain: EVMOS_SYMBOL,
              token: item.symbol,
            };
            setDisabled(true);

            dispatch(
              addSnackbar({
                id: 0,
                content: {
                  type: SNACKBAR_CONTENT_TYPES.TEXT,
                  title: EXECUTED_NOTIFICATIONS.IBCTransferInformation.text,
                  text: EXECUTED_NOTIFICATIONS.IBCTransferInformation.subtext,
                },
                type: SNACKBAR_TYPES.DEFAULT,
              })
            );
            // create, sign and broadcast tx
            const res = await executeDeposit(
              wallet.osmosisPubkey,
              keplrAddress,
              params,
              chainIdentifier.toUpperCase(),
              wallet.extensionName,
              item.prefix
            );

            dispatch(
              addSnackbar({
                id: 0,
                content:
                  res.error === true
                    ? {
                        type: SNACKBAR_CONTENT_TYPES.TEXT,
                        title: res.title,
                        text: res.message,
                      }
                    : {
                        type: SNACKBAR_CONTENT_TYPES.LINK,
                        title: res.title,
                        hash: res.txHash,
                        explorerTxUrl: res.explorerTxUrl,
                      },
                type:
                  res.error === true
                    ? SNACKBAR_TYPES.ERROR
                    : SNACKBAR_TYPES.SUCCESS,
              })
            );
            setShow(false);
            // check if tx is executed
            if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
              dispatch(snackbarWaitingBroadcast());
              dispatch(
                await snackbarIncludedInBlock(
                  res.txHash,
                  chainIdentifier.toUpperCase(),
                  res.explorerTxUrl
                )
              );

              dispatch(
                await snackbarExecutedTx(
                  res.txHash,
                  chainIdentifier.toUpperCase()
                )
              );
            }
          }}
          text="Deposit"
        />
      </div>
    </>
  );
};

export default Deposit;
