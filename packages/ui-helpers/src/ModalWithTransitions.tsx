// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "icons";
import useEventListener from "./useEventListener";

export const ModalWithTransitions = ({
  show,
  setShow,
  content,
  propClose,
  handleCloseAction,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
  propClose?: boolean;
  handleCloseAction?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCloseModal = () => {
    // open a second modal if the user closes the first one.
    if (handleCloseAction) {
      handleCloseAction(true);
    } else {
      setShow(false);
    }
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        static
        onClose={() => {
          propClose ?? setShow(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="transition duration-100 ease-in"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div
          className="bg-blackOpacity fixed inset-0 z-10 overflow-y-auto pb-24 pt-8"
          onClick={() => {
            setShow(false);
          }}
        >
          <div
            className="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 ease-in"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Dialog.Panel className="relative min-w-[300px] max-w-[700px] transform overflow-hidden rounded-lg bg-[#FAF8F8] text-left shadow-xl transition-all md:min-w-[400px]">
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  {propClose && (
                    <button
                      type="button"
                      className="focus-visible:outline-none"
                      onClick={handleCloseModal}
                    >
                      <span className="sr-only">Close</span>
                      <CloseIcon
                        className="h-6 w-6 text-[#858B97]"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
                {content}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
