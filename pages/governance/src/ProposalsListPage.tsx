// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { COMMONWEALTH_URL } from "@evmosapps/constants";
import BannerBlack from "./components/common/banners/BannerBlack";

import { Suspense } from "react";

import { BannerMessages } from "@evmosapps/ui-helpers";

import { ErrorBoundary } from "react-error-boundary";

import dynamic from "next/dynamic";
const ContainerProposals = dynamic(
  () =>
    import("./components/governance/proposals/ContainerProposals").then(
      (mod) => mod.ContainerProposals,
    ),
  { ssr: false },
);
export const ProposalsListPage = () => {
  return (
    <div>
      <BannerBlack
        text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
        href={COMMONWEALTH_URL}
      />

      <div className="mt-5 w-full text-pearl">
        <ErrorBoundary
          fallbackRender={() => {
            return <BannerMessages text={"No results"} />;
          }}
        >
          <Suspense
            fallback={<BannerMessages text="Loading..." spinner={true} />}
          >
            <ContainerProposals />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
