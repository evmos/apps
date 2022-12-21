import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import Tabs from "../common/Tabs";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";
import { utils, BigNumber } from "ethers";
import { ConvertMsg } from "../../../../internal/asset/functionality/transactions/types";
import { executeConvert } from "../../../../internal/asset/functionality/transactions/convert";
import { addSnackbar } from "../../../notification/redux/notificationSlice";

const Convert = ({ values }: ModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [selectedERC20, setSelectedERC20] = useState(false);

  const [convertClicked, setConvertClicked] = useState(false);

  const [amountMax, setAmountMax] = useState(BigNumber.from("0"));
  useEffect(() => {
    if (!selectedERC20) {
      setAmountMax(values.amount);
    } else {
      setAmountMax(values.erc20Balance);
    }
  }, [selectedERC20, values]);

  return (
    <div className="text-darkGray3">
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        {/* TODO:style this error */}
        {convertClicked && inputValue === "" && <span>Error</span>}
        <FromContainer
          token={values.token}
          address={values.address}
          amount={amountMax}
          img={values.imgFrom}
          text="IBC Coin"
          fee={values.fee}
          feeDenom={values.feeDenom}
          decimals={values.decimals}
          value={inputValue}
          setInputValue={setInputValue}
        />
        <div>
          <span className="font-bold">Select balance:</span>
          <Tabs
            cosmosBalance={values.amount}
            decimals={values.decimals}
            erc20Balance={values.erc20Balance}
            selectedERC20={selectedERC20}
            setSelectedERC20={setSelectedERC20}
          />
        </div>
        <div className="text-xs font-bold opacity-80">
          {getReservedForFeeText(values.fee, values.feeDenom, values.network)}
        </div>
      </div>
      <Arrow />
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={values.token} img={values.imgTo} text="ERC-20" />
      </div>
      <ConfirmButton
        onClick={async () => {
          setConvertClicked(true);
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
            // TODO: close modal
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
            amount = utils
              .parseUnits(inputValue, BigNumber.from(values.decimals))
              .toString();
          } catch (e) {
            dispatch(
              addSnackbar({
                id: 0,
                text: "Wrong params",
                subtext: "Amount can only be a positive number",
                type: "error",
              })
            );
            // TODO: close modal
            return;
          }
          const params: ConvertMsg = {
            token: values.token,
            amount,
            addressEth: wallet.evmosAddressEthFormat,
            addressCosmos: wallet.evmosAddressCosmosFormat,
            srcChain: "EVMOS",
          };
          const res = await executeConvert(
            wallet.evmosPubkey,
            wallet.evmosAddressCosmosFormat,
            params,
            selectedERC20,
            values.feeBalance,
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
        }}
        text={values.title}
      />
    </div>
  );
};

export default Convert;
