// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservedForFeeText } from "helpers";
import { ConfirmButton, Modal } from "@evmosapps/ui-helpers";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import Tabs from "../common/Tabs";
import ToContainer from "../common/ToContainer";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { executeConvert } from "../../../utils/transactions/convert";
import { TableDataElement } from "../../../utils/table/normalizeData";
import { WEVMOS_CONTRACT_ADDRESS } from "../constants";
import WETH_ABI from "./contracts/abis/WEVMOS/WEVMOS.json";

import AddTokenMetamask from "./AddTokenMetamask";

import {
  StoreType,
  ConvertMsg,
  addSnackbar,
  EVMOS_SYMBOL,
  KEPLR_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  WALLET_NOTIFICATIONS,
  Token,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
} from "@evmosapps/evmos-wallet";
import {
  SUCCESSFUL_CONVERT_TX,
  UNSUCCESSFUL_CONVERT_TX,
  sendEvent,
} from "tracker";
import { getChainId, switchChain, writeContract } from "wagmi/actions";
import { EXPLORER_URL } from "constants-helper";

import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { useConfig } from "wagmi";

const evmos = getEvmosChainInfo();

const Convert = ({
  item,
  feeBalance,
  address,
  setIsOpen,
}: {
  item: TableDataElement;
  feeBalance: BigNumber;
  address: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [isERC20Selected, setIsERC20Selected] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [confirmClicked, setConfirmClicked] = useState(false);

  const [typeSelected, setTypeSelected] = useState({
    amount: item.cosmosBalance,
    from: "IBC Coin",
    to: "ERC-20",
    token: EVMOS_SYMBOL,
  });

  useEffect(() => {
    if (!isERC20Selected) {
      setTypeSelected({
        amount: item.cosmosBalance,
        from: "IBC Coin",
        to: "ERC-20",
        token: EVMOS_SYMBOL,
      });
    } else {
      setTypeSelected({
        amount: item.erc20Balance,
        from: "ERC-20",
        to: "IBC Coin",
        token: "WEVMOS",
      });
    }
  }, [isERC20Selected, item]);

  const token: Token = {
    erc20Address: item.erc20Address,
    symbol: item.symbol,
    decimals: item.decimals,
    img: item.pngSrc,
  };
  const config = useConfig();
  return (
    <>
      <Modal.Header>
        <h2 className="font-bold mb-4">{`Convert ${item.symbol}`}</h2>
      </Modal.Header>

      <div className="text-darkGray3">
        <div className="space-y-3 rounded-lg bg-skinTan px-8 py-4 ">
          <FromContainer
            fee={{
              fee: BigNumber.from("300000000000000000"),
              feeDenom: EVMOS_SYMBOL,
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
              tokenTo:
                item.symbol === EVMOS_SYMBOL ? typeSelected.token : item.symbol,
              address,
              img: `/tokens/${item.symbol.toLowerCase()}.png`,
              text: typeSelected.from,
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
            />
          </div>
          <div className="text-xs font-bold opacity-80">
            {getReservedForFeeText(
              BigNumber.from("300000000000000000"),
              EVMOS_SYMBOL,
              EVMOS_SYMBOL
            )}
          </div>
        </div>
        <Arrow />
        <div className="mb-8 space-y-5 rounded-lg bg-skinTan px-8 py-4">
          <ToContainer
            token={item.symbol}
            img={`/tokens/${item.symbol.toLowerCase()}.png`}
            text={typeSelected.to}
          />
          <AddTokenMetamask token={token} />
        </div>
        <ConfirmButton
          disabled={disabled}
          onClick={async () => {
            if (getChainId(config) !== evmos.id) {
              const [err] = await E.try(() =>
                switchChain(config, {
                  chainId: evmos.id,
                })
              );
              if (err) return;
            }

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
              setIsOpen(false);
              return;
            }

            if (
              inputValue === undefined ||
              inputValue === null ||
              inputValue === "" ||
              Number(inputValue) === 0
            ) {
              return;
            }
            const amount = parseUnits(
              inputValue,
              BigNumber.from(item.decimals)
            );
            if (amount.gt(typeSelected.amount)) {
              return;
            }

            if (item.symbol !== EVMOS_SYMBOL) {
              const params: ConvertMsg = {
                token: item.symbol,
                amount: amount.toString(),
                addressEth: wallet.evmosAddressEthFormat,
                addressCosmos: wallet.evmosAddressCosmosFormat,
                srcChain: EVMOS_SYMBOL,
              };
              setDisabled(true);
              const res = await executeConvert(
                wallet,
                params,
                isERC20Selected,
                feeBalance
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

              if (res.error) {
                sendEvent(UNSUCCESSFUL_CONVERT_TX, {
                  "User Wallet Address": wallet?.evmosAddressEthFormat,
                  "Wallet Provider": wallet?.extensionName,
                  "Error Message": res.message,
                });
              } else {
                sendEvent(SUCCESSFUL_CONVERT_TX, {
                  "User Wallet Address": wallet?.evmosAddressEthFormat,
                  "Wallet Provider": wallet?.extensionName,
                });
              }
            } else {
              if (isERC20Selected) {
                try {
                  setDisabled(true);
                  const hash = await writeContract(config, {
                    address: WEVMOS_CONTRACT_ADDRESS,
                    abi: WETH_ABI,
                    functionName: "withdraw",
                    value: amount.toBigInt(),
                  });

                  dispatch(
                    addSnackbar({
                      id: 0,
                      content: {
                        type: SNACKBAR_CONTENT_TYPES.LINK,
                        title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
                        hash: hash,
                        explorerTxUrl: `${EXPLORER_URL}/tx`,
                      },
                      type: SNACKBAR_TYPES.SUCCESS,
                    })
                  );
                } catch (e) {
                  dispatch(
                    addSnackbar({
                      id: 0,
                      content: {
                        type: SNACKBAR_CONTENT_TYPES.TEXT,
                        title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                      },
                      type: SNACKBAR_TYPES.ERROR,
                    })
                  );
                }
              } else {
                try {
                  setDisabled(true);
                  const hash = await writeContract(config, {
                    address: WEVMOS_CONTRACT_ADDRESS,
                    abi: WETH_ABI,
                    functionName: "deposit",
                    value: amount.toBigInt(),
                  });
                  dispatch(
                    addSnackbar({
                      id: 0,
                      content: {
                        type: SNACKBAR_CONTENT_TYPES.LINK,
                        title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
                        hash,
                        explorerTxUrl: `${EXPLORER_URL}/tx`,
                      },
                      type: SNACKBAR_TYPES.SUCCESS,
                    })
                  );
                } catch (e) {
                  dispatch(
                    addSnackbar({
                      id: 0,
                      content: {
                        type: SNACKBAR_CONTENT_TYPES.TEXT,
                        title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                      },
                      type: SNACKBAR_TYPES.ERROR,
                    })
                  );
                }
              }
            }
            setIsOpen(false);
          }}
          text="Convert"
        />
      </div>
    </>
  );
};

export default Convert;
