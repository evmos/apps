"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const ConnectModal = dynamic(
  async () =>
    (await import("stateful-components/src/modals/ConnectModal/ConnectModal"))
      .ConnectModal,
  {
    ssr: false,
  }
);
export const SetupAccountModal = dynamic(
  () =>
    import(
      "stateful-components/src/modals/SetupAccountModal/SetupAccountModal"
    ).then((mod) => mod.SetupAccountModal),
  {
    ssr: false,
  }
);
export const ProfileModal = dynamic(
  () =>
    import("stateful-components/src/modals/ProfileModal/ProfileModal").then(
      (mod) => mod.ProfileModal
    ),
  {
    ssr: false,
  }
);
export const TopupModal = dynamic(
  () =>
    import("stateful-components/src/modals/TopupModal/TopupModal").then(
      (mod) => mod.TopupModal
    ),
  {
    ssr: false,
  }
);
export const TermsOfServiceModal = dynamic(
  () =>
    import(
      "stateful-components/src/modals/TermsOfServices/TermsOfServiceModal"
    ).then((mod) => mod.TermsOfServiceModal),
  {
    ssr: false,
  }
);

export const ConsentModal = dynamic(
  () =>
    import("stateful-components/src/modals/ConsentModal/ConsentModal").then(
      (mod) => mod.ConsentModal
    ),
  {
    ssr: false,
  }
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
    </Suspense>
  );
};
