import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { executeWithdraw } from "../../../../internal/asset/functionality/transactions/withdraw";
import {
  getReservedForFeeText,
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../internal/asset/style/format";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import { ModalTitle } from "../../../common/Modal";
import Arrow from "../common/Arrow";
import ErrorMessage from "../common/ErrorMessage";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import Tabs from "../common/Tabs";

import AddTokenMetamask from "./AddTokenMetamask";
import Link from "next/link";
import {
  IBCChainParams,
  getKeplrAddressByChain,
  StoreType,
  addSnackbar,
  BROADCASTED_NOTIFICATIONS,
  EXECUTED_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  WALLET_NOTIFICATIONS,
  EVMOS_SYMBOL,
  KEPLR_NOTIFICATIONS,
  Token,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
} from "evmos-wallet";
const Withdraw = ({
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
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  // the average fee on Keplr is 0.005
  const fee = BigNumber.from("5000000000000000");
  const feeDenom = EVMOS_SYMBOL;
  const [isERC20Selected, setIsERC20Selected] = useState(false);
  const [typeSelected, setTypeSelected] = useState({
    amount: item.cosmosBalance,
  });
  useEffect(() => {
    if (!isERC20Selected) {
      setTypeSelected({
        amount: item.cosmosBalance,
      });
    } else {
      setTypeSelected({
        amount: item.erc20Balance,
      });
    }
  }, [isERC20Selected, item]);

  const token: Token = {
    erc20Address: item.erc20Address,
    symbol: item.symbol,
    decimals: item.decimals,
    img: item.pngSrc,
  };
  const v10Link =
    "https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10";

  // TODO:  We'll work on this once we start with
  // single token representation
  // This function only supports OSMOSIS - EVMOS case.
  let chainId = item.chainId;
  let chainIdentifier = item.chainIdentifier;
  if (item.symbol === EVMOS_SYMBOL) {
    chainId = "osmosis-1";
    chainIdentifier = "OSMOSIS";
  }
  return (
    <>
      <ModalTitle title={`Withdraw ${item.symbol}`} />
      <div className="text-darkGray3">
        <p className="text-sm max-w-[500px] pb-3 italic">
          Since Evmos{" "}
          <Link
            className="text-red"
            href={v10Link}
            rel="noopener noreferrer"
            target="_blank"
          >
            v10
          </Link>{" "}
          you can withdraw directly your ERC20 balance without previously
          converting it to IBC.
        </p>
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-2 ">
          <FromContainer
            fee={{
              fee,
              feeDenom,
              feeBalance: feeBalance,
              feeDecimals: 18,
            }}
            balance={{
              denom: item.symbol,
              amount: typeSelected.amount,
              decimals: item.decimals,
            }}
            input={{ value: inputValue, setInputValue, confirmClicked }}
            style={{
              tokenTo: item.symbol,
              address: address,
              img: `/assets/tokens/evmos.png`,
              text: "EVMOS",
            }}
          />
          <div>
            <span className="font-bold">Select balance:</span>
            <Tabs
              cosmosBalance={item.cosmosBalance}
              decimals={item.decimals}
              erc20Balance={item.erc20Balance}
              isERC20Selected={isERC20Selected}
              setIsERC20Selected={setIsERC20Selected}
              isEvmosToken={item.symbol === EVMOS_SYMBOL}
            />
          </div>
          <div className="text-xs font-bold opacity-80">
            {getReservedForFeeText(fee, feeDenom, "EVMOS")}
          </div>
        </div>
        <Arrow />

        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
          <ToContainer
            token={item.symbol === EVMOS_SYMBOL ? "OSMO" : item.symbol}
            img={
              item.symbol === EVMOS_SYMBOL
                ? "/assets/tokens/osmo.png"
                : `/assets/tokens/${item.symbol.toLowerCase()}.png`
            }
          />
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
              <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
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
                  const keplrAddress = await getKeplrAddressByChain(
                    chainId,
                    chainIdentifier
                  );
                  if (keplrAddress === null) {
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
                    return;
                  }
                  setAddressTo(keplrAddress);
                }}
              />
            </div>
          </div>
        </div>

        <ConfirmButton
          disabled={disabled}
          onClick={async () => {
            setConfirmClicked(true);
            if (wallet.evmosPubkey === null) {
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
              amount.gt(typeSelected.amount)
            ) {
              return;
            }

            const params: IBCChainParams = {
              sender: address,
              receiver: addressTo,
              amount: amount.toString(),
              srcChain: EVMOS_SYMBOL,
              dstChain: chainIdentifier,
              token: item.symbol,
            };
            setDisabled(true);

            dispatch(
              addSnackbar({
                id: 0,
                content: {
                  type: SNACKBAR_CONTENT_TYPES.TEXT,
                  title: EXECUTED_NOTIFICATIONS.IBCTransferInformation.text,
                  text: EXECUTED_NOTIFICATIONS.IBCTransferInformation.text,
                },

                type: SNACKBAR_TYPES.DEFAULT,
              })
            );
            // create, sign and broadcast tx
            const res = await executeWithdraw(
              wallet.evmosPubkey,
              wallet.evmosAddressCosmosFormat,
              params,
              feeBalance,
              wallet.extensionName,
              item.prefix,
              isERC20Selected
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
                  EVMOS_SYMBOL,
                  res.explorerTxUrl
                )
              );
              dispatch(await snackbarExecutedTx(res.txHash, EVMOS_SYMBOL));
            }
          }}
          text="Withdraw"
        />
      </div>
    </>
  );
};

export default Withdraw;
