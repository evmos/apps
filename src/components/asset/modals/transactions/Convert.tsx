import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import Tabs from "../common/Tabs";
import ToContainer from "../common/ToContainer";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { ConvertMsg } from "../../../../internal/asset/functionality/transactions/types";
import { executeConvert } from "../../../../internal/asset/functionality/transactions/convert";
import { addSnackbar } from "../../../notification/redux/notificationSlice";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { ModalTitle } from "../../../common/Modal";
import { WEVMOS_CONTRACT_ADDRESS } from "../constants";
import { WEVMOS } from "./contracts/abis/WEVMOS/WEVMOS";
import WETH_ABI from "./contracts/abis/WEVMOS/WEVMOS.json";
import { useContract } from "./contracts/useContract";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { KEPLR_NOTIFICATIONS } from "../../../../internal/wallet/functionality/errors";
import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
} from "../../../../internal/asset/functionality/transactions/errors";
import { Token } from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import AddTokenMetamask from "./AddTokenMetamask";
import ViewExplorer from "../../../common/ViewExplorer";

const Convert = ({
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

  const WEVMOS = WEVMOS_CONTRACT_ADDRESS;

  const WEVMOSContract = useContract<WEVMOS>(WEVMOS, WETH_ABI);
  const token: Token = {
    erc20Address: item.erc20Address,
    symbol: item.symbol,
    decimals: item.decimals,
    img: item.pngSrc,
  };
  return (
    <>
      <ModalTitle title={`Convert ${item.symbol}`} />
      <div className="text-darkGray3">
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
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
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
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
            setConfirmClicked(true);
            if (wallet.evmosPubkey === null) {
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
              amount.gt(typeSelected.amount)
            ) {
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
                wallet.evmosPubkey,
                wallet.evmosAddressCosmosFormat,
                params,
                isERC20Selected,
                feeBalance,
                wallet.extensionName
              );

              dispatch(
                addSnackbar({
                  id: 0,
                  text: res.title,
                  subtext:
                    res.error === true ? (
                      res.message
                    ) : (
                      <ViewExplorer
                        text={res.message}
                        txHash={res.txHash}
                        explorerTxUrl={res.explorerTxUrl}
                      />
                    ),
                  type: res.error === true ? "error" : "success",
                })
              );
            } else {
              if (isERC20Selected) {
                try {
                  const res = await WEVMOSContract.withdraw(amount);
                  dispatch(
                    addSnackbar({
                      id: 0,
                      text: BROADCASTED_NOTIFICATIONS.SuccessTitle,
                      subtext: (
                        <ViewExplorer
                          txHash={res.hash}
                          explorerTxUrl={`www.mintscan.io/evmos/txs/${res.hash}`}
                        />
                      ),
                      type: "success",
                    })
                  );
                } catch (e) {
                  // TODO: Add Sentry here!
                  dispatch(
                    addSnackbar({
                      id: 0,
                      text: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                      subtext: "",
                      type: "error",
                    })
                  );
                }
              } else {
                try {
                  const res = await WEVMOSContract.deposit({
                    value: amount,
                  });
                  dispatch(
                    addSnackbar({
                      id: 0,
                      text: BROADCASTED_NOTIFICATIONS.SuccessTitle,
                      subtext: (
                        <ViewExplorer
                          txHash={res.hash}
                          explorerTxUrl={`www.mintscan.io/evmos/txs/${res.hash}`}
                        />
                      ),
                      type: "success",
                    })
                  );
                } catch (e) {
                  // TODO: Add Sentry here!
                  dispatch(
                    addSnackbar({
                      id: 0,
                      text: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                      subtext: "",
                      type: "error",
                    })
                  );
                }
              }
            }
            setShow(false);
          }}
          text="Convert"
        />
      </div>
    </>
  );
};

export default Convert;
