import { useState } from "react";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import ConfirmButton from "../../../common/ConfirmButton";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import Tabs from "../common/Tabs";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";

const Convert = ({ values }: ModalProps) => {
  const [inputValue, setInputValue] = useState("");

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
        onClick={() => {
          // TODO: implement function
          throw "Not implemented!";
        }}
        text={values.title}
      />
    </div>
  );
};

export default Convert;
