import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { executeIBC } from "../../../../internal/asset/functionality/transactions/ibcTransfer";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
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

const Withdraw = ({
  item,
  feeBalance,
  address,
}: {
  item: TableDataElement;
  feeBalance: BigNumber;
  address: string;
}) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [addressTo, setAddressTo] = useState("");

  const dispatch = useDispatch();

  const fee = BigNumber.from("4600000000000000");
  const feeDenom = "EVMOS";
  return (
    <>
      <ModalTitle title={`Withdraw ${item.symbol}`} />
      <div className="text-darkGray3">
        <p className="text-sm max-w-[500px] pb-3 italic">
          At this time, only IBC coins can be withdrawn. Existing ERC-20 coins
          must be converted back to IBC coins before being transferable to other
          IBC chains
        </p>
        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-2 ">
          <FromContainer
            fee={{
              // modificar fee
              fee,
              feeDenom,
              feeBalance: feeBalance,
              feeDecimals: 18,
            }}
            balance={{
              denom: item.symbol,
              amount: item.cosmosBalance,
              decimals: item.decimals,
            }}
            input={{ value: inputValue, setInputValue, confirmClicked }}
            style={{
              tokenTo: item.symbol,
              address: address,
              img: `/tokens/evmos.png`,
              text: "EVMOS",
            }}
          />
          <div className="text-xs font-bold opacity-80">
            {getReservedForFeeText(fee, feeDenom, "EVMOS")}
          </div>
        </div>
        <Arrow />

        <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
          <ToContainer
            token={item.symbol}
            img={`/tokens/${item.symbol.toLowerCase()}.png`}
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
              <ErrorMessage text="Address can not be empty" />
            )}
            <h6 className="italic text-sm">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
            <div className="flex items-center space-x-5 w-full justify-end">
              <span className="uppercase font-bold">Autofill</span>
              <KeplrIcon
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={async () => {
                  const keplrAddress = await getKeplrAddressByChain(
                    item.chainId
                  );
                  if (keplrAddress === null) {
                    dispatch(
                      addSnackbar({
                        id: 0,
                        text: "Could not get information from Keplr",
                        subtext:
                          "Please unlock the extension and allow the app to access your wallet address",
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
              // TODO: close modal
              return;
            }
            const params: IBCChainParams = {
              sender: address,
              receiver: addressTo,
              amount,
              srcChain: "EVMOS",
              dstChain: item.chainIdentifier,
              token: item.symbol,
            };
            const res = await executeIBC(
              wallet.evmosPubkey,
              wallet.evmosAddressCosmosFormat,
              params,
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
          }}
          text="Withdraw"
        />
      </div>
    </>
  );
};

export default Withdraw;
