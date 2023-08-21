// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProposals } from "../../internal/governance/functionality/hooks/useProposals";
import { COMMONWEALTH_URL } from "constants-helper";
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
