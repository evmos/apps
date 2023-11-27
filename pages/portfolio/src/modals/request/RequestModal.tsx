"use client";
import {
  AddressSchema,
  TokenRefSchema,
} from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { z } from "zod";

import { Modal } from "@evmosapps/ui-helpers";

import { ModalProps, useModal } from "helpers";
import { Content } from "./Content";

const RequestModalSchema = z.object({
  receiver: AddressSchema.optional(),
  token: TokenRefSchema.default("evmos:EVMOS"),
  amount: z.coerce.bigint().default(0n),
  step: z
    .union([z.literal("setup"), z.literal("share"), z.literal("receive")])
    .default("receive"),
});

export type RequestModalProps = ModalProps<typeof RequestModalSchema>;

export const useRequestModal = () => useModal("request", RequestModalSchema);

export const RequestModal = () => {
  const { isOpen, setIsOpen, modalProps } = useRequestModal();
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="bg-black-900 shadow-custom-sm">
        {modalProps && <Content {...modalProps} />}
      </Modal.Body>
    </Modal>
  );
};
