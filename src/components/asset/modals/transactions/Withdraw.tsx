import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { executeIBC } from "../../../../internal/asset/functionality/transactions/ibcTransfer";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";
import { addSnackbar } from "../../../notification/redux/notificationSlice";
import Arrow from "../common/Arrow";
import ErrorMessage from "../common/ErrorMessage";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";

const Withdraw = ({ values }: ModalProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [addressTo, setAddressTo] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="text-darkGray3">
      <p className="text-sm max-w-[500px] pb-3 italic">
        At this time, only IBC coins can be withdrawn. Existing ERC-20 coins
        must be converted back to IBC coins before being transferable to other
        IBC chains
      </p>
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-2 ">
        <FromContainer
          token={values.token}
          address={values.address}
          amount={values.amount}
          fee={values.fee}
          decimals={values.decimals}
          feeDenom={values.feeDenom}
          img={values.imgFrom}
          value={inputValue}
          setInputValue={setInputValue}
          tokenTo={values.tokenTo}
          feeBalance={values.feeBalance}
          confirmClicked={confirmClicked}
        />
        <div className="text-xs font-bold opacity-80">
          {getReservedForFeeText(values.fee, values.feeDenom, values.network)}
        </div>
      </div>
      <Arrow />

      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={values.tokenTo} img={values.imgTo} />
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
            IMPORTANT: Transferring to an incorrect address will result in loss
            of funds.
          </h6>
          <div className="flex items-center space-x-5 w-full justify-end">
            <span className="uppercase font-bold">Autofill</span>
            <MetamaskIcon width={25} height={25} />
            <KeplrIcon width={25} height={25} />
          </div>
        </div>
      </div>

      <ConfirmButton
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
            // TODO: close modal
            return;
          }

          if (
            inputValue === undefined ||
            inputValue === null ||
            inputValue === "" ||
            addressTo === undefined ||
            addressTo === null ||
            addressTo === ""
          ) {
            // TODO: Add this validation to the input onchange

            return;
          }

          let amount = "";
          try {
            amount = parseUnits(
              inputValue,
              BigNumber.from(values.decimals)
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
            // TODO: close modal
            return;
          }
          const params: IBCChainParams = {
            sender: values.address,
            receiver: addressTo,
            amount,
            srcChain: "EVMOS",
            dstChain: values.networkTo,
            token: values.tokenTo,
          };
          const res = await executeIBC(
            wallet.evmosPubkey,
            wallet.evmosAddressCosmosFormat,
            params,
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

export default Withdraw;
