// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "helpers/src/classnames";
import { IconCross } from "../../icons/line/basic";

const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  onClose: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

export function Modal({
  isOpen,
  setIsOpen,
  children,
  onClose,
  ...rest
}: PropsWithChildren<ModalProps>) {
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, onClose }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          static
          onClose={onClose}
          {...rest}
        >
          <div className="fixed inset-0 h-full w-full flex py-4 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 ease-in"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 ease-in"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {children ?? <div />}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </ModalContext.Provider>
  );
}

const ModalBody = forwardRef<
  HTMLDivElement,
  {
    className?: string;
  } & ComponentPropsWithoutRef<typeof Dialog.Panel>
>(function ModalBody({ children, className, ...rest }, ref) {
  return (
    <Dialog.Panel
      ref={ref}
      className={cn(
        "text-sm flex text-heading dark:text-heading-dark bg-surface-container-low dark:bg-surface-container-low-dark m-auto rounded-2xl flex-col p-6 max-w-md w-full border border-surface-container-highest dark:border-surface-container-highest-dark shadow-elevation z-50",
        className as string,
      )}
      {...rest}
    >
      {children}
    </Dialog.Panel>
  );
});

Modal.Body = ModalBody;

const ModalHeader = ({
  children,
  className,
  showCloseButton = true,
  ...rest
}: ComponentProps<"div"> & { showCloseButton?: boolean }) => {
  const { onClose } = useModal();
  return (
    <div
      className={cn(
        "flex justify-between items-center text-heading dark:text-heading-dark",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center text-2xl leading-8 font-medium">
        {children}
      </div>
      {showCloseButton && (
        <button
          className="cursor-pointer focus-visible:outline-none"
          onClick={onClose}
        >
          <IconCross
            className={cn(
              "h-5 w-auto m-2 focus:outline-none focus-visible:outline-none text-paragraph dark:text-paragraph-dark",
            )}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};

Modal.Header = ModalHeader;

const ModalSeparator = ({ ...rest }: ComponentProps<"hr">) => {
  return (
    <hr
      className="-mx-6 text-surface-container-highest dark:text-surface-container-highest-dark"
      {...rest}
    />
  );
};

Modal.Separator = ModalSeparator;
