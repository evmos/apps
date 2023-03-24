import ProposalDescription from "./ProposalDescription";
import Graphic from "./Graphic";
import { useCallback } from "react";
import BannerMessages from "../../common/banners/BannerMessages";
import { ProposalDetailProps } from "../../../internal/governance/functionality/types";

const ContentProposal = ({
  proposalDetail,
  loading,
  error,
}: {
  proposalDetail: string | ProposalDetailProps;
  loading: boolean;
  error: unknown;
}) => {
  const drawContentProposal = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    if (typeof proposalDetail === "string") {
      return <BannerMessages text={proposalDetail} />;
    }
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 ">
        <section className="lg:col-span-3">
          {/* detail proposal information */}
          <ProposalDescription
            proposalDetail={proposalDetail}
            loading={loading}
            error={error}
          />
        </section>
        <Graphic data={proposalDetail} loading={loading} error={error} />
      </div>
    );
  }, [error, loading, proposalDetail]);

  return drawContentProposal();
};

export default ContentProposal;
