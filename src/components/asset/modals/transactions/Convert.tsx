import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ConvertMsg,
  executeConvert,
} from "../../../../internal/asset/functionality/transactions/convert";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import Tabs from "../common/Tabs";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";
import { utils, BigNumber } from "ethers";

const Convert = ({ values }: ModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [selected, setSelected] = useState(false);

  return (
    <div className="text-darkGray3">
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        <FromContainer
          token={values.token}
          address={values.address}
          amount={values.amount}
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
            selected={selected}
            setSelected={setSelected}
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
          const params: ConvertMsg = {
            token: values.token,
            amount: utils
              .parseUnits(inputValue, BigNumber.from(values.decimals))
              .toString(),
            receiver: wallet.evmosAddressEthFormat,
            sender: wallet.evmosAddressCosmosFormat,
            srcChain: "EVMOS",
          };
          await executeConvert(
            wallet.evmosPubkey,
            wallet.evmosAddressCosmosFormat,
            params,
            selected,
            values.feeBalance,
            wallet.extensionName
          );
        }}
        text={values.title}
      />
    </div>
  );
};

export default Convert;
