import Link from "next/link";
import {
  convertFromAtto,
  numericOnly,
} from "../../../internal/asset/style/format";
import {
  DelegationsResponse,
  rewardsResponse,
} from "../../../internal/staking/functionality/types";

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
    <table className="w-full text-left">
      <thead className="">
        <tr className="grid px-4 mb-4 grid-cols-3">
          <th className="cols-span-1">VALIDATORS</th>
          <th className="cols-span-1">STAKED</th>
          <th className="cols-span-1">PENDING REWARDS</th>
        </tr>
      </thead>
      {delegations?.splice(0, 3)?.map((d) => (
        <tr
          className="grid  p-4 border-b border-darkGray5 grid-cols-3"
          key={d.delegation.validator_address}
        >
          <th className="font-light cols-span-1">
            {d.delegation.validator.description.moniker}
          </th>
          <th className="font-light cols-span-1">
            {numericOnly(convertFromAtto(d.balance.amount))}
          </th>
          <th className="font-light cols-span-1">
            {numericOnly(
              parseFloat(
                convertFromAtto(
                  rewards?.rewards.find(
                    (r) =>
                      r.validator_address.toLowerCase() ===
                      d.delegation.validator_address.toLowerCase()
                  )?.reward[0]?.amount ?? 0
                )
              ).toFixed(2)
            )}
          </th>
        </tr>
      ))}
    </table>
  ) : (
    <EmptyDelegations />
  );
};

export default StakingTable;
