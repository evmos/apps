import { useRouter } from "next/router";
import { useProposals } from "../../../internal/governance/functionality/hooks/useProposal";
import Graphic from "./Graphic";

const Content = () => {
  const router = useRouter();

  const { pid } = router.query;
  const { proposalDetail, loading, error } = useProposals(pid as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 ">
      <section className="lg:col-span-3">
        {/* detail proposal information */}
      </section>
      <Graphic data={proposalDetail} loading={loading} error={error} />
    </div>
  );
};

export default Content;
