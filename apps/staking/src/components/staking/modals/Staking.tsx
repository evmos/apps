// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { ModalDelegate } from "../../../internal/staking/functionality/types";
import { SmallButton, ConfirmButton } from "ui-helpers";
import { Delegate } from "./transactions/Delegate";
import { Redelegate } from "./transactions/Redelegate";
import { Undelegate } from "./transactions/Undelegate";
import { convertAndFormat, formatPercentage } from "helpers";
import { EVMOS_DECIMALS } from "evmos-wallet";

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
        <div className="rounded-md border border-darkGray1 p-3 text-sm">
          <p>
            Once you undelegate your staked EVMOS, you will need to wait 14 days
            for your tokens to be liquid
          </p>
        </div>
      )}
      {showDelegate && (
        <div className="rounded-md border border-darkGray1 p-3 text-sm">
          <p className="font-bold text-red">
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
            ? convertAndFormat(BigNumber.from(item.balance), EVMOS_DECIMALS, 6)
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
                className="text-sm font-bold text-red"
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
            className="w-fit py-1 text-sm"
          />

          {item.balance !== "" && (
            <ConfirmButton
              text="Redelegate"
              onClick={() => {
                setShowRedelegate(true);
              }}
              className="w-fit py-1 text-sm"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Staking;
