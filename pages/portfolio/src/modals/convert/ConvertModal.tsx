// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { TokenRefSchema } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { z } from "zod";

import { Modal } from "@evmosapps/ui-helpers";

import { ModalProps, useModal } from "helpers";
import { ConvertModalContent } from "./ConvertModalContent";

const ConvertModalSchema = z.object({
  token: TokenRefSchema.default("evmos:NEOK"),
  type: z.union([z.literal("ERC20"), z.literal("ICS20")]).default("ICS20"),
  amount: z.coerce.bigint().default(0n),
});

export type ConvertModalProps = ModalProps<typeof ConvertModalSchema>;

const useConvertModal = () => useModal("convert", ConvertModalSchema);

export const ConvertModal = () => {
  const { isOpen, setIsOpen, modalProps } = useConvertModal();
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="shadow-custom-sm">
        {modalProps && <ConvertModalContent {...modalProps} />}
      </Modal.Body>
    </Modal>
  );
};
