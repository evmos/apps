import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { COMMONWEALTH_URL } from "../../internal/common/links";
import { useProposals } from "../../internal/governance/functionality/hooks/useProposals";
import {
  EVMOS_PAGE_URL,
  NAV_TO_GOVERNANCE,
  NAV_TO_MISSION_CONTROL,
} from "../common/constants";
import NavToMissionControl from "../common/navigation/NavToMissionControl";
import { GOVERNANCE_PATH } from "./common/helpers";

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
  let href = EVMOS_PAGE_URL;
  let text = NAV_TO_MISSION_CONTROL;
  if (id !== undefined) {
    href = EVMOS_PAGE_URL + GOVERNANCE_PATH;
    text = NAV_TO_GOVERNANCE;
  }

  return (
    <div>
      <NavToMissionControl href={href} text={text} />
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
