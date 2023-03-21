import { useRouter } from "next/router";
import { useCallback } from "react";
import { useProposals } from "../../../internal/governance/functionality/hooks/useProposals";
import ProposalCard from "./ProposalCard";

const ContainerProposals = () => {
  const { proposals, loading, error } = useProposals();
  const router = useRouter();

  const drawProposals = useCallback(() => {
    if (loading) {
      return (
        <div className="md:col-span-2 justify-center mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white flex text-center items-center space-x-2">
          <span className="loader"></span>
          <p className="font-bold">Loading...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="md:col-span-2 justify-center mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white flex text-center items-center">
          <p className="font-bold">No results</p>
        </div>
      );
    }
    return proposals.map((proposal) => {
      return (
        <ProposalCard
          proposalProps={proposal}
          key={proposal.id}
          onClick={() => router.push("/governance" + `/${proposal.id}`)}
        />
      );
    });
  }, [proposals, loading, error, router]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 md:px-0">
      {drawProposals()}
    </section>
  );
};

export default ContainerProposals;
