import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";
import DescriptionItem from "./DescriptionItem";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { ProposalDetailProps } from "../../../internal/governance/functionality/types";
import BannerMessages from "../../common/banners/BannerMessages";

const ProposalDescription = ({
  loading,
  error,
  proposalDetail,
}: {
  loading: boolean;
  error: unknown;
  proposalDetail: ProposalDetailProps;
}) => {
  if (loading) {
    return <BannerMessages text="Loading..." spinner={true} />;
  }
  if (error) {
    return <BannerMessages text="No results" />;
  }
  return (
    <div>
      <section className="space-y-5 mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white ">
        <div className="flex space-x-4 items-center ">
          <IdContainer id={proposalDetail.id} />
          <TitleContainer title={proposalDetail.title} />
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

      <section className="markdown space-y-5 mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white break-words">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {proposalDetail.description}
        </ReactMarkdown>
      </section>
    </div>
  );
};

export default ProposalDescription;
