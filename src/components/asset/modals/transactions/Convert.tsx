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
    token: "EVMOS",
  });

  useEffect(() => {
    if (!isERC20Selected) {
      setTypeSelected({
        amount: item.cosmosBalance,
        from: "IBC Coin",
        to: "ERC-20",
        token: "EVMOS",
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

  return (
    <>
      <ModalTitle title={`Convert ${item.symbol}`} />
      <div className="text-darkGray3">
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
          <FromContainer
            fee={{
              fee: BigNumber.from("300000000000000000"),
              feeDenom: "EVMOS",
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
                item.symbol === "EVMOS" ? typeSelected.token : item.symbol,
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
              "EVMOS",
              "EVMOS"
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
                  subtext:
                    "Can not create a transaction without a wallet connected!",
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
              // TODO: Add this validation to the input onchange

              return;
            }

            let amount = "";
            try {
              amount = parseUnits(
                inputValue,
                BigNumber.from(item.decimals)
              ).toString();
            } catch (e) {
              dispatch(
                addSnackbar({
                  id: 0,
                  text: "Wrong params",
                  subtext: "Amount can only be a positive number",
                  type: "error",
                })
              );
              // TODO: 0.0000001 too many decimals, now appears the positive number error
              setShow(false);
              return;
            }
            if (item.symbol !== "EVMOS") {
              const params: ConvertMsg = {
                token: item.symbol,
                amount,
                addressEth: wallet.evmosAddressEthFormat,
                addressCosmos: wallet.evmosAddressCosmosFormat,
                srcChain: "EVMOS",
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
                  subtext: res.message,
                  type: res.error === true ? "error" : "success",
                })
              );
            } else {
              if (isERC20Selected) {
                await WEVMOSContract.withdraw(amount);
                // TODO: add snackbar
              } else {
                await WEVMOSContract.deposit({
                  value: amount,
                });
                // TODO: add snackbar
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
