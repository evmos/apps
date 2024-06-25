// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { DeleteProfileModal } from "./header/signin/ModalDeleteProfile";

const SetupAccountModal = dynamic(
  () =>
    import(
      "stateful-components/src/modals/SetupAccountModal/SetupAccountModal"
    ).then((mod) => mod.SetupAccountModal),
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

const EditModal = dynamic(
  () => import("./header/edit/ModalEdit").then((mod) => mod.EditModal),
  {
    ssr: false,
  },
);

const WalletsModal = dynamic(
  () => import("./header/signin/WalletsModal").then((mod) => mod.WalletsModal),
  {
    ssr: false,
  },
);

export const Modals = () => {
  return (
    <Suspense>
      <SetupAccountModal />
      <TopupModal />
      <TermsOfServiceModal />
      <ConsentModal />
      <WalletsModal />
      <EditModal />
      <DeleteProfileModal />
    </Suspense>
  );
};
