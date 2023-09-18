import {
  AddressSchema,
  ChainPrefixSchema,
  MinDenomSchema,
} from "evmos-wallet/src/registry-actions/utils";
import { z } from "zod";

import { ModalWithTransitions } from "ui-helpers";

import { ModalProps, useModal } from "helpers";
import { Content } from "./Content";

const RequestModalSchema = z.object({
  receiver: AddressSchema.optional(),
  networkPrefix: ChainPrefixSchema.default("evmos"),
  tokenSourcePrefix: ChainPrefixSchema.default("evmos"),
  denom: MinDenomSchema.default("aevmos"),
  amount: z.coerce.bigint().default(0n),
});

export type RequestModalProps = ModalProps<typeof RequestModalSchema>;

export const useRequestModal = () => useModal("request", RequestModalSchema);

export const RequestModal = () => {
  const { isOpen, setIsOpen, modalProps } = useRequestModal();
  return (
    <ModalWithTransitions
      show={isOpen}
      setShow={setIsOpen}
      variant="modal-black"
      propClose={true}
    >
      {modalProps && <Content {...modalProps} />}
    </ModalWithTransitions>
  );
};
