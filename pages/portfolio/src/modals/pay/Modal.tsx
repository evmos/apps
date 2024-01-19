// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui-helpers";
import { Content } from "./Content";
import { z } from "zod";
import {
  AddressSchema,
  TokenRefSchema,
} from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { ModalProps, useModal } from "helpers";

const MAX_MESSAGE_LENGTH = 140;

const PayModalSchema = z.object({
  requester: AddressSchema.optional(),
  token: TokenRefSchema.default("evmos:EVMOS"),
  amount: z.coerce.bigint().default(0n),
  step: z
    .union([z.literal("setup"), z.literal("share"), z.literal("receive")])
    .default("receive"),
  message: z.string().max(MAX_MESSAGE_LENGTH).default(""),
});

export type PayModalProps = ModalProps<typeof PayModalSchema>;

const usePayModal = () => useModal("pay", PayModalSchema);

export const PayModal = () => {
  const { isOpen, setIsOpen, modalProps } = usePayModal();
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="bg-black-900 shadow-custom-sm">
        {modalProps && <Content {...modalProps} />}
      </Modal.Body>
    </Modal>
  );
};
