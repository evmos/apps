import {
  AddressSchema,
  ChainPrefixSchema,
  TokenRefSchema,
} from "evmos-wallet/src/registry-actions/utils";
import { z } from "zod";

import { ModalWithTransitions } from "ui-helpers";
import { TransferModalContent } from "./TransferModalContent";
import { ModalProps, useModal } from "helpers";


const TransferModalSchema = z.object({
  receiver: AddressSchema.optional(),
  networkPrefix: ChainPrefixSchema.default("evmos"),
  token: TokenRefSchema.default("evmos:EVMOS"),
  amount: z.coerce.bigint().default(0n),
});

export type TransferModalProps = ModalProps<typeof TransferModalSchema>;

export const useTransferModal = () => useModal("transfer", TransferModalSchema);

export const TransferModal = () => {
  const { isOpen, setIsOpen, modalProps } = useTransferModal();
  return (
    <ModalWithTransitions
      show={isOpen}
      setShow={setIsOpen}
      variant="modal-black"
      propClose={true}
    >
      {modalProps && <TransferModalContent {...modalProps} />}
    </ModalWithTransitions>
  );
};
