// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BarContainer } from "@evmosapps/ui-helpers";
import ProposalStatus from "./ProposalStatus";
import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";
import { ProposalProps } from "../../../utils/types";

const ProposalCard = ({ proposalProps }: { proposalProps: ProposalProps }) => {
  return (
    <div className="flex h-full cursor-pointer flex-col justify-between space-y-5 rounded-2xl bg-darkGray2 p-5 transition-all duration-300 hover:bg-darkGray2Opacity">
      <div className="flex justify-between font-bold text-pearl">
        <IdContainer id={proposalProps.id} />
        <ProposalStatus status={proposalProps.status} />
      </div>
      <TitleContainer
        title={proposalProps.title}
        data-testid="proposal-card-title"
      />
      <div className="flex text-pearl">
        <div className="space-y-1 pr-5 uppercase">
          <p className="text-sm font-bold opacity-80">
            {proposalProps.votingStartTime}
          </p>
          <p className="text-xs">VOTING START</p>
        </div>
        <div className="space-y-1 border-l border-darkGray5 px-5 uppercase">
          <p className="text-sm font-bold opacity-80">
            {proposalProps.votingEndTime}
          </p>
          <p className="text-xs">VOTING END</p>
        </div>
      </div>
      <BarContainer percents={proposalProps.tallyResults} />
    </div>
  );
};

export default ProposalCard;
