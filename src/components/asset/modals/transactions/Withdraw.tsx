import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { executeWithdraw } from "../../../../internal/asset/functionality/transactions/withdraw";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import {
  getReservedForFeeText,
  snackbarExecutedTx,
  snackbarWaitingBroadcast,
} from "../../../../internal/asset/style/format";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import { ModalTitle } from "../../../common/Modal";
import { addSnackbar } from "../../../notification/redux/notificationSlice";
import Arrow from "../common/Arrow";
import ErrorMessage from "../common/ErrorMessage";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import {
  BROADCASTED_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
} from "../../../../internal/asset/functionality/transactions/errors";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import Tabs from "../common/Tabs";
import { KEPLR_NOTIFICATIONS } from "../../../../internal/wallet/functionality/errors";
import { Token } from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import AddTokenMetamask from "./AddTokenMetamask";
import { PAGE_URL } from "../../../constants";

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

  const fee = BigNumber.from("4600000000000000");
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
  return (
    <>
      <ModalTitle title={`Withdraw ${item.symbol}`} />
      <div className="text-darkGray3">
        <p className="text-sm max-w-[500px] pb-3 italic">
          Since Evmos v10 you can withdraw directly your ERC20 balance without
          previously converting it to IBC.
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
              img: `${PAGE_URL}/tokens/evmos.png`,
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
            />
          </div>
          <div className="text-xs font-bold opacity-80">
            {getReservedForFeeText(fee, feeDenom, "EVMOS")}
          </div>
        </div>
        <Arrow />

        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
          <ToContainer
            token={item.symbol}
            img={`${PAGE_URL}/tokens/${item.symbol.toLowerCase()}.png`}
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
                  const keplrAddress = await getKeplrAddressByChain(
                    item.chainId,
                    item.chainIdentifier
                  );
                  if (keplrAddress === null) {
                    dispatch(
                      addSnackbar({
                        id: 0,
                        text: KEPLR_NOTIFICATIONS.ErrorTitle,
                        subtext: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
                        type: "error",
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
              amount.gt(typeSelected.amount)
            ) {
              return;
            }

            const params: IBCChainParams = {
              sender: address,
              receiver: addressTo,
              amount: amount.toString(),
              srcChain: EVMOS_SYMBOL,
              dstChain: item.chainIdentifier,
              token: item.symbol,
            };
            setDisabled(true);
            const res = await executeWithdraw(
              wallet.evmosPubkey,
              wallet.evmosAddressCosmosFormat,
              params,
              feeBalance,
              wallet.extensionName,
              isERC20Selected,
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
              dispatch(await snackbarExecutedTx(res.txHash, EVMOS_SYMBOL));
            }

            setShow(false);
          }}
          text="Withdraw"
        />
      </div>
    </>
  );
};

export default Withdraw;
