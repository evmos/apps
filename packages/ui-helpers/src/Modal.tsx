"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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
import { CloseIcon } from "icons";
import { cn } from "helpers";

const ModalContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export function Modal({
  isOpen,
  setIsOpen,
  children,

  ...rest
}: PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <ModalContext.Provider value={{ isOpen: isOpen, setIsOpen }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          static
          onClose={() => setIsOpen(false)}
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
                onClick={() => {
                  setIsOpen(false);
                }}
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
        "flex bg-pearl1 m-auto rounded-lg flex-col p-6 max-w-md w-full",
        className as string
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
  ...rest
}: ComponentProps<"div">) => {
  const { setIsOpen } = useModal();
  return (
    <div
      className={cn("flex justify-between items-center", className)}
      {...rest}
    >
      <div className="flex items-center">{children}</div>
      <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
        <CloseIcon
          className={cn("h-6 w-auto text-current")}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

Modal.Header = ModalHeader;
