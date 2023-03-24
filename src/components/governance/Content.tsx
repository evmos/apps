import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { COMMONWEALTH_URL } from "../../internal/common/links";
import { useProposals } from "../../internal/governance/functionality/hooks/useProposals";
import NavToMissionControl from "../common/navigation/NavToMissionControl";

const BannerBlack = dynamic(() => import("../common/banners/BannerBlack"));
const ContainerProposals = dynamic(
  () => import("./proposals/ContainerProposals")
);
const ContentProposal = dynamic(() => import("./proposalPage/ContentProposal"));

const Content = () => {
  const router = useRouter();
  const { id } = router.query;

  const { proposals, loading, error, proposalDetail } = useProposals(
    id !== undefined ? (id as string) : ""
  );

  return (
    <div>
      <NavToMissionControl />
      {id === undefined && (
        <BannerBlack
          text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
          href={COMMONWEALTH_URL}
        />
      )}

      <div className="mt-5  text-white font-[IBM] w-full">
        {id === undefined ? (
          <ContainerProposals
            proposals={proposals}
            loading={loading}
            error={error}
          />
        ) : (
          <ContentProposal
            proposalDetail={proposalDetail}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
