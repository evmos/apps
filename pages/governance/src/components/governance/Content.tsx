// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import { COMMONWEALTH_URL } from "constants-helper";
import { useProposals } from "../../utils/hooks/useProposals";
const BannerBlack = dynamic(() => import("../common/banners/BannerBlack"));
const ContainerProposals = dynamic(
  () => import("./proposals/ContainerProposals"),
);
const ContentProposal = dynamic(() => import("./proposalPage/ContentProposal"));

const Content = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const { proposals, loading, error, proposalDetail } = useProposals(
    id ?? undefined,
  );
  return (
    <div>
      {(id === null || id === undefined) && (
        <BannerBlack
          text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
          href={COMMONWEALTH_URL}
        />
      )}

      <div className="mt-5 w-full text-pearl">
        {!id && (
          <ContainerProposals
            proposals={proposals}
            loading={loading}
            error={error}
          />
        )}
        {id && (
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
