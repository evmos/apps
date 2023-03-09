import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import {
  convertAndFormat,
  formatPercentage,
} from "../../../internal/asset/style/format";
import { ModalDelegate } from "../../../internal/staking/functionality/types";
import ConfirmButton from "../../common/ConfirmButton";
import { Delegation } from "./transactions/Delegation";

export const Staking = ({
  item,
  setShow,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showDelegate, setShowDelegate] = useState(false);
  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold">{item.moniker}</p>
        <p className="text-xs">
          Commission - {formatPercentage(item.commissionRate)}
        </p>
      </div>

      {showDelegate && (
        <div className="border rounded-md border-darkGray1 p-3 text-sm">
          <p className="text-red font-bold">
            Staking will lock up your funds for 14 days
          </p>
          <p>
            Once you undelegate your staked EVMOS, you will need to wait 14 days
            for your tokens to be liquid
          </p>
        </div>
      )}
      <div className="flex justify-between">
        <p className="font-bold">My Delegation</p>
        <p>
          {item.balance !== ""
            ? convertAndFormat(BigNumber.from(item.balance))
            : "0"}{" "}
          EVMOS
        </p>
      </div>
      {(item.details || item.website) && !showDelegate && (
        <div className="space-y-2">
          <p className="font-bold">Description</p>
          <p className="text-sm">{item.details}</p>
          <p className="text-red font-bold text-sm">{item.website}</p>
        </div>
      )}
      {showDelegate && (
        <Delegation
          item={item}
          setShow={setShow}
          setShowDelegate={setShowDelegate}
        />
      )}
      {!showDelegate && (
        <div className="flex justify-end">
          <ConfirmButton
            text="Delegate"
            onClick={() => {
              setShowDelegate(true);
            }}
            className="w-fit text-sm"
          />
        </div>
      )}
    </div>
  );
};
