import { useRouter } from "next/router";
import { useProposals } from "../../../internal/governance/functionality/hooks/useProposals";
import ProposalDescription from "./ProposalDescription";
import Graphic from "./Graphic";

const Content = () => {
  const router = useRouter();

  const { pid } = router.query;
  const { proposalDetail, loading, error } = useProposals(pid as string);

  return (
    // TODO: create component for container general of cards
    <div className="mt-5 overflow-y-auto max-h-[65vh] md:max-h-[65vh] xl:scrollbar-hide text-white font-[IBM] w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        <section className="lg:col-span-3">
          <ProposalDescription
            proposalDetail={proposalDetail}
            loading={loading}
            error={error}
          />
          {/* detail proposal information */}
        </section>
        <Graphic data={proposalDetail} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Content;
