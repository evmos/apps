// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WalletsModal } from "./header/signin/WalletsModal";

const ConnectModal = dynamic(
  async () =>
    (await import("stateful-components/src/modals/ConnectModal/ConnectModal"))
      .ConnectModal,
  {
    ssr: false,
  },
);
const SetupAccountModal = dynamic(
  () =>
    import(
      "stateful-components/src/modals/SetupAccountModal/SetupAccountModal"
    ).then((mod) => mod.SetupAccountModal),
  {
    ssr: false,
  },
);
const ProfileModal = dynamic(
  () =>
    import("stateful-components/src/modals/ProfileModal/ProfileModal").then(
      (mod) => mod.ProfileModal,
    ),
  {
    ssr: false,
  },
);
const TopupModal = dynamic(
  () =>
    import("stateful-components/src/modals/TopupModal/TopupModal").then(
      (mod) => mod.TopupModal,
    ),
  {
    ssr: false,
  },
);
const TermsOfServiceModal = dynamic(
  () =>
    import(
      "stateful-components/src/modals/TermsOfServices/TermsOfServiceModal"
    ).then((mod) => mod.TermsOfServiceModal),
  {
    ssr: false,
  },
);

const ConsentModal = dynamic(
  () =>
    import("stateful-components/src/modals/ConsentModal/ConsentModal").then(
      (mod) => mod.ConsentModal,
    ),
  {
    ssr: false,
  },
);

export const Modals = () => {
  return (
    <Suspense>
      <ConnectModal />
      <SetupAccountModal />
      <ProfileModal />
      <TopupModal />
      <TermsOfServiceModal />
      <ConsentModal />
      <WalletsModal />
    </Suspense>
  );
};
