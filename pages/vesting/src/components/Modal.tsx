// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CloseIcon } from "@evmosapps/icons/CloseIcon";
import useEventListener from "@evmosapps/ui-helpers/src/useEventListener";
export const Modal = ({
  children,
  show,
  onClose,
}: {
  children: JSX.Element;
  show: boolean;
  onClose: () => void;
}) => {
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  });
  if (!show) {
    return null;
  }

  return (
    <div
      className="bg-blackOpacity fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-pearl1 relative max-h-[75vh] min-w-[300px] max-w-[600px] overflow-scroll rounded-lg px-5 py-8 text-black sm:max-h-full sm:overflow-auto sm:px-10 md:min-w-[400px]"
      >
        <CloseIcon
          onClick={onClose}
          className="focus-within:outline-darkPearl hover:bg-darkPearl absolute right-3 top-3 z-[99] h-10 w-10 cursor-pointer rounded p-2 transition-colors focus-within:outline-1"
        />

        {children}
      </div>
    </div>
  );
};
