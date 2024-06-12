// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ChainPrefixSchema } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { z } from "zod";

import { Modal } from "@evmosapps/ui-helpers";

import { ReceiptModalContent } from "./ReceiptModalContent";
import { ModalProps, useModal } from "helpers";

const ReceiptModalSchema = z.object({
  hash: z.string().min(1),
  chainPrefix: ChainPrefixSchema,
});

export type ReceiptModalProps = ModalProps<typeof ReceiptModalSchema>;

export const useReceiptModal = () => useModal("receipt", ReceiptModalSchema);

export const ReceiptModal = () => {
  const { isOpen, setIsOpen, modalProps } = useReceiptModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="bg-black-900 text-pearl1 shadow-custom-sm">
        {modalProps && <ReceiptModalContent {...modalProps} />}
      </Modal.Body>
    </Modal>
  );
};
