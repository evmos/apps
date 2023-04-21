// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";
import DescriptionItem from "./DescriptionItem";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { ProposalDetailProps } from "../../../internal/governance/functionality/types";
import { BannerMessages } from "ui-helpers";

const ProposalDescription = ({
  loading,
  error,
  proposalDetail,
  userVote,
}: {
  loading: boolean;
  error: unknown;
  proposalDetail: ProposalDetailProps;
  userVote: null | JSX.Element;
}) => {
  if (loading) {
    return <BannerMessages text="Loading..." spinner={true} />;
  }
  if (error) {
    return <BannerMessages text="No results" />;
  }
  return (
    <div>
      <section className="mx-5 mb-5 space-y-5 rounded-2xl bg-darkGray2 p-5 px-5 font-[IBM] text-sm text-pearl xl:mx-0 ">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 ">
            <IdContainer id={proposalDetail.id} />
            <TitleContainer title={proposalDetail.title} />
          </div>
          {userVote !== null && userVote}
        </div>
        <div className="space-y-4">
          <DescriptionItem
            title="Total Deposit"
            description={`${proposalDetail.totalDeposit} EVMOS`}
          />
          <DescriptionItem
            title="Voting Start"
            description={proposalDetail.votingStartTime}
          />
          <DescriptionItem
            title="Voting end"
            description={proposalDetail.votingEndTime}
          />
          <DescriptionItem title="Type" description={proposalDetail.type} />
          <DescriptionItem
            title="Submit Time"
            description={proposalDetail.submitTime}
          />
          <DescriptionItem
            title="Deposit end time"
            description={proposalDetail.depositEndTime}
          />
          <DescriptionItem
            title="Quorum"
            description={`${proposalDetail.tallying.quorum} %`}
          />
          <DescriptionItem
            title="Threshold"
            description={`${proposalDetail.tallying.threshold} %`}
          />
          <DescriptionItem
            title="Veto threshold"
            description={`${proposalDetail.tallying.veto_threshold} %`}
          />
        </div>
      </section>
      {proposalDetail.description && (
        <section className="markdown mx-5 mb-5 space-y-5 break-words rounded-2xl bg-darkGray2 p-5 px-5 font-[IBM] text-sm text-pearl xl:mx-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {proposalDetail.description}
          </ReactMarkdown>
        </section>
      )}
    </div>
  );
};

export default ProposalDescription;
