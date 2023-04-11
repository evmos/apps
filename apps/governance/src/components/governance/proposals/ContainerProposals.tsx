import Link from "next/link";
import { useCallback } from "react";
import { ProposalProps } from "../../../internal/governance/functionality/types";
import BannerMessages from "../../common/banners/BannerMessages";
import { GOVERNANCE_PATH } from "../common/helpers";
import ProposalCard from "./ProposalCard";

const ContainerProposals = ({
  proposals,
  loading,
  error,
}: {
  proposals: ProposalProps[];
  loading: boolean;
  error: unknown;
}) => {
  const drawProposals = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    return proposals.map((proposal) => {
      return (
        <Link
          key={proposal.id}
          href={{
            pathname: GOVERNANCE_PATH,
            query: { id: proposal.id },
          }}
        >
          <ProposalCard proposalProps={proposal} />
        </Link>
      );
    });
  }, [proposals, loading, error]);

  return (
    <section className="grid grid-cols-1 gap-4 px-4 md:px-0 lg:grid-cols-2">
      {drawProposals()}
    </section>
  );
};

export default ContainerProposals;
