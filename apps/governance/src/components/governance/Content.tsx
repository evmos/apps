// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useProposals } from "../../internal/governance/functionality/hooks/useProposals";
import {
  NAV_TO_MISSION_CONTROL,
  EVMOS_PAGE_URL,
  NAV_TO_GOVERNANCE,
  COMMONWEALTH_URL,
} from "constants-helper";
import { Navigation } from "ui-helpers";
import { CLICK_BACK_TO_MC } from "tracker";
import { useTracker } from "tracker";

const BannerBlack = dynamic(() => import("../common/banners/BannerBlack"));
const ContainerProposals = dynamic(
  () => import("./proposals/ContainerProposals")
);
const ContentProposal = dynamic(() => import("./proposalPage/ContentProposal"));

const Content = () => {
  const router = useRouter();
  const { id } = router.query;
  // const id = undefined;
  const { proposals, loading, error, proposalDetail } = useProposals(
    id !== undefined ? (id as string) : ""
  );

  const { handlePreClickAction } = useTracker(CLICK_BACK_TO_MC);

  const drawNavigation = useCallback(() => {
    let href = EVMOS_PAGE_URL;
    let text = NAV_TO_MISSION_CONTROL;
    if (id !== undefined) {
      href = "/";
      text = NAV_TO_GOVERNANCE;
    }
    return (
      <Navigation
        href={href}
        text={text}
        onClick={() => {
          handlePreClickAction();
        }}
      />
    );
  }, [id, handlePreClickAction]);

  return (
    <div>
      {drawNavigation()}
      {id === undefined && (
        <BannerBlack
          text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
          href={COMMONWEALTH_URL}
        />
      )}

      <div className="mt-5  w-full font-[IBM] text-pearl">
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
