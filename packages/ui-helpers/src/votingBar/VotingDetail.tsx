// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type VotingDetail = {
  bgColor: string;
  type: string;
  percent: string;
};

// Not sure why this error occured so I disabled it for now
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const VotingDetail = ({
  votingProps,
}: {
  votingProps: VotingDetail;
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={`${votingProps.bgColor} h-4 w-4 rounded-lg`}></div>
      <div className="text-pearl font-bold opacity-80">
        <p>{votingProps.type}</p>
        <p>{Number(votingProps.percent).toFixed(2)}%</p>
      </div>
    </div>
  );
};
