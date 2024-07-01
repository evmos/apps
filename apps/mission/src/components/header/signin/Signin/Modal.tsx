// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { useModal } from "helpers";

import { useEffect, useState } from "react";
import { SigninModalBody } from "./SigninModalBody";
import { CancelModalBody } from "./CancelModalBody";
import { useAccount } from "wagmi";
import { useSuspenseUserSession } from "@evmosapps/user/auth/use-user-session.ts";

export const useSignInModal = () => useModal("signIn");

export const SignInModal = () => {
  const { isOpen, setIsOpen } = useSignInModal();
  const [signInStep, setSignInStep] = useState(0);
  const { address } = useAccount();
  const { data } = useSuspenseUserSession();
  const { user } = data || {};

  useEffect(() => {
    if (address && !user) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [address, user, setIsOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeOnOutsideClick={false}
      onClose={() => {
        setSignInStep(1);
      }}
    >
      <Modal.Body>
        {signInStep === 0 && <SigninModalBody setSignInStep={setSignInStep} />}
        {signInStep === 1 && (
          <CancelModalBody
            setSignInStep={setSignInStep}
            setIsOpen={setIsOpen}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
