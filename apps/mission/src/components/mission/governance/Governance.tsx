import Link from "next/link";
import { useCallback } from "react";
import { useProposals } from "../../../internal/functionality/hooks/useProposals";
import { BannerMessages } from "ui-helpers";
import MissionContainer from "../MissionContainer";
import Header from "./Header";
import ProposalCard from "./ProposalCard";

const Governance = () => {
  const { proposals, loading, error } = useProposals("");

  const drawProposals = useCallback(() => {
    if (loading) {
      return <BannerMessages text="Loading..." spinner={true} />;
    }
    if (error) {
      return <BannerMessages text="No results" />;
    }
    return proposals.slice(0, 3).map((p) => (
      <Link
        key={p.id}
        href={{
          pathname: "/governance",
          query: { id: p.id },
        }}
      >
        <ProposalCard proposalProps={p} key={p.id} />
      </Link>
    ));
  }, [proposals, loading, error]);

  return (
    <MissionContainer>
      <>
        <Header />
        {drawProposals()}
      </>
    </MissionContainer>
  );
};

export default Governance;
