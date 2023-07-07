import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "icons";
import useEventListener from "./useEventListener";

export const ModalWithTransitions = ({
  show,
  setShow,
  content,
  propClose,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
  propClose?: boolean;
}) => {
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  });
  if (!show) {
    return null;
  }

  // TODO: don't use transitions if props is setted
  return (
    <Transition.Root show={show} as={Fragment}>
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
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div
          className="fixed inset-0 z-10 overflow-y-auto bg-blackOpacity"
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
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#FAF8F8] text-left shadow-xl transition-all min-w-[300px] max-w-[700px] md:min-w-[400px]">
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    type="button"
                    className="focus-visible:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="sr-only">Close</span>
                    <CloseIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {content}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
