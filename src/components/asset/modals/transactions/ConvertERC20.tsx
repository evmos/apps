import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
} from "../../../../internal/asset/functionality/transactions/errors";
import { KEPLR_NOTIFICATIONS } from "../../../../internal/wallet/functionality/errors";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import { ModalTitle } from "../../../common/Modal";
import { SimpleSnackbar } from "../../../notification/content/SimpleSnackbar";
import { ViewExplorerSnackbar } from "../../../notification/content/ViexExplorerSnackbar";
import { addSnackbar } from "../../../notification/redux/notificationSlice";
import Arrow from "../common/Arrow";
import { ContainerModal } from "../common/ContainerModal";
import FromContainer2 from "../common/FromContainer2";
import ToContainer2 from "../common/ToContainer2";
import { WEVMOS_CONTRACT_ADDRESS } from "../constants";
import AddTokenMetamask from "./AddTokenMetamask";
import { WEVMOS } from "./contracts/abis/WEVMOS/WEVMOS";
import WETH_ABI from "./contracts/abis/WEVMOS/WEVMOS.json";
import { createContract } from "./contracts/contractHelper";
import { Token } from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";

export const ConvertERC20 = ({
  item,
  address,
  setShow,
  isIBCBalance = false,
}: {
  item: TableDataElement;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  isIBCBalance?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const dispatch = useDispatch();
  const WEVMOS = WEVMOS_CONTRACT_ADDRESS;
  let balanceFrom = item.erc20Balance;
  let balanceTo = item.cosmosBalance;
  let symbolFrom = "WEVMOS";
  let symbolTo = "EVMOS";
  if (isIBCBalance) {
    balanceFrom = item.cosmosBalance;
    balanceTo = item.erc20Balance;
    symbolFrom = "EVMOS";
    symbolTo = "WEVMOS";
  }
  const token: Token = {
    erc20Address: item.erc20Address,
    symbol: item.symbol,
    decimals: item.decimals,
    img: item.pngSrc,
  };
  return (
    <>
      <ModalTitle title="Convert WEVMOS" />
      <ContainerModal>
        <FromContainer2
          balance={{
            denom: symbolFrom,
            amount: balanceFrom,
            decimals: item.decimals,
          }}
          input={{ value: inputValue, setInputValue, confirmClicked }}
          style={{
            tokenTo: symbolFrom,
            address,
            img: `/tokens/${symbolFrom.toLowerCase()}.png`,
            text: symbolFrom,
          }}
        />
      </ContainerModal>
      <Arrow />
      <ContainerModal>
        <>
          <ToContainer2
            token={symbolTo}
            img={`/tokens/${symbolTo.toLowerCase()}.png`}
            balance={balanceTo}
            decimals={item.decimals}
          />
          <AddTokenMetamask token={token} />
        </>
      </ContainerModal>
      <div className="mb-4"></div>
      <ConfirmButton
        disabled={disabled}
        onClick={async () => {
          setConfirmClicked(true);
          if (wallet.evmosPubkey === null) {
            dispatch(
              addSnackbar({
                id: 0,
                content: (
                  <SimpleSnackbar
                    title="Wallet not connected"
                    text={KEPLR_NOTIFICATIONS.RequestRejectedSubtext}
                  />
                ),
                type: "error",
              })
            );
            setShow(false);
            return;
          }
          if (
            inputValue === undefined ||
            inputValue === null ||
            inputValue === ""
          ) {
            return;
          }
          const amount = parseUnits(inputValue, BigNumber.from(item.decimals));
          if (amount.gt(balanceFrom)) {
            return;
          }
          if (isIBCBalance) {
            try {
              const contract = await createContract(
                WEVMOS,
                WETH_ABI,
                wallet.extensionName
              );
              if (contract === null) {
                dispatch(
                  addSnackbar({
                    id: 0,
                    content: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                    type: "error",
                  })
                );
                setShow(false);
                return;
              }
              setDisabled(true);
              const res = await (contract as WEVMOS).deposit({
                value: amount,
              });
              dispatch(
                addSnackbar({
                  id: 0,
                  content: (
                    <ViewExplorerSnackbar
                      values={{
                        title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
                        hash: res.hash,
                        explorerTxUrl: "www.mintscan.io/evmos/txs/",
                      }}
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
                  content: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                  type: "error",
                })
              );
            }
          } else {
            try {
              const contract = await createContract(
                WEVMOS,
                WETH_ABI,
                wallet.extensionName
              );
              if (contract === null) {
                dispatch(
                  addSnackbar({
                    id: 0,
                    content: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                    type: "error",
                  })
                );
                setShow(false);
                return;
              }
              setDisabled(true);
              const res = await (contract as WEVMOS).withdraw(amount);
              dispatch(
                addSnackbar({
                  id: 0,
                  content: (
                    <ViewExplorerSnackbar
                      values={{
                        title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
                        hash: res.hash,
                        explorerTxUrl: "www.mintscan.io/evmos/txs/",
                      }}
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
                  content: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
                  type: "error",
                })
              );
            }
          }
          setShow(false);
        }}
        text="Convert"
      />
    </>
  );
};
