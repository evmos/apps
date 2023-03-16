import { useCallback } from "react";
import { useProposals } from "../../../internal/governance/functionality/hooks/useProposals";
import ProposalCard from "./ProposalCard";

const ContainerProposals = () => {
  const { proposals } = useProposals();
  const drawProposals = useCallback(() => {
    return proposals.map((proposal) => {
      return <ProposalCard proposalProps={proposal} key={proposal.id} />;
    });
  }, [proposals]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-0">
      {drawProposals()}
    </section>
  );
};

export default ContainerProposals;
