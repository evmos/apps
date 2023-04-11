import Link from "next/link";

import {
  convertFromAtto,
  formatNumber,
} from "../../../internal/common/helpers/style";
import { DelegationsResponse, rewardsResponse } from "../../../internal/types";

const EmptyDelegations = () => {
  return (
    <div className="text-center">
      You currently do not have any staked Evmos.
      <br />
      You may{" "}
      <Link className="text-red" href="/staking">
        view validators
      </Link>{" "}
      or see the{" "}
      <Link
        className="text-red"
        target="_blank"
        rel="noreferrer"
        href="https://www.notion.so/Staking-Guides-689ba0acb01a4e01be30c4cf144da81f"
        aria-label="discord telegram"
      >
        staking guide
      </Link>
      .
    </div>
  );
};

const StakingTable = ({
  delegations,
  rewards,
}: {
  delegations: DelegationsResponse[];
  rewards: rewardsResponse | undefined;
}) => {
  return delegations?.length > 0 ? (
    <table className="w-full text-left text-pearl">
      <thead className="">
        <tr className="mb-4 grid grid-cols-3 px-4 ">
          <th className="cols-span-1">VALIDATORS</th>
          <th className="cols-span-1">STAKED</th>
          <th className="cols-span-1">PENDING REWARDS</th>
        </tr>
      </thead>
      <tbody>
        {delegations?.slice(0, 3)?.map((d) => (
          <tr
            className="grid  grid-cols-3 border-b border-darkGray5 p-4"
            key={d.delegation.validator_address}
          >
            <td className="cols-span-1 font-light">
              {d.delegation.validator.description.moniker}
            </td>
            <td className="cols-span-1 font-light">
              {formatNumber(convertFromAtto(d.balance.amount))} EVMOS
            </td>
            <td className="cols-span-1 font-light">
              {formatNumber(
                parseFloat(
                  convertFromAtto(
                    rewards?.rewards.find(
                      (r) =>
                        r.validator_address.toLowerCase() ===
                        d.delegation.validator_address.toLowerCase()
                    )?.reward[0]?.amount ?? 0
                  )
                )
              )}{" "}
              EVMOS
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <EmptyDelegations />
  );
};

export default StakingTable;
