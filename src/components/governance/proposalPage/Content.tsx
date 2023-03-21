import { useRouter } from "next/router";
import { useProposals } from "../../../internal/governance/functionality/hooks/useProposal";
import ProposalDescription from "./ProposalDescription";

const Content = () => {
  const router = useRouter();

  const { pid } = router.query;
  const { proposalDetail, loading, error } = useProposals(pid as string);
  return (
    <div className="mt-5 overflow-y-auto max-h-[65vh] md:max-h-[65vh] xl:scrollbar-hide text-white font-[IBM] w-full">
      {/* TODO: create component for container general of cards */}
      <ProposalDescription
        proposalDetail={proposalDetail}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Content;
