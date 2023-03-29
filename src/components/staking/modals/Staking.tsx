import { BigNumber } from "ethers";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import {
  convertAndFormat,
  formatPercentage,
} from "../../../internal/asset/style/format";
import { ModalDelegate } from "../../../internal/staking/functionality/types";
import ConfirmButton from "../../common/ConfirmButton";
import SmallButton from "../../common/SmallButton";
import { Delegate } from "./transactions/Delegate";
import { Redelegate } from "./transactions/Redelegate";
import { Undelegate } from "./transactions/Undelegate";

const Staking = ({
  item,
  setShow,
}: {
  item: ModalDelegate;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showDelegate, setShowDelegate] = useState(false);
  const [showRedelegate, setShowRedelegate] = useState(false);
  const [showUndelegate, setShowUndelegate] = useState(false);
  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold">{item.moniker}</p>
        <p className="text-xs">
          Commission - {formatPercentage(item.commissionRate)}
        </p>
      </div>
      {showRedelegate && (
        <div className="border rounded-md border-darkGray1 p-3 text-sm">
          <p>
            Once you undelegate your staked EVMOS, you will need to wait 14 days
            for your tokens to be liquid
          </p>
        </div>
      )}
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
        {showUndelegate ? (
          <p className="font-bold">Available for Undelegation</p>
        ) : (
          <p className="font-bold">My Delegation</p>
        )}
        <p>
          {item.balance !== ""
            ? convertAndFormat(BigNumber.from(item.balance))
            : "0"}{" "}
          EVMOS
        </p>
      </div>
      {(item.details || item.website) &&
        !showDelegate &&
        !showRedelegate &&
        !showUndelegate && (
          <div className="space-y-2">
            <p className="font-bold">Description</p>
            <p className="text-sm">{item.details}</p>
            {item.website && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={item.website}
                className="text-red font-bold text-sm"
              >
                {item.website}
              </Link>
            )}
          </div>
        )}
      {showDelegate && (
        <Delegate
          item={item}
          setShow={setShow}
          setShowDelegate={setShowDelegate}
        />
      )}

      {showRedelegate && (
        <Redelegate
          item={item}
          setShow={setShow}
          setShowRedelegate={setShowRedelegate}
        />
      )}
      {showUndelegate && (
        <Undelegate
          item={item}
          setShow={setShow}
          setShowUndelegate={setShowUndelegate}
        />
      )}
      {!showDelegate && !showRedelegate && !showUndelegate && (
        <div className="flex justify-end space-x-3">
          <SmallButton
            text="UNDELEGATE"
            onClick={() => {
              setShowUndelegate(true);
            }}
            className="w-fit text-xs"
          />
          <ConfirmButton
            text="Delegate"
            onClick={() => {
              setShowDelegate(true);
            }}
            className="w-fit text-[0.75rem] py-1"
          />

          {item.balance !== "" && (
            <ConfirmButton
              text="Redelegate"
              onClick={() => {
                setShowRedelegate(true);
              }}
              className="w-fit text-[0.75rem] py-1"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Staking;
