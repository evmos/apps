// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

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

const SignInModal = dynamic(
  () => import("./header/signin/Signin/Modal").then((mod) => mod.SignInModal),
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

const ManageProfileModal = dynamic(
  () =>
    import("./header/signin/ManageProfileModal").then(
      (mod) => mod.ManageProfileModal,
    ),
  {
    ssr: false,
  },
);

const DeleteProfileModal = dynamic(
  () =>
    import("./header/signin/ModalDeleteProfile").then(
      (mod) => mod.DeleteProfileModal,
    ),
  {
    ssr: false,
  },
);

const ReConnectModal = dynamic(
  () =>
    import("./header/signin/ModalReConnect").then((mod) => mod.ReConnectModal),
  {
    ssr: false,
  },
);

const ConfirmEVMTxModal = dynamic(
  () =>
    import("stateful-components/src/modals/ConfirmEVMTxModal").then(
      (mod) => mod.ConfirmEVMTxModal,
    ),
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
      <SignInModal />
      <WalletsModal />
      <EditModal />
      <ManageProfileModal />
      <DeleteProfileModal />
      <ReConnectModal />
      <ConfirmEVMTxModal />
    </Suspense>
  );
};
