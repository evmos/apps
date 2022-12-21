import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { executeIBC } from "../../../../internal/asset/functionality/transactions/ibcTransfer";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";

const Withdraw = ({ values }: ModalProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const [inputValue, setInputValue] = useState("");
  const [addressTo, setAddressTo] = useState("");
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
          <span className="italic text-sm">
            IMPORTANT: Transferring to an incorrect address will result in loss
            of funds.
          </span>
          <div className="flex items-center space-x-5 w-full justify-end">
            <span className="uppercase font-bold">Autofill</span>
            <MetamaskIcon width={25} height={25} />
            <KeplrIcon width={25} height={25} />
          </div>
        </div>
      </div>

      <ConfirmButton
        text={values.title}
        onClick={async () => {
          const params: IBCChainParams = {
            sender: values.address,
            receiver: addressTo,
            amount: utils
              .parseUnits(inputValue, BigNumber.from(values.decimals))
              .toString(),
            srcChain: "EVMOS",
            dstChain: values.networkTo,
            token: values.tokenTo,
          };
          if (wallet.evmosPubkey !== null) {
            // TODO: show message that evmosPubkey is null
            await executeIBC(
              wallet.evmosPubkey,
              wallet.evmosAddressCosmosFormat,
              wallet.extensionName,
              params
            );
          }
        }}
      />
    </div>
  );
};

export default Withdraw;
