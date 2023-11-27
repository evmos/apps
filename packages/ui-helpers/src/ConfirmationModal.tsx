"use client";
import { PropsWithChildren, useState } from "react";
import { Modal, ModalProps } from "./Modal";

export const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  ...rest
}: PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} {...rest}>
      <Modal.Body>Are you sure?</Modal.Body>
    </Modal>
  );
};

export const withCloseConfirmation = <
  P extends ModalProps & {
    setIsComplete?: React.Dispatch<React.SetStateAction<boolean>>;
  },
>(
  C: React.ComponentType<P>
) => {
  return ({ setIsOpen, isOpen, ...rest }: P) => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    return (
      <>
        <C
          setIsOpen={(open) => {
            if (open || isComplete) {
              setIsOpen(open);
              return;
            }
            setConfirmationOpen(open);
          }}
          setIsComplete={setIsComplete}
          isOpen={isOpen}
          {...rest}
        />
        {isConfirmationOpen && (
          <Modal
            isOpen={isConfirmationOpen}
            setIsOpen={setConfirmationOpen}
            {...rest}
          >
            <Modal.Body>
              Are you sure?
              <div className="flex justify-end mt-4 z-50">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    setIsOpen(false);
                    setConfirmationOpen(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setConfirmationOpen(false);
                  }}
                >
                  No
                </button>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  };
};
